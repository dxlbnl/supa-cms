<script lang="ts">
	import type { JSONContent } from '@tiptap/core';
	import Content from './Content.svelte';

	export let content: NonNullable<JSONContent['content']>;
	export let attributes: NonNullable<JSONContent['attributes']>;
</script>

<div class="layout" {...attributes}>
	{#each content as item}
		<Content content={item} />
	{/each}
</div>
