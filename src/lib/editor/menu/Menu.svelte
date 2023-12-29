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
		LogOut,
		FileEdit,
		X
	} from 'lucide-svelte';

	import Save from './Save.svelte';
	import Image from './Image.svelte';
	import TextStyleSelector from './TextStyleSelector.svelte';
	import { supabase, user } from '$lib/supabaseClient';
	import { getEditor } from '../EditorContext.svelte';
	import Link from './Link.svelte';
	import { writable, type Writable } from 'svelte/store';
	import { fade, fly } from 'svelte/transition';

	let cls: string | undefined = undefined;
	export { cls as class };
	export let editable: Writable<boolean> = writable(false);

	const editor = getEditor();
</script>

{#if $user}
	<section class="menu {cls ?? ''}">
		<container>
			<section class="toolbar" transition:fade>
				{#if $editor && $editable}
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

					<Save {editable} />
				{/if}
			</section>

			<section class="toolbar">
				<Button on:click={() => ($editable = !$editable)}>
					{#if !$editable}
						<FileEdit />
					{:else}
						<X />
					{/if}
				</Button>

				<Button
					style="height: 32px; overflow: hidden"
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
		</container>
	</section>
{/if}

<style>
	.menu {
		overflow-x: auto;
		position: sticky;
		top: 0;
		background: white;
		z-index: 10;
		/* width: 100%; */
		justify-self: end;
		padding: 0.5rem;

		display: flex;
		flex-flow: row nowrap;
		justify-content: center;

		& container {
			flex-basis: 50rem;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
		}
	}

	.toolbar {
		display: grid;
		grid-auto-columns: minmax(32px, min-content);
		grid-auto-flow: column dense;
		justify-content: end;
	}
</style>
