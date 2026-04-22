# apiant-website-audit

Automated weekly Lighthouse + SEO audit of [apiant.com](https://apiant.com).

- **Dashboard:** https://apiant-website-audit-reports.pages.dev
- **Schedule:** every Monday at 10:00 UTC via GitHub Actions
- **Scope:** English canonical URLs from `apiant.com/sitemap.xml` (37 pages)

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
