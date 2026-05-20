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

echo "==> Cleaning previous run"
rm -rf dist .unlighthouse

echo "==> Running unlighthouse against $(grep -cve '^[[:space:]]*$' urls.txt | tr -d ' ') URLs"
# Config (site, urls, scanner options) lives in unlighthouse.config.js.
npx --yes unlighthouse-ci --build-static

echo "==> Deploying to Vercel (production)"
vercel deploy --prod --yes

echo ""
echo "Done. Dashboard: https://apiant-audit.vercel.app"
