<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import { EditorTheme, SvelteEditor } from '@nextlint/svelte';

	import { writable } from 'svelte/store';
	import { Pencil, Store } from 'lucide-svelte';

	import type { PageData } from './$types.js';
	import Toggle from '$lib/components/Toggle.svelte';
	import Content from '$lib/blocks/Content.svelte';

	export let data: PageData;

	let editor: Editor;

	const { page } = data;

	let edit = writable(false);

	const handleUpload = async (file: File) => {
		// handle upload here
		const blob = new Blob([file]);
		const previewUrl = URL.createObjectURL(blob);
		return previewUrl;
	};

	const setEditor = (newEditor: Editor) => {
		editor = newEditor;
	};
</script>

<Toggle pressed={edit}>
	<Pencil />
</Toggle>

<form method="POST" action="?/update">
	{#if $edit}
		<input name="title" value={page.title} />

		<input type="hidden" name="content" value={JSON.stringify(editor?.getJSON())} />

		<EditorTheme>
			<SvelteEditor
				content={page.content}
				placeholder="Type '/' for help"
				onCreated={setEditor}
				onChange={setEditor}
				plugins={{
					selectImage: {
						handleUpload,
						unsplash: {
							accessKey: 'pv6LPw4V559iu77TAahfqfmv9d71IzspVH_JVNvGm9A'
						}
					}
				}}
			/>
		</EditorTheme>
	{:else}
		{#if page.title}
			<h1>{page.title}</h1>
		{/if}

		<Content content={page.content} />
	{/if}

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
