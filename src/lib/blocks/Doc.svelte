<script lang="ts">
	import type { JSONContent } from '@tiptap/core';
	import { schema } from './schema';

	console.log(schema);

	export let type: string = 'doc';
	export let content: JSONContent[] = [];
	export let attrs: JSONContent['attrs'] = {};
	export let marks: JSONContent['marks'] = [];
</script>

<article>
	{#each content as node}
		<pre>{JSON.stringify(node, null, 2)}</pre>
	{/each}
</article>
