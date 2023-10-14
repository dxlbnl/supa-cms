<script lang="ts">
	import StarterKit from '@tiptap/starter-kit';
	import { Editor, type Content } from '@tiptap/core';

	import { Image } from './extensions/image';
	import { Section } from './extensions/section';
	import { Layout } from './extensions/layout';
	import { Link } from './extensions/link';

	import { onDestroy, onMount } from 'svelte';
	import { css, cx } from 'styled-system/css';
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
