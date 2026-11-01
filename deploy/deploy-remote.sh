#!/usr/bin/env bash
# Runs ON the server (invoked over SSH by .github/workflows/web-deploy.yml),
# after CI has unpacked the built `dist/` into releases/<RELEASE_ID>.
# Mirrors pnp-backend's deploy: atomically swaps `current` to the new release
# (nginx serves /opt/pnp-web/current), checks the site, prunes old releases.
# Rollback: ln -sfn releases/<older-id> /opt/pnp-web/current
set -euo pipefail

RELEASE_ID="$1"
APP_DIR="/opt/pnp-web"
RELEASE_DIR="$APP_DIR/releases/$RELEASE_ID"
KEEP_RELEASES=5

echo "== check release =="
test -f "$RELEASE_DIR/index.html"

echo "== swap current -> $RELEASE_ID =="
ln -sfn "releases/$RELEASE_ID" "$APP_DIR/current"

echo "== health check =="
EXPECTED="$(grep -o 'assets/index-[^"]*\.js' "$RELEASE_DIR/index.html")"
if ! curl -fsS --resolve "pnpsports.in:443:127.0.0.1" https://pnpsports.in/ | grep -q "$EXPECTED"; then
  echo "site is not serving $EXPECTED" >&2
  exit 1
fi
echo "site healthy ($EXPECTED)"

echo "== prune old releases (keep last $KEEP_RELEASES) =="
cd "$APP_DIR/releases"
ls -1t | tail -n +$((KEEP_RELEASES + 1)) | xargs -r rm -rf

echo "DEPLOY_OK release=$RELEASE_ID"
