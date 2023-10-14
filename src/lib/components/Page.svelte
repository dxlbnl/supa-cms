<script lang="ts">
	import type { Writable } from 'svelte/store';

	import Content from '$lib/blocks/Content.svelte';

	import Editor from '$lib/editor/Editor.svelte';
	import EditorContext from '$lib/editor/EditorContext.svelte';
	import Menu from '$lib/editor/menu/Menu.svelte';
	import type { JSONContent, Editor as TEditor } from '@tiptap/core';
	import { user, supabase } from '$lib/supabaseClient';

	let editor: Writable<TEditor>;

	export let slug: string;
	export let content: JSONContent;
</script>

<EditorContext bind:editor>
	<Menu />

	{#key slug}
		{#if $user}
			<Editor slot="editor" {content} />
		{/if}
	{/key}

	{#if !$editor && content}
		<Content slot="content" {content} />
	{/if}
</EditorContext>
