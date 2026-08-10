#!/usr/bin/env bash
# Poll until every authoritative nameserver agrees, then run the cutover once.
#
# The cutover's own gate is the authority on "ready" — this only re-runs it, so
# there is one definition of ready and not two. It stops on the first success,
# and gives up after the window rather than looping forever.
set -uo pipefail
LOG=/var/log/yakovtome-cutover.log
DEADLINE=$(( $(date +%s) + 10800 ))  # three hours
exec >>"$LOG" 2>&1
echo "=== watcher started $(date -Is)"
while [ "$(date +%s)" -lt "$DEADLINE" ]; do
  if /root/portfolio-src/scripts/cutover-yakovtome.sh; then
    echo "=== cutover completed $(date -Is)"
    exit 0
  fi
  sleep 180
done
echo "=== gave up waiting for DNS at $(date -Is); records never converged"
exit 1
