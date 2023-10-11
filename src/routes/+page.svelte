<script lang="ts">
	import type { Editor, Content } from '@tiptap/core';

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
