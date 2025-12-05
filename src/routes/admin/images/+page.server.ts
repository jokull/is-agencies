import { fail, redirect } from "@sveltejs/kit";
import { nanoid } from "nanoid";
import { getFormFile, getFormString } from "$lib/server/form-utils";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ platform, locals }) => {
  if (!locals.isAuthenticated) {
    throw redirect(302, "/admin");
  }

  const r2 = platform?.env?.IMAGES;

  if (!r2) {
    return {
      images: [],
    };
  }

  try {
    // List all objects in R2 bucket
    const listed = await r2.list();

    return {
      images: listed.objects.map((obj: { key: string; uploaded: Date; size: number }) => ({
        key: obj.key,
        uploaded: obj.uploaded.toISOString(),
        size: obj.size,
        url: `/images/${obj.key}`,
      })),
    };
  } catch (error) {
    console.error("Error listing R2 objects:", error);
    return {
      images: [],
    };
  }
};

export const actions: Actions = {
  upload: async ({ request, platform, locals }) => {
    if (!locals.isAuthenticated) {
      return fail(401, { error: "Unauthorized" });
    }

    const r2 = platform?.env?.IMAGES;
    if (!r2) {
      return fail(500, { error: "R2 storage not available" });
    }

    const data = await request.formData();
    const file = getFormFile(data, "file");

    if (!file || file.size === 0) {
      return fail(400, { error: "No file provided" });
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return fail(400, { error: "Only image files are allowed" });
    }

    // Validate file size (e.g., max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return fail(400, { error: "File too large. Maximum size is 5MB" });
    }

    try {
      // Generate unique key
      const ext = file.name.split(".").pop() || "png";
      const key = `${nanoid()}.${ext}`;

      // Convert file to Uint8Array (standard web API, works with Workers)
      const arrayBuffer = await file.arrayBuffer();
      const uint8Array = new Uint8Array(arrayBuffer);

      // Upload to R2
      await r2.put(key, uint8Array, {
        httpMetadata: {
          contentType: file.type,
        },
      });

      return {
        success: true,
        key,
        url: `/images/${key}`,
      };
    } catch (error) {
      console.error("Upload error:", error);
      return fail(500, { error: "Failed to upload image" });
    }
  },

  delete: async ({ request, platform, locals }) => {
    if (!locals.isAuthenticated) {
      return fail(401, { error: "Unauthorized" });
    }

    const r2 = platform?.env?.IMAGES;
    if (!r2) {
      return fail(500, { error: "R2 storage not available" });
    }

    const data = await request.formData();
    const key = getFormString(data, "key");

    if (!key) {
      return fail(400, { error: "No key provided" });
    }

    try {
      await r2.delete(key);
      return { success: true, message: "Image deleted" };
    } catch (error) {
      console.error("Delete error:", error);
      return fail(500, { error: "Failed to delete image" });
    }
  },
};
