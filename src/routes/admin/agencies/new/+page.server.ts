import { fail, redirect } from '@sveltejs/kit';
import { nanoid } from 'nanoid';
import { getFormString, getFormStringArray } from '$lib/server/form-utils';
import { ensureHttpsUrl } from '$lib/utils';
import type { Actions, PageServerLoad } from './$types';
import { createDb, schema } from '$lib/server/db';

export const load: PageServerLoad = async ({ platform, locals }) => {
  if (!locals.isAuthenticated) {
    throw redirect(302, '/admin');
  }

  if (!platform?.env?.DB) {
    throw new Error('Database not available');
  }

  const db = createDb(platform.env.DB);

  // Load tags and sizes for the form in parallel
  const [tags, sizes] = await Promise.all([
    db.query.tags.findMany({
      orderBy: (tags, { asc }) => [asc(tags.name)],
    }),
    db.query.sizes.findMany({
      orderBy: (sizes, { asc }) => [asc(sizes.label)],
    }),
  ]);

  return {
    tags,
    sizes,
  };
};

export const actions: Actions = {
  default: async ({ request, platform, locals }) => {
    if (!locals.isAuthenticated) {
      return fail(401, { error: 'Unauthorized' });
    }

    if (!platform?.env?.DB) {
      return fail(500, { error: 'Database not available' });
    }

    const db = createDb(platform.env.DB);
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

    // Generate slug from name
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const id = nanoid();

    try {
      // Insert agency
      await db.insert(schema.agencies).values({
        id,
        name,
        url: ensureHttpsUrl(url),
        founded: founded ? parseInt(founded) : null,
        logoUrl: logo_url || null,
        sizeId: size_id || null,
        slug,
        visible: true,
      });

      // Insert agency_tags (batch insert - single query instead of loop)
      if (tag_ids.length > 0) {
        await db.insert(schema.agencyTags).values(
          tag_ids.map((tagId) => ({
            agencyId: id,
            tagId,
          }))
        );
      }
    } catch (error) {
      console.error('Create agency error:', error);
      return fail(500, { error: 'Failed to create agency' });
    }

    // Redirect after successful creation
    throw redirect(303, '/admin');
  },
};
