import { fail, redirect } from "@sveltejs/kit";
import { nanoid } from "nanoid";
import { getFormString, getFormStringArray } from "$lib/server/form-utils";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ platform, locals }) => {
  if (!locals.isAuthenticated) {
    throw redirect(302, "/admin");
  }

  const db = platform?.env?.DB;
  if (!db) {
    throw new Error("Database not available");
  }

  // Load tags and sizes for the form
  const tagsResult = await db.prepare("SELECT * FROM tags ORDER BY name").all();
  const sizesResult = await db.prepare("SELECT * FROM sizes ORDER BY label").all();

  return {
    tags: tagsResult.results || [],
    sizes: sizesResult.results || [],
  };
};

export const actions: Actions = {
  default: async ({ request, platform, locals }) => {
    if (!locals.isAuthenticated) {
      return fail(401, { error: "Unauthorized" });
    }

    const db = platform?.env?.DB;
    if (!db) {
      return fail(500, { error: "Database not available" });
    }

    const data = await request.formData();
    const name = getFormString(data, "name");
    const url = getFormString(data, "url");
    const founded = getFormString(data, "founded");
    const logo_url = getFormString(data, "logo_url");
    const size_id = getFormString(data, "size_id");
    const tag_ids = getFormStringArray(data, "tag_ids");

    // Validation
    if (!name || !url) {
      return fail(400, { error: "Name and URL are required" });
    }

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const id = nanoid();

    try {
      // Insert agency
      await db
        .prepare(
          `
          INSERT INTO agencies (id, name, url, founded, logo_url, size_id, slug, visible, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        `,
        )
        .bind(
          id,
          name,
          url,
          founded ? parseInt(founded) : null,
          logo_url || null,
          size_id || null,
          slug,
        )
        .run();

      // Insert agency_tags
      for (const tag_id of tag_ids) {
        await db
          .prepare("INSERT INTO agency_tags (agency_id, tag_id) VALUES (?, ?)")
          .bind(id, tag_id)
          .run();
      }
    } catch (error) {
      console.error("Create agency error:", error);
      return fail(500, { error: "Failed to create agency" });
    }

    // Redirect after successful creation
    throw redirect(303, "/admin");
  },
};
