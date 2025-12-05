import adapter from "@sveltejs/adapter-cloudflare";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      // Cloudflare Pages configuration
      routes: {
        include: ["/*"],
        exclude: ["<all>"], // <build>, <files>, <prerendered>, or <all>
      },
      platformProxy: {
        configPath: "wrangler.jsonc",
        environment: undefined,
        experimentalJsonConfig: true,
        persist: true,
      },
    }),
    prerender: {
      entries: [], // Disable prerendering - full dynamic mode
    },
  },
};

export default config;
