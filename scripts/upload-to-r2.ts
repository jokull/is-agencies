import { readdir, readFile } from "fs/promises";
import { join } from "path";

const DUMP_DIR = ".dump";
const IMAGES_DIR = join(DUMP_DIR, "images");

async function uploadToR2() {
  console.log("This script requires wrangler r2 bucket to be created.");
  console.log("\nTo create the bucket, run:");
  console.log("  bunx wrangler r2 bucket create is-agencies-images");
  console.log("\nThen upload images with:");
  console.log(
    "  bunx wrangler r2 object put is-agencies-images/<filename> --file=.dump/images/<filename>",
  );

  // List all images
  const images = await readdir(IMAGES_DIR);
  console.log(`\nFound ${images.length} images to upload:`);

  for (const image of images) {
    console.log(`  - ${image}`);
  }

  console.log("\nBulk upload command:");
  console.log(
    "  cd .dump/images && for f in *; do bunx wrangler r2 object put is-agencies-images/$f --file=$f --local; done",
  );
}

uploadToR2().catch(console.error);
