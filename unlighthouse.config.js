const fs = require('fs');
const path = require('path');

// Single source of truth for the page list: urls.txt, one URL per line.
const urls = fs
  .readFileSync(path.join(__dirname, 'urls.txt'), 'utf-8')
  .split('\n')
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith('#'));

module.exports = {
  site: 'https://apiant.com',
  urls,
  outputPath: './dist',
  scanner: {
    // Audit exactly the urls list. Never crawl: apiant.com has ~132k
    // servlet-template pages and a full crawl runs past the GitHub
    // Actions 6-hour job limit, which is what cancelled every weekly run.
    sitemap: false,
    robotsTxt: false,
    crawler: false,
    // apiant.com pages carry hreflang tags. With the default (true),
    // unlighthouse treats every .html URL as an i18n variant of its
    // extensionless canonical and skips it, leaving only / and /platform/.
    ignoreI18nPages: false,
    device: 'mobile',
  },
};
