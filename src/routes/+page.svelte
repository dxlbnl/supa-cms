<script lang="ts">
	import type { Editor, Content } from '@tiptap/core';
	import { EditorTheme, SvelteEditor } from '@nextlint/svelte';

	let editor: Editor;

	const handleUpload = async (file: File) => {
		// handle upload here
		const blob = new Blob([file]);
		const previewUrl = URL.createObjectURL(blob);
		return previewUrl;
	};

	const setEditor = (newEditor: Editor) => {
		console.log('Editor', newEditor.getJSON());
		editor = newEditor;
	};

	let content: Content = '';
</script>

<EditorTheme>
	<SvelteEditor
		bind:content
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

<pre>{JSON.stringify(content, null, 2)}</pre>
