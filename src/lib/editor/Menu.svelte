<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import type { Editor } from '@tiptap/core';

	import {
		Bold,
		Italic,
		List,
		ListOrdered,
		Quote,
		Strikethrough,
		Undo2,
		Redo2,
		CornerDownLeft,
		LogOut
	} from 'lucide-svelte';
	import { css, cx } from 'styled-system/css';

	import { grid, stack } from 'styled-system/patterns';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import Save from './menu/Save.svelte';
	import Image from './menu/Image.svelte';
	import TextStyleSelector from './menu/TextStyleSelector.svelte';
	import { supabase, user } from '$lib/supabaseClient';

	let cls: string | undefined = undefined;
	export { cls as class };

	const editor = getContext<Writable<Editor>>('editor');
</script>

{#if $editor}
	<section
		class={cx(
			cls,
			grid({ gridAutoColumns: 32, gridAutoFlow: 'column dense', justifyContent: 'center' }),
			css({
				position: 'fixed',
				top: 0,
				left: 0,
				bg: 'white',
				zIndex: 10,
				w: '100%'
			})
		)}
	>
		<TextStyleSelector />
		<Button
			on:click={() => $editor.chain().focus().toggleBold().run()}
			disabled={!$editor.can().chain().focus().toggleBold().run()}
			active={$editor.isActive('bold')}
		>
			<Bold />
		</Button>
		<Button
			on:click={() => $editor.chain().focus().toggleItalic().run()}
			disabled={!$editor.can().chain().focus().toggleItalic().run()}
			active={$editor.isActive('italic')}
		>
			<Italic />
		</Button>
		<Button
			on:click={() => $editor.chain().focus().toggleStrike().run()}
			disabled={!$editor.can().chain().focus().toggleStrike().run()}
			active={$editor.isActive('strike')}
		>
			<Strikethrough />
		</Button>

		<Button
			on:click={() => $editor.chain().focus().toggleBulletList().run()}
			active={$editor.isActive('bulletList')}
		>
			<List />
		</Button>
		<Button
			on:click={() => $editor.chain().focus().toggleOrderedList().run()}
			active={$editor.isActive('orderedList')}
		>
			<ListOrdered />
		</Button>
		<Button
			on:click={() => $editor.chain().focus().toggleBlockquote().run()}
			active={$editor.isActive('blockquote')}
		>
			<Quote strokeWidth={1} fill="black" stroke="none" />
		</Button>
		<Button compact on:click={() => $editor.chain().focus().setHardBreak().run()}>
			<CornerDownLeft />
		</Button>
		<Button
			on:click={() => $editor.chain().focus().undo().run()}
			disabled={!$editor.can().chain().focus().undo().run()}
		>
			<Undo2 />
		</Button>
		<Button
			on:click={() => $editor.chain().focus().redo().run()}
			disabled={!$editor.can().chain().focus().redo().run()}
		>
			<Redo2 />
		</Button>

		<Image />

		<Save />

		<Button
			class={css({
				gridColumn: 'span 2',
				justifySelf: 'end'
			})}
			on:click={async () => {
				await supabase.auth.signOut();
				console.log('LoggedOut?');
			}}
		>
			{#if $user}
				<img src={$user.avatar} alt={$user.name} height="24" width="24" />
			{/if}
			<LogOut />
		</Button>
	</section>
{/if}
