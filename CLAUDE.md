# CLAUDE.md - Project Instructions for is-agencies

## Project Overview

A community-maintained directory of Icelandic web agencies. Static site built with Astro, deployed to Cloudflare Pages. Agency data lives in a JSON file.

## Technology Stack

- **Framework**: Astro 5.x (static output)
- **CSS Framework**: Tailwind CSS v4 (CSS-first config with @theme)
- **Package Manager**: Bun
- **Linting**: oxlint
- **Formatting**: oxfmt
- **Deployment**: Cloudflare Pages via wrangler

## Project Structure

```
is-agencies/
├── .config/                    # Tooling configuration
│   ├── .oxlintrc.json         # oxlint configuration
│   └── .oxfmtrc.json          # oxfmt configuration
├── public/
│   ├── favicon.png
│   ├── og-img-t.png
│   └── logos/                 # Agency logo images
├── src/
│   ├── data/agencies.json     # All agency data (flat JSON array)
│   ├── layouts/Base.astro     # HTML shell, fonts, meta tags
│   ├── pages/
│   │   ├── index.astro        # Homepage with agency list + client-side filter
│   │   └── about.astro        # About page
│   └── styles/app.css         # Global styles + Tailwind theme
├── astro.config.mjs           # Astro configuration
├── wrangler.jsonc             # Cloudflare Pages deploy config
├── tsconfig.json
└── package.json
```

## Data Model

Agency data is stored in `src/data/agencies.json` as a flat array sorted by name:

```json
{
  "name": "Aranja",
  "url": "https://www.aranja.com",
  "founded": 2014,
  "logo": "/logos/aranja.png",
  "size": "small",
  "tags": ["Apps", "Cloud", "Web"]
}
```

- `size`: `"small"` (1-10 employees) or `"large"` (11+)
- `tags`: string array from: Apps, Branding, Cloud, Design, Ecommerce, Marketing, Planning, Web
- `logo`: path under `public/logos/`, or `null`
- `founded`: year number, or `null`

To add an agency, add an entry to the JSON array (keep sorted by name) and add logo to `public/logos/`.

## Filtering

Client-side filtering via inline `<script>` in `index.astro`:
- Each card has `data-size` and `data-tags` attributes
- Filter pills toggle visibility via `display: none`
- URL search params updated for shareability (`?size=small&tags=Web,Design`)
- No framework needed - vanilla JS show/hide

## Tailwind v4

Uses CSS-first configuration with `@theme` directive in `src/styles/app.css`:
```css
@import "tailwindcss";

@theme {
  --color-sand: #F8F6F1;
  --color-ribbon: #0066F5;
}
```

Custom colors: `bg-sand`, `text-ribbon`, `border-dust`, `text-darkcloud`.

## Development Workflow

```bash
bun install        # Install dependencies
bun run dev        # Dev server with HMR (http://localhost:4321)
bun run build      # Build static site to dist/
bun run preview    # Preview built site
bun run deploy     # Build + deploy to Cloudflare Pages
bun run fmt        # Format code
bun run lint       # Lint code
```

## Deployment

```bash
bun run deploy
# Runs: astro build && wrangler pages deploy dist/
```

Static output in `dist/` is deployed to Cloudflare Pages.

## Contributing

1. Create a feature branch from `master`
2. Make changes and test locally (`bun run dev`)
3. Run `bun run fmt` and `bun run lint`
4. Run `bun run build` to verify
5. Push and create PR to `master`

## Resources

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Oxc Project](https://oxc-project.github.io/)

## License

MIT - See LICENSE file
