import { jsonb, pgTable, varchar } from 'drizzle-orm/pg-core';
import type { JSONContent } from '@tiptap/core';

export type PageMeta = {
	title: string;
	description: string;
	[key: string]: string;
};

export const page = pgTable('page', {
	slug: varchar('slug').primaryKey(),
	title: varchar('title'),
	content: jsonb('content').$type<JSONContent>(),
	meta: jsonb('meta').$type<PageMeta>().notNull().default({ title: '', description: '' })
});
