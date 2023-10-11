<script lang="ts">
	import { writable } from 'svelte/store';

	import type { PageData } from './$types.js';
	import Content from '$lib/blocks/Content.svelte';

	import Editor from '$lib/editor/Editor.svelte';
	import EditorContext from '$lib/editor/EditorContext.svelte';
	import Menu from '$lib/editor/Menu.svelte';

	export let data: PageData;

	const { page } = data;
</script>

<EditorContext>
	<Menu />

	<Editor bind:content={page.content} />
</EditorContext>

<form method="POST" action="?/update">
	<input name="title" value={page.title} />

	<input type="hidden" name="content" value={JSON.stringify(page.content)} />

	<section class="footer">
		<button type="submit">Save</button>
	</section>
</form>

<style>
	.footer {
		position: sticky;
		bottom: 0;
		width: 100%;
		background: white;
	}
</style>
