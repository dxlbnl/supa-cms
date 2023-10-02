import { jsonb, pgTable, serial, varchar } from 'drizzle-orm/pg-core';

export type BaseBlock = {
	id: string;
	type: string;
	data: unknown;
};

export type Header = BaseBlock & {
	type: 'header';
	data: {
		text: string;
		level: 1 | 2 | 3 | 4 | 5 | 6;
	};
};

export type Paragraph = BaseBlock & {
	type: 'paragraph';
	data: {
		text: string;
	};
};

export type Quote = BaseBlock & {
	type: 'quote';
	data: {
		text: string;
		caption: string;
		alignment: 'left' | 'center' | 'right';
	};
};
export type ListItem = {
	content: string;
	items: ListItem[];
};
export type List = BaseBlock & {
	type: 'list';
	data: {
		style: 'ordered' | 'unordered';
		items: ListItem[];
	};
};

export type Block = Header | Paragraph;

export type PageMeta = {
	title: string;
	description: string;
	[key: string]: string;
};

export const page = pgTable('page', {
	slug: varchar('slug').primaryKey(),
	title: varchar('title'),
	content: jsonb('content').$type<Block[]>(),
	meta: jsonb('meta').$type<PageMeta>()
});
