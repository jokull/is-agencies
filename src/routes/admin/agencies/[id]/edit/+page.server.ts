import { error, fail, redirect } from '@sveltejs/kit';
import { getFormString, getFormStringArray } from '$lib/server/form-utils';
import { ensureHttpsUrl } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';
import { createDb, schema } from '$lib/server/db';
import { eq, sql } from 'drizzle-orm';

export const load: PageServerLoad = async ({ params, platform, locals }) => {
  if (!locals.isAuthenticated) {
    throw redirect(302, '/admin');
  }

  if (!platform?.env?.DB) {
    throw new Error('Database not available');
  }

  const db = createDb(platform.env.DB);
  const { id } = params;

  // Load agency by ID
  const agency = await db.query.agencies.findFirst({
    where: eq(schema.agencies.id, id),
  });

  if (!agency) {
    throw error(404, 'Agency not found');
  }

  // Load tags, sizes, and current agency tags in parallel
  const [tags, sizes, currentAgencyTags] = await Promise.all([
    db.query.tags.findMany({
      orderBy: (tags, { asc }) => [asc(tags.name)],
    }),
    db.query.sizes.findMany({
      orderBy: (sizes, { asc }) => [asc(sizes.label)],
    }),
    db.query.agencyTags.findMany({
      where: eq(schema.agencyTags.agencyId, id),
    }),
  ]);

  const currentTagIds = currentAgencyTags.map((at) => at.tagId);

  return {
    agency,
    tags,
    sizes,
    currentTagIds,
  };
};

export const actions: Actions = {
  default: async ({ request, params, platform, locals }) => {
    if (!locals.isAuthenticated) {
      return fail(401, { error: 'Unauthorized' });
    }

    if (!platform?.env?.DB) {
      return fail(500, { error: 'Database not available' });
    }

    const db = createDb(platform.env.DB);
    const { id } = params;
    const data = await request.formData();
    const name = getFormString(data, 'name');
    const url = getFormString(data, 'url');
    const founded = getFormString(data, 'founded');
    const logo_url = getFormString(data, 'logo_url');
    const size_id = getFormString(data, 'size_id');
    const tag_ids = getFormStringArray(data, 'tag_ids');

    // Validation
    if (!name || !url) {
      return fail(400, { error: 'Name and URL are required' });
    }

    // Generate new slug from name
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    try {
      // Update agency
      await db
        .update(schema.agencies)
        .set({
          name,
          url: ensureHttpsUrl(url),
          founded: founded ? parseInt(founded) : null,
          logoUrl: logo_url || null,
          sizeId: size_id || null,
          slug,
          updatedAt: sql`CURRENT_TIMESTAMP`,
        })
        .where(eq(schema.agencies.id, id));

      // Replace agency_tags: delete all and insert new
      await db.delete(schema.agencyTags).where(eq(schema.agencyTags.agencyId, id));

      // Insert new agency_tags (batch insert)
      if (tag_ids.length > 0) {
        await db.insert(schema.agencyTags).values(
          tag_ids.map((tagId) => ({
            agencyId: id,
            tagId,
          }))
        );
      }
    } catch (error) {
      console.error('Update agency error:', error);
      return fail(500, { error: 'Failed to update agency' });
    }

    // Redirect after successful update
    throw redirect(303, '/admin');
  },
};
