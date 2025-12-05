import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { agencies, tags, sizes, agencyTags } from './schema';

// Select types (reading from database)
export type Agency = InferSelectModel<typeof agencies>;
export type Tag = InferSelectModel<typeof tags>;
export type Size = InferSelectModel<typeof sizes>;
export type AgencyTag = InferSelectModel<typeof agencyTags>;

// Insert types (writing to database)
export type NewAgency = InferInsertModel<typeof agencies>;
export type NewTag = InferInsertModel<typeof tags>;
export type NewSize = InferInsertModel<typeof sizes>;
export type NewAgencyTag = InferInsertModel<typeof agencyTags>;

// Extended types with relations
export type AgencyWithRelations = Agency & {
  size?: Size | null;
  tags: Array<AgencyTag & { tag: Tag }>;
};
