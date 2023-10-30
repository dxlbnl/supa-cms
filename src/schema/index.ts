import { jsonb, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

export * from './page';

export const image = pgTable('image', {
	hash: uuid('hash').primaryKey(),
	name: varchar('name'),
	srcset: jsonb('srcset').$type<{ width: number; name: string }[]>(),
	meta: jsonb('meta').$type<any>()
});
export const imageSchema = createSelectSchema(image);
export type Image = z.infer<typeof imageSchema>;
