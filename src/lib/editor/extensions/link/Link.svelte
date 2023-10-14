<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import { fade } from 'svelte/transition';

	export let attrs: Record<string, string>;
	export let editor: Editor;
	export let getPos: () => number;
</script>

<div transition:fade={{ duration: 100 }}>
	<p>Add item to library</p>
</div>
