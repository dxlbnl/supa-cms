<script lang="ts" context="module">
	export const getEditor = () => {
		return getContext<Writable<Editor | null>>('editor');
	};
</script>

<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import { getContext, setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	const editorStore = writable<Editor | null>();
	setContext<Writable<Editor | null>>('editor', editorStore);

	export const editor = editorStore;
</script>

<slot name="editor" />

{#if !$editor}
	<slot name="content" />
{/if}

<slot />
