<script lang="ts">
	import type { JSONContent } from '@tiptap/core';
	import Content from './Content.svelte';

	export let attrs: NonNullable<JSONContent['attrs']>;
	export let content: NonNullable<JSONContent['content']>;

	$: ({ language, ...otherAttrs } = attrs);
</script>

<pre {...otherAttrs}><code class="language-{language}"
		>{#each content as content}<Content {content} />{/each}</code
	></pre>
