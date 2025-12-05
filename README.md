# The Big List of Icelandic Web Agencies

A community-maintained directory of Icelandic web agencies and digital studios. Built with modern web technologies and powered by Cloudflare's edge infrastructure.

🌎 **Live Site**: [agencies.is](https://agencies.is)

## Technology Stack

### Current Stack (2024+)
- **Framework**: [SvelteKit](https://kit.svelte.dev/) 2.x with Cloudflare adapter
- **UI Library**: [Svelte 5](https://svelte.dev/) with runes ($props, $state, $derived)
- **Language**: TypeScript (strict mode)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first configuration)
- **Build Tool**: [Vite](https://vitejs.dev/) 6
- **Package Manager**: [Bun](https://bun.sh/)
- **Linting**: [oxlint](https://oxc-project.github.io/) (type-aware, Rust-based)
- **Formatting**: [oxfmt](https://oxc-project.github.io/) (Rust-based)
- **Database**: [Cloudflare D1](https://developers.cloudflare.com/d1/) (SQL database) with [Drizzle ORM](https://orm.drizzle.team/)
- **Storage**: [Cloudflare R2](https://developers.cloudflare.com/r2/) (object storage)
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/) (edge rendering)
- **CI/CD**: GitHub Actions (automated deployment)

### Legacy Stack (Pre-2024)
This project was originally built with Sapper (deprecated), Svelte 3, Rollup, and Yarn. See [Migration History](#migration-history) below.

## Quick Start

### Prerequisites
- [Bun](https://bun.sh/) 1.0+ (JavaScript runtime & package manager)
- Node.js 18+ (for compatibility, though Bun is used)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/jokull/is-agencies.git
cd is-agencies

# Install dependencies
bun install

# Start development server (with Cloudflare emulation)
bun run dev
```

Visit [http://localhost:8788](http://localhost:8788) to see the site with Cloudflare D1 and R2 emulation.

## Development Commands

```bash
# Development
bun run dev          # Start dev server with hot reload

# Code Quality
bun run fmt          # Format code with oxfmt
bun run fmt:check    # Check code formatting
bun run lint         # Lint with type-aware oxlint

# Database (Drizzle ORM)
bun run db:generate       # Generate migration from schema changes
bun run db:migrate:local  # Apply migrations to local database
bun run db:migrate:prod   # Apply migrations to production database
bun run db:studio         # Launch Drizzle Studio (database GUI)

# Building
bun run build        # Build for Cloudflare Pages
bun run preview      # Preview production build with Cloudflare emulation

# Deployment
bun run deploy       # Deploy to Cloudflare Pages (includes migrations)
```

## Project Structure

```
is-agencies/
├── .config/                    # Tool configurations
│   ├── .oxlintrc.json         # Linting rules
│   └── .oxfmtrc.json          # Formatting config
├── src/
│   ├── lib/
│   │   └── components/        # Reusable components
│   │       ├── Card.svelte    # Agency display card
│   │       ├── Field.svelte   # Data field component
│   │       └── Option.svelte  # Filter option button
│   ├── routes/
│   │   ├── +layout.svelte     # Root layout
│   │   ├── +page.svelte       # Homepage
│   │   ├── +page.ts           # Data loading
│   │   └── about/             # About page
│   ├── app.css                # Global styles + Tailwind
│   ├── app.d.ts               # TypeScript definitions
│   ├── app.html               # HTML template
│   └── hooks.server.ts        # Server hooks
├── static/                     # Static assets
├── build/                      # Build output (git ignored)
├── .env                        # Environment variables
├── svelte.config.js           # SvelteKit config
├── vite.config.ts             # Vite config
├── tsconfig.json              # TypeScript config
├── CLAUDE.md                  # Detailed project docs
└── MIGRATION_PLAN.md          # Migration documentation
```

## Features

### Current Features
- **Edge Rendering**: Server-side rendering on Cloudflare's global edge network
- **Real-time Filtering**: Filter agencies by size and specialty tags
- **Responsive Design**: Mobile-first responsive layout
- **Type-Safe**: Full TypeScript coverage with strict mode
- **Modern Tooling**: Fast Rust-based linting and formatting
- **SQL Database**: Agency data stored in Cloudflare D1 (SQLite)
- **Object Storage**: Logos served from Cloudflare R2
- **Automated CI/CD**: GitHub Actions deploys on merge to master

### Content Types
The site displays agencies with the following information:
- Company name and logo
- Website URL
- Founded year
- Company size (Small: 1-10, Large: 11+)
- Specialty tags (e.g., E-commerce, Design, Development)

## Environment Variables

The project uses Cloudflare D1 and R2, configured via `wrangler.jsonc`. No environment variables are required for local development.

For CI/CD deployment, add to GitHub Secrets:
- `CLOUDFLARE_API_TOKEN`: API token with Cloudflare Pages edit permissions

## Architecture

### Edge Rendering with Cloudflare
This project uses SvelteKit's Cloudflare adapter (`@sveltejs/adapter-cloudflare`) for edge rendering:
1. Server-side rendering on Cloudflare's global edge network
2. Data is fetched from D1 database at request time
3. Logo images are served from R2 object storage
4. Automatic caching and CDN distribution worldwide
5. Sub-100ms response times globally

### Data Flow
```
Request Time:
  User Request → Cloudflare Edge → SvelteKit SSR → D1 Query → HTML Response
  Logo Assets → R2 Storage → Cloudflare CDN → User

Runtime:
  User Interaction → Client-side Filtering → DOM Updates
```

### Svelte 5 Runes
This project uses Svelte 5's modern runes API:

```svelte
<script lang="ts">
  // Props (replaces export let)
  let { data } = $props<{ data: PageData }>();

  // Reactive state (replaces let with $ magic)
  let selectedTag = $state<string | undefined>();

  // Computed values (replaces $: label)
  let filteredAgencies = $derived(
    data.agencies.filter(a => a.tag === selectedTag)
  );

  // Side effects (replaces onMount and $: side effects)
  $effect(() => {
    console.log('Selected tag changed:', selectedTag);
  });
</script>
```

### Tailwind CSS v4
The project uses Tailwind v4's CSS-first configuration:

```css
@import "tailwindcss";

@theme {
  --color-sand: #F8F6F1;
  --color-darkcloud: #233454;
  --color-ribbon: #0066F5;
  --color-dust: #DAD8D5;
}
```

Custom colors are used directly in HTML: `class="bg-sand text-ribbon"`

## Contributing

Contributions are welcome! Here's how to contribute:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Make your changes**
4. **Format and lint**: `bun run fmt && bun run lint`
5. **Test locally**: `bun run dev` and `bun run build`
6. **Commit your changes**: `git commit -m "Add your feature"`
7. **Push to your fork**: `git push origin feature/your-feature`
8. **Open a Pull Request**

### Code Style
- TypeScript for all code
- Svelte 5 runes for reactivity
- Tailwind utilities for styling
- Follow existing component patterns
- Run `bun run fmt` before committing

### Adding an Agency
To add a new agency, please:
1. Contact [@jokull on Twitter](https://twitter.com/jokull) with agency details
2. Or open an issue with the agency information

Content is stored in Cloudflare D1 database and requires database access.

## Deployment

The site is deployed to Cloudflare Pages with automatic builds on Git push.

### Automated Deployment (Recommended)
Enable Cloudflare Pages CI in the Cloudflare Dashboard:
1. Go to Cloudflare Pages → is-agencies project
2. Navigate to Settings → Builds & deployments
3. Connect to GitHub repository
4. Enable automatic deployments on push to `master` branch
5. Cloudflare automatically builds and deploys on each commit

### Manual Deployment
```bash
bun run deploy
```

This command:
1. Builds the SvelteKit app with Cloudflare adapter (`vite build`)
2. Deploys `.svelte-kit/cloudflare/` to Cloudflare Pages via wrangler
3. Site is live globally within seconds

## Migration History

### December 2024: Contentful → Cloudflare (D1 + R2)

The project migrated from Contentful CMS to Cloudflare's edge infrastructure for better performance and lower costs.

#### What Changed
| Aspect | Before | After |
|--------|--------|-------|
| CMS | Contentful | Cloudflare D1 (SQL) |
| Image Storage | Contentful Assets | Cloudflare R2 |
| Rendering | Static (build-time) | Edge SSR (request-time) |
| Hosting | GitHub Pages | Cloudflare Pages |
| Adapter | adapter-static | adapter-cloudflare |
| CI/CD | Manual | Cloudflare automatic builds |

#### Benefits
- **Cost**: D1 and R2 are significantly cheaper than Contentful
- **Performance**: Edge rendering with global CDN
- **Control**: Full SQL database access vs. CMS API limitations
- **Simplicity**: No external dependencies or API keys needed
- **Scalability**: Cloudflare's infrastructure scales automatically

### December 2024: Sapper → SvelteKit Migration

This project underwent a major modernization, migrating from Sapper (deprecated) to modern SvelteKit.

#### What Changed
| Aspect | Before | After |
|--------|--------|-------|
| Framework | Sapper 0.28 | SvelteKit 2.x |
| UI Library | Svelte 3 | Svelte 5 (with runes) |
| Language | JavaScript | TypeScript (strict) |
| Bundler | Rollup | Vite 6 |
| CSS Framework | Tailwind v2 | Tailwind v4 |
| Package Manager | Yarn | Bun |
| Linting | None | oxlint (type-aware) |
| Formatting | None | oxfmt |

#### Key Technical Changes
1. **Route Files**: Renamed with `+` prefix
   - `index.svelte` → `+page.svelte`
   - `_layout.svelte` → `+layout.svelte`
   - `_error.svelte` → `+error.svelte`

2. **Data Loading**: Sapper's `preload` → SvelteKit's `load`
   ```typescript
   // Before (Sapper)
   export async function preload({ params }, session) { }

   // After (SvelteKit)
   export const load: PageLoad = async ({ locals }) => { }
   ```

3. **Session Management**: Middleware → Server Hooks
   ```typescript
   // Before: src/server.js middleware
   sapper.middleware({ session: (req) => ({ ... }) })

   // After: src/hooks.server.ts
   export const handle: Handle = async ({ event, resolve }) => {
     event.locals.contentfulSpace = env.CONTENTFUL_SPACE;
     return resolve(event);
   }
   ```

4. **Reactivity**: Svelte 3 → Svelte 5 Runes
   ```svelte
   <!-- Before -->
   <script>
     export let data;
     let selected;
     $: filtered = data.filter(/* ... */);
   </script>

   <!-- After -->
   <script lang="ts">
     let { data } = $props();
     let selected = $state();
     let filtered = $derived(data.filter(/* ... */));
   </script>
   ```

5. **Styling**: Tailwind v2 config file → Tailwind v4 CSS config
   ```js
   // Before: tailwind.config.js
   module.exports = {
     theme: { extend: { colors: { sand: '#F8F6F1' } } }
   }
   ```
   ```css
   /* After: app.css */
   @theme {
     --color-sand: #F8F6F1;
   }
   ```

#### Benefits of Migration
- **Performance**: Vite's dev server is significantly faster than Rollup
- **Type Safety**: Full TypeScript coverage catches errors at compile time
- **Modern Tooling**: oxlint and oxfmt are 50-100x faster than ESLint/Prettier
- **Better DX**: Svelte 5 runes provide clearer, more predictable reactivity
- **Future-Proof**: SvelteKit is actively maintained; Sapper is deprecated
- **Smaller Bundle**: Svelte 5 produces smaller, more efficient output

See `MIGRATION_PLAN.md` for complete migration documentation.

## Troubleshooting

### Vite/SvelteKit type errors
Run `bun run dev` once to generate SvelteKit's type definitions in `.svelte-kit/types/`

### "Cannot find module '$app/...'"
This means SvelteKit hasn't generated its types yet. Start the dev server once.

### Contentful API errors during build
Check that your `.env` file contains valid Contentful credentials.

### Tailwind classes not applying
Verify that:
1. `@tailwindcss/vite` is in your `vite.config.ts` plugins
2. `@import "tailwindcss"` is at the top of `app.css`
3. You're using v4 syntax (`--color-*` in `@theme`)

### Bun install fails
If you encounter registry errors, wait a moment and try again. The npm registry occasionally has outages.

## Resources

- **Live Site**: [agencies.is](https://www.agencies.is/)
- **GitHub**: [github.com/jokull/is-agencies](https://github.com/jokull/is-agencies)
- **SvelteKit Docs**: [kit.svelte.dev](https://kit.svelte.dev/)
- **Svelte 5 Docs**: [svelte.dev](https://svelte.dev/)
- **Tailwind v4 Docs**: [tailwindcss.com](https://tailwindcss.com/)
- **Contentful**: [contentful.com](https://www.contentful.com/)

## License

MIT License - See [LICENSE](LICENSE) file for details

## Credits

**Created by**: Brynjar and Jökull
**Maintained by**: [@jokull](https://twitter.com/jokull)
**Tech Stack**: Built with SvelteKit, Tailwind CSS, and Contentful

---

Made with ❤️ for the Icelandic web development community
