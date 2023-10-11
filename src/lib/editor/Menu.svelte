<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { uploadImage } from '$lib/supabaseClient';
	import type { Editor } from '@tiptap/core';
	import { cx } from 'styled-system/css';

	import { wrap } from 'styled-system/patterns';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let cls: string | undefined = undefined;
	export { cls as class };

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

{#if $editor}
	<section class={cx(cls, wrap({ direction: 'row' }))}>
		<Button
			compact
			on:click={() => $editor.chain().focus().toggleBold().run()}
			disabled={!$editor.can().chain().focus().toggleBold().run()}
			active={$editor.isActive('bold')}
		>
			bold
		</Button>
		<Button
			compact
			on:click={() => $editor.chain().focus().toggleItalic().run()}
			disabled={!$editor.can().chain().focus().toggleItalic().run()}
			active={$editor.isActive('italic')}
		>
			italic
		</Button>
		<Button
			compact
			on:click={() => $editor.chain().focus().toggleStrike().run()}
			disabled={!$editor.can().chain().focus().toggleStrike().run()}
			active={$editor.isActive('strike')}
		>
			strike
		</Button>
		<Button
			compact
			on:click={() => $editor.chain().focus().toggleCode().run()}
			disabled={!$editor.can().chain().focus().toggleCode().run()}
			active={$editor.isActive('code')}
		>
			code
		</Button>
		<Button compact on:click={() => $editor.chain().focus().unsetAllMarks().run()}
			>clear marks</Button
		>
		<Button compact on:click={() => $editor.chain().focus().clearNodes().run()}>clear nodes</Button>
		<Button
			compact
			on:click={() => $editor.chain().focus().setParagraph().run()}
			active={$editor.isActive('paragraph')}
		>
			paragraph
		</Button>
		<Button
			compact
			on:click={() => $editor.chain().focus().toggleHeading({ level: 1 }).run()}
			active={$editor.isActive('heading')}
		>
			h1
		</Button>
		<Button
			compact
			on:click={() => $editor.chain().focus().toggleHeading({ level: 2 }).run()}
			active={$editor.isActive('heading')}
		>
			h2
		</Button>
		<Button
			compact
			on:click={() => $editor.chain().focus().toggleHeading({ level: 3 }).run()}
			active={$editor.isActive('heading')}
		>
			h3
		</Button>
		<Button
			compact
			on:click={() => $editor.chain().focus().toggleHeading({ level: 4 }).run()}
			active={$editor.isActive('heading')}
		>
			h4
		</Button>
		<Button
			compact
			on:click={() => $editor.chain().focus().toggleHeading({ level: 5 }).run()}
			active={$editor.isActive('heading')}
		>
			h5
		</Button>
		<Button
			compact
			on:click={() => $editor.chain().focus().toggleHeading({ level: 6 }).run()}
			active={$editor.isActive('heading')}
		>
			h6
		</Button>
		<Button
			compact
			on:click={() => $editor.chain().focus().toggleBulletList().run()}
			active={$editor.isActive('bulletList')}
		>
			bullet list
		</Button>
		<Button
			compact
			on:click={() => $editor.chain().focus().toggleOrderedList().run()}
			active={$editor.isActive('orderedList')}
		>
			ordered list
		</Button>
		<Button
			compact
			on:click={() => $editor.chain().focus().toggleCodeBlock().run()}
			active={$editor.isActive('codeBlock')}
		>
			code block
		</Button>
		<Button
			compact
			on:click={() => $editor.chain().focus().toggleBlockquote().run()}
			active={$editor.isActive('blockquote')}
		>
			blockquote
		</Button>
		<Button compact on:click={() => $editor.chain().focus().setHorizontalRule().run()}>
			horizontal rule
		</Button>
		<Button compact on:click={() => $editor.chain().focus().setHardBreak().run()}>hard break</Button
		>
		<Button
			compact
			on:click={() => $editor.chain().focus().undo().run()}
			disabled={!$editor.can().chain().focus().undo().run()}
		>
			undo
		</Button>
		<Button
			compact
			on:click={() => $editor.chain().focus().redo().run()}
			disabled={!$editor.can().chain().focus().redo().run()}
		>
			redo
		</Button>
		<input
			type="file"
			accept="image/*"
			on:change={handleImage}
			disabled={!$editor.can().chain().focus().setImage({ src: '/image.jpg' }).run()}
		/>
	</section>
{/if}
