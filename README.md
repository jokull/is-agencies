# The Big List of Icelandic Web Agencies

This project uses Sapper to build a single static page that 
prefetches data from Contentful.

🌎 [agencies.is](https://www.agencies.is/)

## Workflow

Install packages and run the dev server 

```bash
yarn install
yarn run dev
```

Deploy to GitHub Pages

```bash
yarn run deploy
```

## Troubleshoot

You will probably encounter an error referenced
[here](https://github.com/snowpackjs/snowpack/discussions/1387#discussioncomment-117946) 
that looks something like this: 

`Client build fails: 'platform' is not exported by node-resolve:empty.js`

To fix update `node_modules/contentful-sdk-core/dist/index.es-modules.js` like this:

Line 3:
```diff
-  import { platform, release } from 'os';
+  import os from 'os';
```
