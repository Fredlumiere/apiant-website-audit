# apiant-website-audit

Automated weekly Lighthouse + SEO audit of [apiant.com](https://apiant.com), deployed to Vercel.

- **Schedule:** every Monday at 10:00 UTC via GitHub Actions
- **Scope:** English marketing URLs from `apiant.com/sitemap/sitemap0.xml` (65 pages). The other sitemap shards (`sitemap1-3.xml`) contain ~132k servlet-generated `/connect/X-to-Y` combo pages — too many for a weekly Lighthouse crawl and mostly templated, so we skip them.

## Manual run

```bash
gh workflow run audit.yml
gh run list --workflow=audit.yml --limit 1
gh run watch <run-id>
```

## Secrets required

- `VERCEL_TOKEN` — created at https://vercel.com/account/tokens (full access, scope to Vercel account)

Link the repo to Vercel once (see "Vercel setup" below) and the workflow handles the rest.

## Vercel setup (one-time)

1. Visit https://vercel.com/new and import `Fredlumiere/apiant-website-audit`
2. Framework preset: **Other** (it's a static dist)
3. Output directory: `dist`
4. Deploy once manually to create the project
5. Create a personal access token at https://vercel.com/account/tokens
6. Add it as a GitHub secret:
   ```
   gh secret set VERCEL_TOKEN --repo Fredlumiere/apiant-website-audit -b "<paste-token>"
   ```

From then on, the Monday cron runs the audit and `vercel deploy --prod` replaces the live dashboard. Vercel auto-assigns a `*.vercel.app` URL; set a custom domain in the Vercel project if you want a stable link.

## Local run

```bash
npm install
npm run audit
open dist/index.html
```

## Gotchas

- Do not create `unlighthouse.config.ts`; it breaks in CI
- Commit `package-lock.json` so `cache: 'npm'` in setup-node works
- `vercel pull` is required before `vercel deploy` so the CLI knows which project it's deploying to
