#!/usr/bin/env bash
# apiant-website-audit — manual one-shot runner.
#
# Runs unlighthouse against the URL list in ./urls.txt, builds the static
# dashboard into ./dist, then deploys to Vercel (production).
#
# Requires:
#   - node + npx in PATH
#   - vercel CLI authenticated (run `vercel whoami` to verify)
#
# Usage:
#   bash run.sh
#   OR via zsh alias:  audit
set -euo pipefail

cd "$(dirname "$0")"

URLS="$(tr '\n' ',' < urls.txt | sed 's/,$//')"

echo "==> Cleaning previous run"
rm -rf dist .unlighthouse

echo "==> Running unlighthouse against $(wc -l < urls.txt | tr -d ' ') URLs"
npx --yes unlighthouse-ci \
  --site https://apiant.com \
  --build-static \
  --output-path ./dist \
  --urls "$URLS"

echo "==> Deploying to Vercel (production)"
vercel deploy --prod --yes

echo ""
echo "Done. Dashboard: https://apiant-audit.vercel.app"
