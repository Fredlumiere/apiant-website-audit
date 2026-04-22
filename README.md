# apiant-website-audit

Automated weekly Lighthouse + SEO audit of [apiant.com](https://apiant.com).

- **Dashboard:** https://apiant-website-audit-reports.pages.dev
- **Schedule:** every Monday at 10:00 UTC via GitHub Actions
- **Scope:** English marketing URLs from `apiant.com/sitemap/sitemap0.xml` (65 pages). The other sitemap shards (`sitemap1-3.xml`) contain ~132k servlet-generated `/connect/X-to-Y` combo pages — too many for a weekly Lighthouse crawl and mostly templated, so we skip them.

## Manual run

```bash
gh workflow run audit.yml
gh run list --workflow=audit.yml --limit 1
gh run watch <run-id>
```

## Secrets required

- `CLOUDFLARE_API_TOKEN` — custom token with Pages:Edit + User Details:Read + Memberships:Read, scoped to the specific Cloudflare account (NOT "all accounts")
- `CLOUDFLARE_ACCOUNT_ID` — from Cloudflare dashboard URL or right sidebar

## Local run

```bash
npm install
npm run audit
open dist/index.html
```

## Gotchas

- Do not create `unlighthouse.config.ts`; it breaks in CI
- Commit `package-lock.json` so `cache: 'npm'` in setup-node works
- `continue-on-error: true` on the project-create step makes it idempotent
