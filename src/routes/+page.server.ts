import type { PageServerLoad } from './$types';
import { createDb, schema } from '$lib/server/db';
import { eq } from 'drizzle-orm';

export const load: PageServerLoad = async ({ platform }) => {
  if (!platform?.env?.DB) {
    // Fallback for local dev without platform
    return {
      agencies: [],
      tags: [],
    };
  }

  const db = createDb(platform.env.DB);

  try {
    // Query agencies with relational data (sizes and tags) in parallel with tags
    const [agenciesWithRelations, allTags] = await Promise.all([
      db.query.agencies.findMany({
        where: eq(schema.agencies.visible, true),
        with: {
          size: true,
          tags: {
            with: {
              tag: true,
            },
          },
        },
        orderBy: (agencies, { asc }) => [asc(agencies.name)],
      }),
      db.query.tags.findMany({
        orderBy: (tags, { asc }) => [asc(tags.name)],
      }),
    ]);

    // Transform to match Contentful structure
    const agencies = agenciesWithRelations.map((agency) => ({
      sys: { id: agency.id },
      fields: {
        name: agency.name,
        url: agency.url,
        founded: agency.founded,
        logo: agency.logoUrl
          ? {
              fields: {
                file: {
                  url: agency.logoUrl,
                },
              },
            }
          : undefined,
        size: agency.size
          ? {
              sys: { id: agency.size.id, slug: agency.size.slug },
              fields: { label: agency.size.label },
            }
          : undefined,
        tags: agency.tags.map((at) => ({
          sys: { id: at.tag.id, slug: at.tag.slug },
          fields: { name: at.tag.name },
        })),
      },
    }));

    const tags = allTags.map((tag) => ({
      sys: { id: tag.id, slug: tag.slug },
      fields: { name: tag.name },
    }));

    return {
      agencies,
      tags,
    };
  } catch (error) {
    console.error('Database error:', error);
    return {
      agencies: [],
      tags: [],
    };
  }
};

// Disable prerendering since we're using D1 database at runtime
export const prerender = false;
