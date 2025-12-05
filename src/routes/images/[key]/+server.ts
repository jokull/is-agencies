import { error } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ platform, params }) => {
  const r2 = platform?.env?.IMAGES;

  if (!r2) {
    throw error(500, "R2 storage not available");
  }

  const object = await r2.get(params.key);

  if (!object) {
    throw error(404, "Image not found");
  }

  return new Response(object.body, {
    headers: {
      "Content-Type": object.httpMetadata?.contentType || "application/octet-stream",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
