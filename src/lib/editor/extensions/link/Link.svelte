<script lang="ts">
	import type { Editor } from '@tiptap/core';
	import type { LinkProps } from '.';
	import { Check } from 'lucide-svelte';
	import Button from '$lib/components/Button.svelte';

	export let editor: Editor;
	export let linkProps: LinkProps;
	export let hide: () => void;

	let input: HTMLInputElement;
	const handleChange = (e) => {
		console.log('Set', e.target.value);
		const { pos, node } = linkProps;

		editor
			.chain()
			.setTextSelection({
				from: pos,
				to: pos + node.textContent.length
			})
			.extendMarkRange('link')
			.updateAttributes('link', {
				href: input.value
			})
			.run();
	};
</script>

<input bind:this={input} type="text" on:input={handleChange} value={linkProps.mark.attrs.href} />

<style>
	input {
		background: white;
		border-radius: var(--rounded);
		padding: 1rem;
	}
</style>
