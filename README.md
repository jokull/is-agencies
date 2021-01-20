# The Big List of Icelandic Web Agencies

This project uses Sapper to build a single static page that 
prefetches data from Contentful.

## Workflow

Clone and add an .env with Contentful variables:

```
CONTENTFUL_SPACE=
CONTENTFUL_ACCESS_TOKEN=
CONTENTFUL_STAGING_TOKEN=
```

Install packages and run the dev server 

```bash
yarn install
yarn run dev
```

Deploy to GitHub Pages

```bash
yarn run deploy
```
