<script lang="ts">
	import StarterKit from '@tiptap/starter-kit';
	import { Editor, type Content } from '@tiptap/core';

	import { Image } from './extensions/image';
	import { Section } from './extensions/section';
	import { Layout } from './extensions/layout';
	import { Link } from './extensions/link';

	import { onDestroy, onMount } from 'svelte';
	import { getEditor } from './EditorContext.svelte';

	export let content: Content;

	const editor = getEditor();

	let element: HTMLDivElement;

	onMount(() => {
		$editor = new Editor({
			element: element,
			extensions: [StarterKit, Image, Section, Layout, Link],
			content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				$editor = $editor;
			},
			onUpdate({ editor }) {
				content = editor.getJSON();
			}
		});
	});
	onDestroy(() => {
		$editor?.destroy();
		$editor = null;
	});
</script>

<div class="content" bind:this={element} />

<style>
	.content :global(.ProseMirror) {
		border-radius: var(--rounded);
		margin: -2rem;
		padding: 2rem;

		&.ProseMirror-focused {
			outline-color: var(--gray-200);
			outline-width: 1px;
			outline-style: solid;
			background: white;
		}
		&:hover {
			outline-color: var(--gray-200);
			outline-width: 1px;
			outline-style: solid;
		}
	}
</style>
