<script lang="ts">
	import StarterKit from '@tiptap/starter-kit';
	import { Node, Editor, mergeAttributes } from '@tiptap/core';
	import { Image } from './Image';
	import { getContext, onMount } from 'svelte';
	import type { Writable } from 'svelte/store';

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
			content: `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
          </p>
          <div class='layout'>
            <img src='https://veesqakrutpzcryhdhrx.supabase.co/storage/v1/object/public/media/not-google.png' />
            <p>there</p>
          </div>
          <ul>
            <li>
              That’s a bullet list with one …
            </li>
            <li>
              … or two list items.
            </li>
          </ul>
          <p>
            Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
          </p>
          <pre><code class="language-css">body {
      display: none;
    }</code></pre>
          <p>
            I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
          </p>
          <blockquote>
            Wow, that’s amazing. Good work, boy! 👏
            <br />
            — Mom
          </blockquote>
        `,
			onTransaction: () => {
				// force re-render so `editor.isActive` works as expected
				$editor = $editor;
			}
		});
	});
</script>

<div class="content" bind:this={element} />
