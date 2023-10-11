<script lang="ts">
	import { type Writable } from 'svelte/store';

	import type { PageData } from './$types.js';
	import Content from '$lib/blocks/Content.svelte';

	import Editor from '$lib/editor/Editor.svelte';
	import EditorContext from '$lib/editor/EditorContext.svelte';
	import Menu from '$lib/editor/Menu.svelte';
	import { css } from 'styled-system/css';
	import type { Editor as TEditor } from '@tiptap/core';

	export let data: PageData;

	let editor: Writable<TEditor>;
	const { page } = data;
</script>

<EditorContext bind:editor>
	<Menu />

	<Editor bind:content={page.content} />

	{#if !$editor && page.content}
		<Content content={page.content} />
	{/if}

	{#if $editor}
		<form method="POST" action="?/update">
			<input type="hidden" name="content" value={JSON.stringify(page.content)} />

			<section
				class="footer"
				style={css({
					background: 'green.500',
					position: 'sticky',
					bottom: 0
				})}
			>
				<button type="submit">Save</button>
			</section>
		</form>
	{/if}
</EditorContext>
