# CLAUDE.md - Project Instructions for is-agencies

## Project Overview

This is a community-maintained directory of Icelandic web agencies, originally built with Sapper and now migrated to modern SvelteKit. The site is deployed to Cloudflare Pages with server-side rendering powered by Cloudflare D1 database and R2 object storage.

## Technology Stack

### Current
- **Framework**: SvelteKit 2.x with adapter-cloudflare
- **UI Library**: Svelte 5 (with runes: $props, $state, $derived, $effect)
- **Language**: TypeScript (strict mode)
- **CSS Framework**: Tailwind CSS v4 (CSS-first config with @theme)
- **Build Tool**: Vite 6
- **Package Manager**: Bun
- **Linting**: oxlint with type-aware checking
- **Formatting**: oxfmt
- **Database**: Cloudflare D1 (SQL database)
- **Storage**: Cloudflare R2 (object storage for images)
- **Deployment**: Cloudflare Pages via wrangler

### Previous Versions
- **v2 (Contentful Era)**: Contentful CMS, GitHub Pages, adapter-static
- **v1 (Original)**: Sapper, Svelte 3, Rollup, Yarn, Tailwind CSS v2

## Project Structure

```
is-agencies/
├── .config/                     # Tooling configuration
│   ├── .oxlintrc.json          # oxlint configuration
│   └── .oxfmtrc.json           # oxfmt configuration
├── migrations/                  # D1 database migrations
│   ├── 0001_initial_schema.sql # Initial tables (agencies, tags, sizes)
│   ├── 0002_add_slugs.sql      # Add slug columns
│   ├── 0003_slug_constraints.sql
│   └── 0004_slug_not_null.sql
├── scripts/                     # Utility scripts
│   ├── dump-contentful.ts      # Export data from Contentful
│   ├── migrate-to-d1.ts        # Import data into D1
│   ├── upload-to-r2.ts         # Upload images to R2
│   └── backfill-slugs.ts       # Generate slugs for existing data
├── src/
│   ├── lib/
│   │   └── components/         # Reusable Svelte components
│   │       ├── Card.svelte     # Agency card display
│   │       ├── Field.svelte    # Data field display
│   │       └── Option.svelte   # Filter option button
│   ├── routes/
│   │   ├── +layout.svelte      # Root layout with CSS import
│   │   ├── +page.svelte        # Homepage with agency list
│   │   ├── +page.server.ts     # Server-side data loading from D1
│   │   └── about/
│   │       └── +page.svelte    # About page
│   ├── app.css                 # Global styles + Tailwind
│   ├── app.d.ts                # TypeScript + Cloudflare Platform types
│   ├── app.html                # HTML template
│   └── ambient.d.ts            # Additional type definitions
├── static/                      # Static assets
│   └── images/                 # Image assets
├── .env                         # Environment variables (empty - uses wrangler.toml)
├── wrangler.toml               # Cloudflare configuration (D1, R2 bindings)
├── svelte.config.js            # SvelteKit configuration
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
└── package.json                # Dependencies and scripts

```

## Key Concepts

### SvelteKit Routing
- File-based routing in `src/routes/`
- `+page.svelte` = page component
- `+page.server.ts` = server-side data loading (accesses D1/R2)
- `+layout.svelte` = shared layout wrapper
- `+error.svelte` = error page

### Cloudflare Platform Integration
- D1 database and R2 storage are accessed via `platform.env`
- Platform types defined in `app.d.ts` via `App.Platform` interface
- Local development uses wrangler for platform emulation
- Server routes have access to D1 and R2 bindings

### Svelte 5 Runes
This project uses Svelte 5's runes system:
- `$props()` - Declare component props (replaces `export let`)
- `$state()` - Reactive state (replaces `let` for reactive variables)
- `$derived()` - Computed values (replaces `$:` statements)
- `$effect()` - Side effects (replaces `onMount`, `$:` side effects)

Example:
```svelte
<script lang="ts">
  let { data } = $props<{ data: PageData }>();
  let selectedTag = $state<string | undefined>(undefined);
  let filteredItems = $derived(data.items.filter(i => i.tag === selectedTag));
</script>
```

### Tailwind v4
Uses CSS-first configuration with `@theme` directive:
```css
@import "tailwindcss";

@theme {
  --color-sand: #F8F6F1;
  --color-ribbon: #0066F5;
}
```

Custom colors are used via standard Tailwind classes: `bg-sand`, `text-ribbon`, etc.

## Development Workflow

### Setup
```bash
# Install dependencies
bun install

# Start dev server with Cloudflare emulation
bun run dev

# This runs: wrangler pages dev --compatibility-date=2024-12-01 -- vite dev
# Open http://localhost:8788
```

### Code Quality
```bash
# Format code
bun run fmt

# Check formatting
bun run fmt:check

# Lint code (type-aware)
bun run lint
```

### Building & Preview
```bash
# Build for Cloudflare Pages
bun run build

# Preview built site (with Cloudflare emulation)
bun run preview
```

### Deployment
```bash
# Deploy to Cloudflare Pages
bun run deploy

# This runs: wrangler pages deploy .svelte-kit/cloudflare
```

### Database Management
```bash
# Run migrations on local D1
wrangler d1 migrations apply is-agencies-db --local

# Run migrations on production D1
wrangler d1 migrations apply is-agencies-db --remote

# Query local D1
wrangler d1 execute is-agencies-db --local --command "SELECT * FROM agencies"

# Query production D1
wrangler d1 execute is-agencies-db --remote --command "SELECT * FROM agencies"
```

## Cloudflare Configuration

All Cloudflare bindings are configured in `wrangler.toml`:
- **D1 Database**: `DB` binding → `is-agencies-db`
- **R2 Bucket**: `IMAGES` binding → `is-agencies-images`

No environment variables are needed for local development. Wrangler handles platform emulation.

## Database Schema (D1)

The D1 database contains the following tables:

### Tables
1. **agencies** - Web agency records
   - `id` TEXT PRIMARY KEY
   - `name` TEXT NOT NULL
   - `url` TEXT NOT NULL
   - `founded` INTEGER (optional)
   - `logo_url` TEXT (R2 URL for logo)
   - `logo_id` TEXT (R2 object key)
   - `size_id` TEXT (FK to sizes)
   - `slug` TEXT NOT NULL UNIQUE
   - `created_at`, `updated_at` DATETIME

2. **tags** - Category tags
   - `id` TEXT PRIMARY KEY
   - `name` TEXT NOT NULL
   - `slug` TEXT NOT NULL UNIQUE

3. **sizes** - Company size options
   - `id` TEXT PRIMARY KEY
   - `label` TEXT NOT NULL
   - `slug` TEXT NOT NULL UNIQUE

4. **agency_tags** - Junction table for many-to-many relationship
   - `agency_id` TEXT (FK to agencies)
   - `tag_id` TEXT (FK to tags)
   - PRIMARY KEY (agency_id, tag_id)

### Data Loading Pattern
Data is loaded in `+page.server.ts` using the D1 API:
```typescript
export const load: PageServerLoad = async ({ platform }) => {
  const db = platform?.env?.DB;

  const agencies = await db
    .prepare(`
      SELECT a.*, s.label as size, s.slug as size_slug
      FROM agencies a
      LEFT JOIN sizes s ON a.size_id = s.id
      ORDER BY a.name
    `)
    .all();

  return { agencies: agencies.results };
};
```

Note: `prerender = false` is set because we query D1 at runtime.

## Migration Scripts

The `scripts/` directory contains utilities for migrating from Contentful to Cloudflare:

1. **dump-contentful.ts** - Exports all agencies, tags, and sizes from Contentful to JSON
   ```bash
   bun run scripts/dump-contentful.ts
   ```

2. **migrate-to-d1.ts** - Imports the dumped data into D1 database
   ```bash
   bun run scripts/migrate-to-d1.ts
   ```

3. **upload-to-r2.ts** - Downloads logos from Contentful and uploads to R2
   ```bash
   bun run scripts/upload-to-r2.ts
   ```

4. **backfill-slugs.ts** - Generates URL-friendly slugs for existing records
   ```bash
   bun run scripts/backfill-slugs.ts
   ```

These scripts were used for the one-time migration from Contentful to Cloudflare infrastructure.

## Common Tasks

### Adding a New Component
1. Create `src/lib/components/YourComponent.svelte`
2. Use TypeScript: `<script lang="ts">`
3. Use Svelte 5 runes for props: `let { propName } = $props()`
4. Import and use: `import YourComponent from '$lib/components/YourComponent.svelte'`

### Adding a New Route
1. Create `src/routes/your-route/+page.svelte`
2. Add data loading if needed: `src/routes/your-route/+page.ts`
3. Route will be available at `/your-route`

### Modifying Styles
- Global styles: Edit `src/app.css`
- Component styles: Add `<style>` block in component (scoped automatically)
- Tailwind utilities: Use in class attributes
- Custom theme colors: Add to `@theme` block in `app.css`

### Adding Dependencies
```bash
# Add production dependency
bun add package-name

# Add dev dependency
bun add -d package-name
```

## Server-Side Rendering

This project uses `@sveltejs/adapter-cloudflare` for edge rendering:
- Routes are server-rendered on Cloudflare's edge network
- Data is fetched from D1 at request time (not prerendered)
- Images are served from R2 object storage
- Output goes to `.svelte-kit/cloudflare/` directory
- Deployed to Cloudflare Pages via wrangler
- Benefits from global CDN and edge compute

## VSCode Setup

Install the Oxc extension for editor integration:
- Extension ID: `oxc.oxc-vscode`
- Provides format-on-save and inline linting
- Configuration in `.vscode/settings.json`

## Troubleshooting

### "Cannot find module '$app/environment'" or similar
Run `bun run dev` once to generate SvelteKit types in `.svelte-kit/`

### Type errors in components
Make sure to run the dev server at least once to generate `$types` from `+page.ts` files

### Tailwind classes not working
Verify `@tailwindcss/vite` plugin is in `vite.config.ts` and `@import "tailwindcss"` is in `app.css`

### oxlint errors
Check `.config/.oxlintrc.json` for rule configuration. Add overrides if needed for specific files.

### Build fails
- Check for TypeScript errors with `bun run lint`
- Ensure wrangler.toml has correct D1 and R2 bindings
- Verify migrations have been applied to D1

### Database connection errors
- For local dev, ensure wrangler is running the dev server
- Check that D1 migrations have been applied: `wrangler d1 migrations apply is-agencies-db --local`
- Verify `platform?.env?.DB` is accessible in server routes

### Images not loading
- Check R2 bucket configuration in wrangler.toml
- Verify logo_url values in database point to R2
- For local dev, ensure R2 emulation is working

## Migration History

### December 2024: Contentful → Cloudflare (D1 + R2)
- Migrated from Contentful CMS to Cloudflare D1 (SQL database)
- Moved image assets from Contentful to R2 object storage
- Changed from static generation to edge SSR
- Switched adapter from `adapter-static` to `adapter-cloudflare`
- Updated deployment from GitHub Pages to Cloudflare Pages
- Migration scripts available in `scripts/` directory

### December 2024: Sapper → SvelteKit
- Sapper's `preload` → SvelteKit's `load` function
- Route file naming: `index.svelte` → `+page.svelte`, `_layout.svelte` → `+layout.svelte`
- Svelte 3 → Svelte 5 with runes
- Rollup → Vite
- Tailwind v2 → Tailwind v4
- ESLint/Prettier → oxlint/oxfmt

See `MIGRATION_PLAN.md` for complete migration details.

## Contributing

When making changes:
1. Create a feature branch from `master`
2. Make changes and test locally (`bun run dev`)
3. Run `bun run fmt` to format code
4. Run `bun run lint` to check for issues
5. Run `bun run build` to verify production build works
6. Commit with descriptive message
7. Push and create PR to `master`

## Deployment Pipeline

Deployment is manual via `bun run deploy` which:
1. Builds the SvelteKit app with Cloudflare adapter (`vite build`)
2. Deploys `.svelte-kit/cloudflare/` to Cloudflare Pages via wrangler
3. Cloudflare Pages serves the app globally on their edge network
4. D1 database is accessed at request time (not build time)
5. R2 images are served from Cloudflare's object storage

### Initial Setup (One-time)
```bash
# Create D1 database
wrangler d1 create is-agencies-db

# Update wrangler.toml with the database_id from the output

# Create R2 bucket
wrangler r2 bucket create is-agencies-images

# Run migrations
wrangler d1 migrations apply is-agencies-db --remote
```

## Best Practices

### TypeScript
- Always type component props
- Use `interface` for complex types
- Avoid `any` - use `unknown` if truly dynamic
- Enable strict mode checks

### Svelte 5
- Use `$props()` for all component props
- Use `$state()` for local reactive state
- Use `$derived()` for computed values
- Use `$effect()` sparingly - prefer reactive declarations

### Styling
- Use Tailwind utilities when possible
- Create reusable components for repeated patterns
- Use semantic color names (e.g., `ribbon`, `sand`) not hex values
- Keep custom CSS minimal

### Performance
- Keep bundle size small - check `bun run build` output
- Optimize D1 queries with proper indexes (see migrations)
- Use R2 for image storage to reduce bandwidth costs
- Leverage Cloudflare's global edge network for fast response times
- Consider caching strategies for frequently accessed data

## Resources

- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [Svelte 5 Runes](https://svelte.dev/docs/svelte/$state)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Cloudflare R2 Docs](https://developers.cloudflare.com/r2/)
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Docs](https://developers.cloudflare.com/workers/wrangler/)
- [Oxc Project](https://oxc-project.github.io/)

## License

MIT - See LICENSE file
