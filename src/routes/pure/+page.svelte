<script lang="ts">
	import type { Editor as TEditor } from '@tiptap/core';

	import { css, cx } from 'styled-system/css';
	import { container, grid, gridItem, wrap } from 'styled-system/patterns';

	import Content from '$lib/blocks/Content.svelte';
	import EditorContext from '$lib/editor/EditorContext.svelte';
	import Editor from '$lib/editor/Editor.svelte';
	import Menu from '$lib/editor/Menu.svelte';
	import type { Writable } from 'svelte/store';

	let editor: Writable<TEditor>;

	$: content = $editor?.getJSON();
</script>

<article
	class={cx(
		container(),
		grid({
			columns: 2
		})
	)}
>
	<EditorContext bind:editor>
		<Menu class={gridItem({ colSpan: 2 })} />

		<section>
			<Editor />
		</section>

		<section class="content">
			{#if content}
				<Content {content} />

				<pre>{JSON.stringify(content, null, 2)}</pre>
			{/if}
		</section>
	</EditorContext>
</article>
