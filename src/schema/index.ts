import { jsonb, pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';
import { createSelectSchema } from 'drizzle-zod';
import type { z } from 'zod';

export * from './page';

type SrcSet = { width: number; name: string, ready: boolean }[];

export const image = pgTable('images', {
	hash: uuid('hash').primaryKey(),
	name: varchar('name').notNull(),
	srcset: jsonb('srcset').$type<SrcSet>().default([]).notNull(),
	meta: jsonb('meta').$type<any>(),
  createdAt: timestamp('created_at').defaultNow()
});
export type Image = typeof image.$inferSelect;