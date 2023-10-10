<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import { Image } from 'lucide-svelte';
	import { css } from 'styled-system/css';
	import { uploadImage } from '$lib/supabaseClient';

	export let attrs: Record<string, string>;
	export let editor: Editor;
	export let getPos: () => number;

	$: ({ src, alt, ...otherattrs } = attrs);

	let input: HTMLInputElement;

	const onChange = async (event: Event) => {
		const target = event.target as HTMLInputElement;
		if (!target.files?.length) return;

		const url = await uploadImage(target.files[0]);

		// const blob = new Blob([target.files[0]]);
		// const previewUrl = URL.createObjectURL(blob);

		if (editor.isEditable && typeof getPos === 'function') {
			editor
				.chain()
				.focus(undefined, { scrollIntoView: false })
				.command(({ tr }) => {
					const position = getPos();

					tr.setNodeAttribute(position, 'src', url);

					return true;
				})
				.run();
		}
	};
</script>

<button
	class={css({
		'&.ProseMirror-selectednode': {
			outline: '2px solid #3B82F6',
			outlineOffset: '2px'
		}
	})}
	on:click={() => input.click()}
>
	{#if src}
		<img {src} {alt} {...otherattrs} />
	{:else}
		<Image />
	{/if}

	<input
		bind:this={input}
		type="file"
		accept="image/*"
		on:change={onChange}
		class={css({ display: 'none' })}
	/>
</button>
