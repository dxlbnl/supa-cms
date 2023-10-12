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

	$: {
		console.log({ slug, content });
	}
</script>

<EditorContext bind:editor>
	<Menu />

	{#key slug}
		<Editor slot="editor" {content} />
	{/key}

	{#if !$editor && content}
		<Content slot="content" {content} />
	{/if}
</EditorContext>
