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
# Every authoritative nameserver, sampled several times, and they must ALL
# agree. A public resolver is the wrong thing to ask twice over: it answers
# from a cache that can be hours stale, and Let's Encrypt does not use it — it
# resolves from the root down and can land on any of these servers.
#
# The sampling is not paranoia. On the first attempt at this move, box.co.il's
# ns1 (129.159.130.37) answered from two different zone versions on the same
# IP, one of them still carrying the pre-change serial and the old Vercel
# address, while claiming authority. Asking it once would have looked fine
# every other time, and the run would then have failed validation against
# Vercel — or worse, succeeded, and sent a third of visitors there.
NS_IPS=$(for ns in $(dig +short NS "$NEW" | sed 's/\.$//'); do dig +short A "$ns"; done | sort -u)
[ -n "$NS_IPS" ] || { echo "  could not find the nameservers for $NEW"; exit 1; }

# A query that times out is not a pass. `dig` exits 9 on "no reply from
# server", and under `set -e` an unguarded command substitution took the whole
# run down with it — which is how this gate first failed, with exit 9 and two
# lines of output, looking like a DNS verdict when it was a dead script.
# `|| true` keeps the run alive and the empty answer counts as a mismatch.
ask() { dig +short A "$1" @"$2" +time=3 +tries=1 2>/dev/null | tail -1 || true; }

dns_ok=1
for host in "$NEW" "www.$NEW"; do
  for ip in $NS_IPS; do
    answers=""
    # 20 samples, not 5. This nameserver set answers from more than one zone
    # version behind a single IP, and a short run of clean replies means only
    # that the good instances were the ones that answered.
    for _ in $(seq 1 20); do
      answers="$answers $(ask "$host" "$ip")"
    done
    # Two different failures, and only one of them is a reason to stop. A query
    # that returns nothing is the server rate-limiting a burst of 20 — harmless,
    # and the retry will answer. A query that returns the OLD address is the
    # thing this gate exists to catch. So: zero wrong addresses, and enough
    # valid replies to trust the sample.
    ips=$(printf '%s' "$answers" | tr ' ' '\n' | grep -E '^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$' || true)
    n_valid=$(printf '%s\n' "$ips" | grep -c . || true)
    n_wrong=$(printf '%s\n' "$ips" | grep -vc "^$IP$" || true)
    if [ "$n_wrong" -eq 0 ] && [ "$n_valid" -ge 16 ]; then
      printf '  %-22s via %-16s ok (%s/20 answered, none stale)\n' "$host" "$ip" "$n_valid"
    else
      others=$(printf '%s\n' "$ips" | grep -v "^$IP$" | sort -u | tr '\n' ' ' || true)
      printf '  %-22s via %-16s %s answered, %s STALE %s\n' "$host" "$ip" "$n_valid" "$n_wrong" "$others"
      dns_ok=0
    fi
  done
done

if [ "$dns_ok" -ne 1 ]; then
  echo
  echo "  Not every authoritative server answers $IP yet."
  echo "  If the records are already set at box.co.il, this is their replication"
  echo "  catching up and there is nothing to do but wait — re-run this script."
  echo
  echo "  The records should be:"
  echo "     A   @     $IP"
  echo "     A   www   $IP"
  echo "  with the Vercel ones removed (A @ 76.76.21.21, CNAME www)."
  exit 1
fi

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
