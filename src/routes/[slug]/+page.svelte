<script lang="ts">
	import type { PageData } from './$types.js';
	import Editor from '$lib/Editor.svelte';

	export let data: PageData;

	let { page } = data;
</script>

<

<form method="POST" action="?/update">
	<h1 contenteditable bind:innerHTML={page.title}>{page.title}</h1>
	<input type="hidden" name="title" value={page.title} />

	<Editor name="content" value={page.content} />

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
