#!/usr/bin/env bash
# Move the portfolio from yakov.iresale.co.il to yakovtome.com.
#
# Run this AFTER the A record for yakovtome.com points at this box. It refuses
# to do anything until it does, because every step past the first depends on it:
# Let's Encrypt proves the domain over HTTP, and a certificate cannot be issued
# for a name that resolves somewhere else.
#
#   ssh the box, then:  sudo /var/www/yakov/scripts/cutover-yakovtome.sh
#
# What it does, in order:
#   1. checks DNS for the apex and www
#   2. issues one certificate covering both names
#   3. rebuilds the site with yakovtome.com as its canonical origin
#   4. deploys and restarts
#   5. turns yakov.iresale.co.il into a 301 to the new domain, path preserved
#
# Everything it changes is reversible: the old nginx block is backed up beside
# itself, and SITE_URL going back to the old value plus a rebuild restores the
# old canonical.

set -euo pipefail

NEW=yakovtome.com
OLD=yakov.iresale.co.il
SRC=/root/portfolio-src
DEST=/var/www/yakov
SERVICE=site-yakov.service
IP=$(curl -s -m 10 https://api.ipify.org)

say() { printf '\n\033[1m%s\033[0m\n' "$*"; }

say "1/5  DNS"
for host in "$NEW" "www.$NEW"; do
  got=$(dig +short A "$host" @1.1.1.1 | tail -1)
  if [ "$got" != "$IP" ]; then
    echo "  $host -> ${got:-(nothing)}, expected $IP"
    echo
    echo "  Set these at box.co.il and wait for them to propagate:"
    echo "     A   @     $IP"
    echo "     A   www   $IP"
    echo "  (remove the Vercel records first: A @ 76.76.21.21 and the www CNAME)"
    exit 1
  fi
  echo "  $host -> $got  ok"
done

say "2/5  certificate"
certbot --nginx -d "$NEW" -d "www.$NEW" \
  --non-interactive --agree-tos --redirect \
  --email yakovtome@outlook.com

say "3/5  rebuild with the new canonical origin"
cd "$SRC"
export SITE_URL="https://$NEW"
npx next build

say "4/5  deploy"
rsync -a --delete --exclude node_modules --exclude .next --exclude .git "$SRC/" "$DEST/"
rsync -a --delete "$SRC/.next/" "$DEST/.next/"
chown -R yakovsite:yakovsite "$DEST"
systemctl restart "$SERVICE"
sleep 6

say "5/5  point the old address at the new one"
cp -a /etc/nginx/sites-available/yakov "/etc/nginx/sites-available/yakov.before-cutover.$(date +%Y%m%d)"
cat > /etc/nginx/sites-available/yakov <<NGINX
# $OLD — kept alive only to send visitors and search engines to $NEW.
#
# 301 and not 302: the move is permanent, and only a permanent redirect passes
# the ranking the old address earned. \$request_uri is preserved so a deep link
# to /he/blog/<post> lands on the same post rather than on the home page.
server {
    listen 443 ssl;
    listen [::]:443 ssl;
    server_name $OLD;

    ssl_certificate /etc/letsencrypt/live/$OLD/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$OLD/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    return 301 https://$NEW\$request_uri;
}

server {
    listen 80;
    listen [::]:80;
    server_name $OLD;
    return 301 https://$NEW\$request_uri;
}
NGINX
nginx -t && systemctl reload nginx

say "done"
for u in "https://$NEW/en" "https://$NEW/he" "https://www.$NEW/en" "https://$OLD/he/blog"; do
  printf '  %-34s %s\n' "$u" "$(curl -s -o /dev/null -m 15 -w '%{http_code} -> %{redirect_url}' "$u")"
done
echo
echo "  canonical origin now: $(curl -s -m 10 "https://$NEW/robots.txt" | grep -i '^Host:')"
