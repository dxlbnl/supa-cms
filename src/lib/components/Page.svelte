<script lang="ts">
	import { writable, type Writable } from 'svelte/store';

	import Content from '$lib/blocks/Content.svelte';

	import Editor from '$lib/editor/Editor.svelte';
	import EditorContext from '$lib/editor/EditorContext.svelte';
	import Menu from '$lib/editor/menu/Menu.svelte';
	import type { JSONContent, Editor as TEditor } from '@tiptap/core';
	import { user } from '$lib/supabaseClient';

	let editable = writable(false);

	export let slug: string;
	export let content: JSONContent;
</script>

<EditorContext>
	<Menu {editable} />

	{#key slug}
		{#if $user && $editable}
			<Editor {content} />
		{/if}
	{/key}

	{#if !$editable && content}
		<Content {content} />
	{/if}
</EditorContext>
