<script lang="ts">
	import Button from '$lib/components/Button.svelte';

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

	import { grid } from 'styled-system/patterns';
	import Save from './Save.svelte';
	import Image from './Image.svelte';
	import TextStyleSelector from './TextStyleSelector.svelte';
	import { supabase, user } from '$lib/supabaseClient';
	import { getEditor } from '../EditorContext.svelte';
	import Link from './Link.svelte';

	let cls: string | undefined = undefined;
	export { cls as class };

	const editor = getEditor();
</script>

{#if $editor}
	<section
		class={cx(
			cls,
			grid({
				gridAutoColumns: 'minmax(32px, min-content)',
				gridAutoFlow: 'column dense',
				justifyContent: 'center'
			}),
			css({
				minWidth: 'fit-content',
				overflowX: 'auto',
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
			on:click={() => $editor?.chain().focus().toggleBold().run()}
			disabled={!$editor.can().chain().focus().toggleBold().run()}
			active={$editor.isActive('bold')}
		>
			<Bold />
		</Button>
		<Button
			on:click={() => $editor?.chain().focus().toggleItalic().run()}
			disabled={!$editor.can().chain().focus().toggleItalic().run()}
			active={$editor.isActive('italic')}
		>
			<Italic />
		</Button>
		<Button
			on:click={() => $editor?.chain().focus().toggleStrike().run()}
			disabled={!$editor.can().chain().focus().toggleStrike().run()}
			active={$editor.isActive('strike')}
		>
			<Strikethrough />
		</Button>

		<Button
			on:click={() => $editor?.chain().focus().toggleBulletList().run()}
			active={$editor.isActive('bulletList')}
		>
			<List />
		</Button>
		<Button
			on:click={() => $editor?.chain().focus().toggleOrderedList().run()}
			active={$editor.isActive('orderedList')}
		>
			<ListOrdered />
		</Button>
		<Button
			on:click={() => $editor?.chain().focus().toggleBlockquote().run()}
			active={$editor.isActive('blockquote')}
		>
			<Quote strokeWidth={1} fill="black" stroke="none" />
		</Button>
		<Button on:click={() => $editor?.chain().focus().setHardBreak().run()}>
			<CornerDownLeft />
		</Button>
		<Button
			on:click={() => $editor?.chain().focus().undo().run()}
			disabled={!$editor.can().chain().focus().undo().run()}
		>
			<Undo2 />
		</Button>
		<Button
			on:click={() => $editor?.chain().focus().redo().run()}
			disabled={!$editor.can().chain().focus().redo().run()}
		>
			<Redo2 />
		</Button>

		<Link />
		<Image />

		<Save />

		<Button
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