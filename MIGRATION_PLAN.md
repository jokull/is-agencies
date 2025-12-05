# Sapper to SvelteKit Migration Plan

## Overview
Migrate is-agencies from Sapper to modern SvelteKit with the following modernizations:
- **Package Manager**: Yarn → Bun
- **Framework**: Sapper → SvelteKit (with adapter-static)
- **Bundler**: Rollup → Vite (SvelteKit default)
- **Language**: JavaScript → TypeScript (full migration)
- **UI Framework**: Svelte 3 → Svelte 5 (with runes)
- **CSS**: Tailwind v2 → Tailwind v4
- **Tooling**: Add oxlint (type-aware) + oxfmt

## Phase 1: Setup New Project Structure

### 1.1 Install Bun and Initialize
- Remove `yarn.lock`
- Install dependencies with Bun
- Verify Bun lockfile created

### 1.2 Install SvelteKit Dependencies
```json
{
  "dependencies": {
    "@sveltejs/adapter-static": "^3.x",
    "@sveltejs/kit": "^2.x",
    "contentful": "^10.x"  // upgrade from 8.x
  },
  "devDependencies": {
    "@sveltejs/vite-plugin-svelte": "^4.x",
    "svelte": "^5.x",
    "vite": "^6.x",
    "typescript": "^5.9.x",
    "@tailwindcss/vite": "^4.x",
    "tailwindcss": "^4.x",
    "oxlint": "^1.30.0",
    "oxfmt": "^0.15.0",
    "oxlint-tsgolint": "^0.8.3"
  }
}
```

### 1.3 Create SvelteKit Configuration Files

**svelte.config.js**:
```js
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: false,
      strict: true
    })
  }
};
```

**vite.config.ts**:
```ts
import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [sveltekit(), tailwindcss()]
});
```

**tsconfig.json**:
```json
{
  "extends": "./.svelte-kit/tsconfig.json",
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "dom", "dom.iterable"],
    "module": "Preserve",
    "moduleDetection": "force",
    "strict": true,
    "noImplicitOverride": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "allowImportingTsExtensions": true,
    "rewriteRelativeImportExtensions": true,
    "noEmit": true,
    "paths": {
      "$lib": ["./src/lib"],
      "$lib/*": ["./src/lib/*"]
    }
  },
  "include": ["src/**/*.ts", "src/**/*.svelte"],
  "exclude": ["node_modules"]
}
```

## Phase 2: Restructure File System

### 2.1 Move Files to SvelteKit Structure
- `src/routes/_layout.svelte` → `src/routes/+layout.svelte`
- `src/routes/_error.svelte` → `src/routes/+error.svelte`
- `src/routes/index.svelte` → `src/routes/+page.svelte`
- `src/routes/about.svelte` → `src/routes/about/+page.svelte`
- `src/components/*` → Keep in `src/lib/components/*`
- `src/global.pcss` → `src/app.css`
- Delete `src/client.js`, `src/server.js`, `src/template.html`

### 2.2 Create SvelteKit App Entry
**src/app.html**:
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>
```

**src/hooks.server.ts**:
```ts
import type { Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const handle: Handle = async ({ event, resolve }) => {
  // Make Contentful credentials available to load functions
  event.locals.contentfulSpace = env.CONTENTFUL_SPACE;
  event.locals.contentfulAccessToken = env.CONTENTFUL_ACCESS_TOKEN;
  event.locals.contentfulStagingToken = env.CONTENTFUL_STAGING_TOKEN;

  return resolve(event);
};
```

**src/app.d.ts**:
```ts
declare global {
  namespace App {
    interface Locals {
      contentfulSpace: string;
      contentfulAccessToken: string;
      contentfulStagingToken: string;
    }
  }
}

export {};
```

## Phase 3: Migrate Routes and Components

### 3.1 Update Index Route

**src/routes/+page.ts**:
```ts
import { createClient } from 'contentful';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ locals }) => {
  const draftMode = false; // Can be made dynamic if needed
  const accessToken = draftMode
    ? locals.contentfulStagingToken
    : locals.contentfulAccessToken;

  const client = createClient({
    space: locals.contentfulSpace,
    accessToken,
    host: draftMode ? 'preview.contentful.com' : undefined,
    resolveLinks: true,
  });

  try {
    const [agencies, tags] = await Promise.all([
      client.getEntries({
        content_type: 'agency',
        order: 'fields.name',
      }),
      client.getEntries({ content_type: 'tag' }),
    ]);

    return {
      agencies: agencies.items,
      tags: tags.items,
    };
  } catch (error) {
    console.error(error);
    return {
      agencies: [],
      tags: [],
    };
  }
};
```

**src/routes/+page.svelte** (migrate to Svelte 5 with runes):
```svelte
<script lang="ts">
  import Card from '$lib/components/Card.svelte';
  import Option from '$lib/components/Option.svelte';
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let selectedSize = $state<string | undefined>(undefined);
  let selectedTag = $state<string | undefined>(undefined);

  function updateSize(value: string | undefined) {
    selectedSize = value;
  }

  function updateTag(value: string | undefined) {
    selectedTag = value;
  }

  // Derived filtered agencies
  let filteredAgencies = $derived(
    data.agencies.filter((agency) => {
      const sizeMatch =
        !selectedSize ||
        (agency.fields.size && agency.fields.size.sys.id === selectedSize);
      const tagMatch =
        !selectedTag ||
        (agency.fields.tags &&
          agency.fields.tags.some((tag) => tag.sys.id === selectedTag));
      return sizeMatch && tagMatch;
    })
  );
</script>

<svelte:head>
  <title>Icelandic Agencies</title>
</svelte:head>

<!-- Rest of template remains similar but uses filteredAgencies -->
```

### 3.2 Migrate Components to TypeScript + Svelte 5

**src/lib/components/Card.svelte**:
- Add `<script lang="ts">`
- Use `$props()` rune instead of `export let`
- Type the agency prop properly

**src/lib/components/Option.svelte**:
- Add TypeScript
- Use Svelte 5 event handlers (no createEventDispatcher)
- Use `$props()` rune

**src/lib/components/Field.svelte**:
- Add TypeScript
- Use `$props()` rune

### 3.3 Update Layout

**src/routes/+layout.svelte**:
```svelte
<script lang="ts">
  import '../app.css';
</script>

<main>
  <slot />
</main>
```

## Phase 4: Update Styling

### 4.1 Migrate to Tailwind v4

**src/app.css** (Tailwind v4 syntax):
```css
@import "tailwindcss";

@theme {
  --color-sand: #F8F6F1;
  --color-darkcloud: #233454;
  --color-ribbon: #0066F5;
  --color-dust: #DAD8D5;

  --font-family-sans: "IBM Plex Sans", ui-sans-serif;
  --font-family-serif: "IBM Plex Serif", ui-serif;
  --font-family-mono: "IBM Plex Mono", monospace;
}

.pill {
  @apply rounded-full border border-dust mr-2 px-3 py-1 text-xs mb-2 font-medium;
}

.pill[aria-selected] {
  @apply bg-darkcloud border-darkcloud text-dust;
}

.card h2 a:hover {
  @apply text-ribbon underline;
  text-decoration-thickness: 3px;
}
```

### 4.2 Remove Old Config Files
- Delete `tailwind.config.js`
- Delete `postcss.config.js`
- Delete `rollup.config.js`

## Phase 5: Setup Linting and Formatting

### 5.1 Create Config Directory
```bash
mkdir .config
```

### 5.2 Create oxlint Configuration

**.config/.oxlintrc.json**:
```json
{
  "$schema": "../node_modules/oxlint/configuration_schema.json",
  "plugins": ["typescript", "import"],
  "categories": {
    "correctness": "warn",
    "suspicious": "warn"
  },
  "env": {
    "builtin": true
  },
  "ignorePatterns": ["**/.svelte-kit/**", "**/build/**"],
  "rules": {
    "eslint/no-unused-vars": [
      "warn",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_"
      }
    ],
    "eslint/prefer-rest-params": "warn",
    "eslint/no-case-declarations": "warn",
    "eslint/no-var": "warn",
    "import/consistent-type-specifier-style": ["warn", "prefer-top-level"],
    "typescript/consistent-type-imports": [
      "warn",
      {
        "prefer": "type-imports",
        "fixStyle": "separate-type-imports"
      }
    ],
    "typescript/no-explicit-any": "warn",
    "typescript/no-require-imports": "warn"
  }
}
```

### 5.3 Create oxfmt Configuration

**.config/.oxfmtrc.json**:
```json
{
  "$schema": "../node_modules/oxfmt/configuration_schema.json",
  "ignorePatterns": [".svelte-kit/**", "build/**"]
}
```

### 5.4 Add Scripts to package.json
```json
{
  "scripts": {
    "dev": "vite dev",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "oxlint -c .config/.oxlintrc.json --type-aware --type-check --deny-warnings --report-unused-disable-directives",
    "fmt": "oxfmt -c .config/.oxfmtrc.json",
    "fmt:check": "oxfmt -c .config/.oxfmtrc.json --check",
    "deploy": "bun run build && echo 'www.agencies.is' > build/CNAME && gh-pages -d build"
  }
}
```

### 5.5 VSCode Configuration

**.vscode/settings.json**:
```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.oxc": "explicit"
  },
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "editor.formatOnSave": true,
  "oxc.configPath": ".config/.oxlintrc.json",
  "oxc.typeAware": true,
  "oxc.fmt.experimental": true,
  "oxc.fmt.configPath": ".config/.oxfmtrc.json",
  "files.associations": {
    "**/*.css": "tailwindcss"
  },
  "tailwindCSS.classFunctions": ["cn", "cva"],
  "typescript.tsdk": "node_modules/typescript/lib"
}
```

## Phase 6: Handle Service Worker (Optional)

**Decision Point**: Service workers are less common in modern SPAs. Options:
1. **Remove completely** (recommended for simplicity)
2. **Use SvelteKit's built-in service worker** (`src/service-worker.ts`)

If keeping:
- Create `src/service-worker.ts`
- Use SvelteKit's `$service-worker` imports
- Update caching strategy for SvelteKit's output

**Recommendation**: Remove for now, add back later if needed.

## Phase 7: Update Environment Variables

No changes needed - `.env` file works with SvelteKit's `$env` module.

## Phase 8: Testing and Validation

### 8.1 Development Test
```bash
bun run dev
```
- Verify all routes load
- Test filtering by size and tag
- Check Contentful integration
- Verify styling matches original

### 8.2 Build Test
```bash
bun run build
bun run preview
```
- Verify static export works
- Check all assets are included
- Test navigation

### 8.3 Lint and Format
```bash
bun run lint
bun run fmt
```

## Phase 9: Cleanup

- Remove old dependencies (sapper, rollup, polka, sirv, compression, babel)
- Remove `__sapper__` from `.gitignore`
- Add `.svelte-kit` and `build` to `.gitignore`
- Update README with new scripts

## Phase 10: Deploy

Update deployment process:
- Build output is in `build/` (not `__sapper__/export`)
- Update GitHub Pages deployment if needed
- Test deployment script

## Migration Order (Execution Steps)

1. Create backup branch
2. Install Bun, remove yarn.lock
3. Update package.json with all new dependencies
4. Run `bun install`
5. Create all new config files (svelte.config.js, vite.config.ts, tsconfig.json)
6. Create new SvelteKit structure (app.html, hooks.server.ts, app.d.ts)
7. Move and rename route files
8. Convert routes to TypeScript with Svelte 5 syntax
9. Convert components to TypeScript with Svelte 5 syntax
10. Update styling to Tailwind v4
11. Setup oxlint and oxfmt
12. Delete old files (client.js, server.js, rollup.config.js, etc.)
13. Test dev server
14. Fix any issues
15. Run lint and format
16. Test build
17. Test preview
18. Update deployment script
19. Deploy

## Potential Issues and Solutions

### Issue: Svelte 5 Runes Learning Curve
**Solution**: Focus on:
- `$props()` replaces `export let`
- `$state()` for reactive state
- `$derived()` for computed values
- `$effect()` replaces `onMount` for side effects

### Issue: Tailwind v4 Breaking Changes
**Solution**:
- Use `@theme` directive for custom values
- CSS variable syntax changes (--color-* instead of extend.colors)
- Test thoroughly as v4 is still alpha

### Issue: Type Errors from Contentful
**Solution**: Install `@types/contentful` or create manual types for Entry structures

### Issue: oxlint False Positives
**Solution**: Add rules to `.oxlintrc.json` overrides or disable specific rules

## Post-Migration Enhancements (Future)

- Add component library (shadcn-svelte?)
- Add tests (Vitest + Playwright)
- Add more TypeScript strict checks
- Optimize images (vite-imagetools?)
- Add analytics
- Improve accessibility
- Add dark mode?

## Estimated Effort

- Core migration: 3-4 hours
- Testing and fixes: 1-2 hours
- Documentation: 30 minutes

**Total**: ~5 hours (assumes familiarity with SvelteKit and Svelte 5)
