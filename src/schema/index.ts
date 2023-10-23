import { jsonb, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';

export * from './page';

export const image = pgTable('image', {
	hash: uuid('hash').primaryKey(),
	name: varchar('name'),
	srcset: jsonb('srcset').$type<{ width: number; name: string }[]>(),
	meta: jsonb('meta').$type<any>()
});
