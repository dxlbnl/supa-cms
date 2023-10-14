import { Node } from '@tiptap/core';

export const Section = Node.create({
	name: 'section',

	content: 'block*',
	isolating: true,

	group: 'block',

	renderHTML: () => ['section', 0],

	parseHTML: () => [
		{
			tag: 'section'
		}
	]
});
