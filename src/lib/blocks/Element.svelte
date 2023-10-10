<script lang="ts" context="module">
	import type { JSONContent } from '@tiptap/core';

	const elements = {
		doc: 'article',
		paragraph: 'p',
		heading: 'h',
		bulletList: 'ul',
		listItem: 'li',
		blockquote: 'blockquote',
		hardBreak: 'br',
		horizontalRule: 'hr',
		image: 'img',
		section: 'section'
	};
	const getElementTag = ({ type, attrs }: JSONContent): string => {
		if (type === 'heading' && attrs) {
			return `h${attrs.level}`;
		}

		if (isElementType(type)) {
			return elements[type];
		}

		return 'div';
	};

	export const isElementType = (type?: string): type is keyof typeof elements => {
		return Boolean(type && type in elements);
	};
</script>

<script lang="ts">
	import Content from './Content.svelte';

	export let content: JSONContent;
</script>

<svelte:element this={getElementTag(content)} {...content.attrs}>
	{#if content.content}
		{#each content.content as item}
			<Content content={item} />
		{/each}
	{/if}
</svelte:element>
