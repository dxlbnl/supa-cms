<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { uploadImage } from '$lib/supabaseClient';
	import type { Editor } from '@tiptap/core';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	import { Image } from 'lucide-svelte';

	let imageInput: HTMLInputElement;
	const editor = getContext<Writable<Editor>>('editor');

	const handleImage = async (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (!target.files?.length) return;

		const url = await uploadImage(target.files[0]);

		// const blob = new Blob([target.files[0]]);
		// const previewUrl = URL.createObjectURL(blob);
		$editor.chain().focus().setImage({ src: url }).run();
	};
</script>

<Button on:click={() => imageInput.click()}>
	<input
		bind:this={imageInput}
		type="file"
		accept="image/*"
		on:change={handleImage}
		disabled={!$editor.can().chain().focus().setImage({ src: '/image.jpg' }).run()}
		style:display="none"
	/>
	<Image />
</Button>
