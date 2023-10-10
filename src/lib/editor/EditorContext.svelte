<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import { setContext } from 'svelte';
	import { writable, type Writable } from 'svelte/store';

	const editorStore = writable<Editor>();
	setContext<Writable<Editor>>('editor', editorStore);

	export const editor = editorStore;
</script>

<slot />
