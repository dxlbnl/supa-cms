<script lang="ts">
	import { type Writable } from 'svelte/store';

	import Content from '$lib/blocks/Content.svelte';

	import Editor from '$lib/editor/Editor.svelte';
	import EditorContext from '$lib/editor/EditorContext.svelte';
	import Menu from '$lib/editor/Menu.svelte';
	import { css } from 'styled-system/css';
	import type { JSONContent, Editor as TEditor } from '@tiptap/core';
	import { updatePage } from '$lib/supabaseClient';

	let editor: Writable<TEditor>;
	export let slug: string;
	export let content: JSONContent;
</script>

<EditorContext bind:editor>
	<Menu />

	{#key slug}
		<Editor bind:content />
	{/key}

	{#if !$editor && content}
		<Content {content} />
	{/if}

	{#if $editor}
		<section
			class="footer"
			style={css({
				background: 'green.500',
				position: 'sticky',
				bottom: 0,
				p: 16
			})}
		>
			<button on:click={() => updatePage({ slug, content })}>Save</button>
		</section>
	{/if}
</EditorContext>
