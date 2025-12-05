import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/lib/server/db/schema.ts',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './.wrangler/state/v3/d1/miniflare-D1DatabaseObject/1c8ce9af1dc874a50a7f01e3c0d85c6f64d8a9125e94d7772595361cace8afbe.sqlite',
  },
});
