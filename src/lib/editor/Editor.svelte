<script lang="ts">
	import StarterKit from '@tiptap/starter-kit';
	import { Node, Editor, mergeAttributes, type Content } from '@tiptap/core';
	import { Image } from './Image';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

	export let content: Content;

	$: {
		if ($editor) {
			content = $editor.getJSON();
		}
	}

	const editor = getContext<Writable<Editor>>('editor');

	const Section = Node.create({
		name: 'section',

		content: 'block*',
		isolating: true,

		group: 'block',

		renderHTML: () => ['section', 0],

		parseHTML: () => [
			{
				tag: 'section'
			}
		]
	});

	const Layout = Node.create({
		name: 'layout',

		content: 'image section',

		group: 'block',

		renderHTML: ({ HTMLAttributes }) => {
			return [
				'div',
				mergeAttributes(HTMLAttributes, {
					class: 'layout'
				}),
				0
			];
		},
		parseHTML: () => [
			{
				tag: 'div.layout'
			}
		]
	});

	let element: HTMLDivElement;

	onMount(() => {
		$editor = new Editor({
			element: element,
			extensions: [Image, Section, Layout, StarterKit],
			content,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				$editor = $editor;
			}
		});
	});
</script>

<div class="content" bind:this={element} />
