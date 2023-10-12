<script lang="ts">
	import StarterKit from '@tiptap/starter-kit';
	import { Node, Editor, mergeAttributes, type Content } from '@tiptap/core';
	import { Image } from './Image';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { css, cx } from 'styled-system/css';

	export let content: Content;

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
			},
			onUpdate({ editor }) {
				content = editor.getJSON();
			}
		});
	});
</script>

<div
	class={cx(
		'content',
		css({
			'& .ProseMirror': {
				rounded: 'md',
				m: -2,
				p: 2,
				'&.ProseMirror-focused': {
					outlineColor: 'gray.200',
					outlineWidth: '1',
					outlineStyle: 'solid',
					bg: 'white'
				},
				_hover: {
					outlineColor: 'gray.200',
					outlineWidth: '1',
					outlineStyle: 'solid'
				}
			}
		})
	)}
	bind:this={element}
/>
