<script lang="ts" context="module">
	import type { JSONContent } from '@tiptap/core';

	const markMapping = {
		italic: 'em',
		bold: 'strong',
		strike: 's'
	};

	const isMarkType = (type?: string): type is keyof typeof markMapping =>
		Boolean(type && type in markMapping);
</script>

<script lang="ts">
	export let marks: NonNullable<JSONContent['marks']>;
	export let text: NonNullable<JSONContent['text']>;

	$: [mark, ...otherMarks] = marks || [];
</script>

{#if !mark}
	{text}
{:else if isMarkType(mark.type)}
	<svelte:element this={markMapping[mark.type]} {...mark.attrs}>
		<svelte:self {text} marks={otherMarks} />
	</svelte:element>
{:else}
	<section class="error">Unknown mark {mark.type}</section>
{/if}
