<script lang="ts">
	import StarterKit from '@tiptap/starter-kit';
	import { Editor } from '@tiptap/core';
	import { onMount } from 'svelte';

	import { Button } from '$lib/components';

	import { Node } from '@tiptap/core';
	import Content from '$lib/blocks/Content.svelte';

	const Layout = Node.create({
		name: 'layout',

		content: 'block*',

		group: 'block',

		renderHTML: () => {
			return [
				'div',
				{
					class: 'layout'
				},
				0
			];
		},
		parseHTML: () => [
			{
				tag: 'div.layout'
			}
		],
		defining: true
	});

	let element: HTMLDivElement;
	let editor: Editor;

	onMount(() => {
		editor = new Editor({
			element: element,
			extensions: [Layout, StarterKit],
			content: `
            <h2>
              Hi there,
            </h2>
            <p>
              this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
            </p>
            <div class='layout'>
              <p>Hi</p>
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
				editor = editor;
			}
		});
	});

	$: content = editor?.getJSON();
</script>

<article>
	<section>
		{#if editor}
			<div>
				<section class="menu">
					<Button
						compact
						on:click={() => editor.chain().focus().toggleBold().run()}
						disabled={!editor.can().chain().focus().toggleBold().run()}
						color={editor.isActive('bold') ? 'blue' : 'gray'}
					>
						bold
					</Button>
					<Button
						compact
						on:click={() => editor.chain().focus().toggleItalic().run()}
						disabled={!editor.can().chain().focus().toggleItalic().run()}
						color={editor.isActive('italic') ? 'blue' : 'gray'}
					>
						italic
					</Button>
					<Button
						compact
						on:click={() => editor.chain().focus().toggleStrike().run()}
						disabled={!editor.can().chain().focus().toggleStrike().run()}
						color={editor.isActive('strike') ? 'blue' : 'gray'}
					>
						strike
					</Button>
					<Button
						compact
						on:click={() => editor.chain().focus().toggleCode().run()}
						disabled={!editor.can().chain().focus().toggleCode().run()}
						color={editor.isActive('code') ? 'blue' : 'gray'}
					>
						code
					</Button>
					<Button compact on:click={() => editor.chain().focus().unsetAllMarks().run()}
						>clear marks</Button
					>
					<Button compact on:click={() => editor.chain().focus().clearNodes().run()}
						>clear nodes</Button
					>
					<Button
						compact
						on:click={() => editor.chain().focus().setParagraph().run()}
						color={editor.isActive('paragraph') ? 'blue' : 'gray'}
					>
						paragraph
					</Button>
					<Button
						compact
						on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
						color={editor.isActive('heading') ? 'blue' : 'gray'}
					>
						h1
					</Button>
					<Button
						compact
						on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
						color={editor.isActive('heading') ? 'blue' : 'gray'}
					>
						h2
					</Button>
					<Button
						compact
						on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
						color={editor.isActive('heading') ? 'blue' : 'gray'}
					>
						h3
					</Button>
					<Button
						compact
						on:click={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
						color={editor.isActive('heading') ? 'blue' : 'gray'}
					>
						h4
					</Button>
					<Button
						compact
						on:click={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
						color={editor.isActive('heading') ? 'blue' : 'gray'}
					>
						h5
					</Button>
					<Button
						compact
						on:click={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
						color={editor.isActive('heading') ? 'blue' : 'gray'}
					>
						h6
					</Button>
					<Button
						compact
						on:click={() => editor.chain().focus().toggleBulletList().run()}
						color={editor.isActive('bulletList') ? 'blue' : 'gray'}
					>
						bullet list
					</Button>
					<Button
						compact
						on:click={() => editor.chain().focus().toggleOrderedList().run()}
						color={editor.isActive('orderedList') ? 'blue' : 'gray'}
					>
						ordered list
					</Button>
					<Button
						compact
						on:click={() => editor.chain().focus().toggleCodeBlock().run()}
						color={editor.isActive('codeBlock') ? 'blue' : 'gray'}
					>
						code block
					</Button>
					<Button
						compact
						on:click={() => editor.chain().focus().toggleBlockquote().run()}
						color={editor.isActive('blockquote') ? 'blue' : 'gray'}
					>
						blockquote
					</Button>
					<Button compact on:click={() => editor.chain().focus().setHorizontalRule().run()}>
						horizontal rule
					</Button>
					<Button compact on:click={() => editor.chain().focus().setHardBreak().run()}
						>hard break</Button
					>
					<Button
						compact
						on:click={() => editor.chain().focus().undo().run()}
						disabled={!editor.can().chain().focus().undo().run()}
					>
						undo
					</Button>
					<Button
						compact
						on:click={() => editor.chain().focus().redo().run()}
						disabled={!editor.can().chain().focus().redo().run()}
					>
						redo
					</Button>
				</section>
			</div>
		{/if}
		<div bind:this={element} />
	</section>

	<section>
		{#if content}
			<Content {content} />

			<pre>{JSON.stringify(content, null, 2)}</pre>
		{/if}
	</section>
</article>

<style>
	article {
		display: grid;
		grid-template-columns: 1fr 1fr;
	}

	pre {
		white-space: break-spaces;
	}

	.menu {
		display: flex;
		flex-flow: wrap;
	}
</style>
