import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import * as sapper from "@sapper/server";
import dotenv from "dotenv";
const config = dotenv.config();

const {
  CONTENTFUL_SPACE,
  CONTENTFUL_ACCESS_TOKEN,
  CONTENTFUL_STAGING_TOKEN,
} = process.env;

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

polka()
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    sapper.middleware({
      session: (req, res) => ({
        contentfulSpace: CONTENTFUL_SPACE,
        contentfulAccessToken: CONTENTFUL_ACCESS_TOKEN,
        contentfulStagingToken: CONTENTFUL_STAGING_TOKEN,
      }),
    })
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
