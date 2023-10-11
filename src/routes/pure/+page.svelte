<script lang="ts">
	import type { Editor as TEditor } from '@tiptap/core';

	import { cx } from 'styled-system/css';
	import { container, grid, gridItem, wrap } from 'styled-system/patterns';

	import Content from '$lib/blocks/Content.svelte';
	import EditorContext from '$lib/editor/EditorContext.svelte';
	import Editor from '$lib/editor/Editor.svelte';
	import Menu from '$lib/editor/Menu.svelte';
	import type { Writable } from 'svelte/store';

	let editor: Writable<TEditor>;

	$: content = $editor?.getJSON();
</script>

<article
	class={cx(
		container(),
		grid({
			columns: 2
		})
	)}
>
	<EditorContext bind:editor>
		<Menu class={gridItem({ colSpan: 2 })} />

		<section>
			<Editor
				content={`
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
      `}
			/>
		</section>

		<section class="content">
			{#if content}
				<Content {content} />

				<!-- <pre>{JSON.stringify(content, null, 2)}</pre> -->
			{/if}
		</section>
	</EditorContext>
</article>
