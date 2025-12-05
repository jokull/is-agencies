import {
  sqliteTable,
  text,
  integer,
  index,
  uniqueIndex,
  primaryKey,
} from 'drizzle-orm/sqlite-core';
import { sql, relations } from 'drizzle-orm';

// Sizes table
export const sizes = sqliteTable(
  'sizes',
  {
    id: text('id').primaryKey(),
    label: text('label').notNull(),
    slug: text('slug').notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex('idx_sizes_slug').on(table.slug),
  })
);

// Tags table
export const tags = sqliteTable(
  'tags',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    slug: text('slug').notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex('idx_tags_slug').on(table.slug),
  })
);

// Agencies table
export const agencies = sqliteTable(
  'agencies',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    url: text('url').notNull(),
    founded: integer('founded'),
    logoUrl: text('logo_url'),
    logoId: text('logo_id'),
    sizeId: text('size_id').references(() => sizes.id),
    // SQLite boolean as integer: 1 = true, 0 = false
    visible: integer('visible', { mode: 'boolean' }).notNull().default(true),
    createdAt: text('created_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
  },
  (table) => ({
    nameIdx: index('idx_agencies_name').on(table.name),
    sizeIdx: index('idx_agencies_size').on(table.sizeId),
    visibleIdx: index('idx_agencies_visible').on(table.visible),
  })
);

// Agency-Tags junction table (many-to-many)
export const agencyTags = sqliteTable(
  'agency_tags',
  {
    agencyId: text('agency_id')
      .notNull()
      .references(() => agencies.id, { onDelete: 'cascade' }),
    tagId: text('tag_id')
      .notNull()
      .references(() => tags.id, { onDelete: 'cascade' }),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.agencyId, table.tagId] }),
    agencyIdx: index('idx_agency_tags_agency').on(table.agencyId),
    tagIdx: index('idx_agency_tags_tag').on(table.tagId),
  })
);

// Relations for relational queries
export const sizesRelations = relations(sizes, ({ many }) => ({
  agencies: many(agencies),
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  agencies: many(agencyTags),
}));

export const agenciesRelations = relations(agencies, ({ one, many }) => ({
  size: one(sizes, {
    fields: [agencies.sizeId],
    references: [sizes.id],
  }),
  tags: many(agencyTags),
}));

export const agencyTagsRelations = relations(agencyTags, ({ one }) => ({
  agency: one(agencies, {
    fields: [agencyTags.agencyId],
    references: [agencies.id],
  }),
  tag: one(tags, {
    fields: [agencyTags.tagId],
    references: [tags.id],
  }),
}));
