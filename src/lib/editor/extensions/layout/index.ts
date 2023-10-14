import { Node, mergeAttributes } from '@tiptap/core';

export const Layout = Node.create({
	name: 'layout',

	content: 'image section',

	group: 'block',

	renderHTML: ({ HTMLAttributes }) => {
		return [
			'div',
			mergeAttributes(HTMLAttributes, {
				class: 'layout'
			}),
			0
		];
	},
	parseHTML: () => [
		{
			tag: 'div.layout'
		}
	]
});
