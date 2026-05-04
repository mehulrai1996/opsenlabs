# Opsen Labs — Website

## Project Structure

```
opsen/
├── index.html                        # Homepage
├── css/
│   └── global.css                    # Shared styles
├── js/
│   └── main.js                       # Shared JS (nav, scroll, counters)
├── images/
│   └── opsen-logo.png                # Logo (transparent background)
├── pages/
│   ├── mvp-sprint.html               # MVP Sprint service page
│   ├── mvp-recovery.html             # MVP Recovery service page
│   └── product-optimisation.html     # Product Optimisation service page
├── _redirects                        # Cloudflare Pages redirect rules
├── _headers                          # Cloudflare Pages security & cache headers
└── wrangler.toml                     # Cloudflare Pages project config
```

## Cloudflare Pages Deployment

### Option 1 — Drag & Drop (quickest)
1. Zip the entire `opsen/` folder.
2. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Pages → Create a project → Upload assets.
3. Upload the zip. Cloudflare will deploy immediately with a `*.pages.dev` URL.

### Option 2 — Git Integration (recommended for ongoing updates)
1. Push the `opsen/` folder to a GitHub or GitLab repository.
2. In Cloudflare Pages, choose "Connect to Git" and select the repo.
3. Build settings:
   - **Framework preset**: None (static HTML)
   - **Build command**: *(leave empty)*
   - **Build output directory**: `/` (root of repo)
4. Every push to `main` triggers an automatic deployment.

### Option 3 — Wrangler CLI
```bash
npm install -g wrangler
wrangler login
npx wrangler pages deploy ./opsen --project-name=opsen-labs
```

## Custom Domain
1. In Cloudflare Pages → your project → Custom domains → Add custom domain.
2. Enter your domain (e.g. `opsenlabs.com`).
3. If the domain is already on Cloudflare DNS, the CNAME record is added automatically.

## Notes
- No build step required — all files are static HTML/CSS/JS.
- The `_headers` file adds security headers and long-cache TTLs for assets.
- The `_redirects` file handles clean URLs without `.html` suffixes.
- The `Alta` font is loaded via `@font-face` from cdnfonts.com with a serif fallback.
- Forms are front-end only (demo state). Connect to Cloudflare Workers, Formspree, or a similar form endpoint for production.
