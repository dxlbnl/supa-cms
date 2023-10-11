<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import { uploadImage } from '$lib/supabaseClient';
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
		Image,
		Text,
		Heading1,
		Heading2,
		Heading3,
		Heading4,
		Heading5,
		Heading6
	} from 'lucide-svelte';
	import { css, cx } from 'styled-system/css';

	import { stack, wrap } from 'styled-system/patterns';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let cls: string | undefined = undefined;
	export { cls as class };

	let imageInput: HTMLInputElement;

	const editor = getContext<Writable<Editor>>('editor');

	const textNodes = [
		{
			name: 'paragraph',
			icon: Text,
			onSelect: () => {},
			isSelected
		},
		{
			name: 'h1',
			icon: Heading1,
			onSelect: () => {},
			isSelected
		},
		{
			name: 'h2',
			icon: Heading2,
			onSelect: () => {},
			isSelected
		},
		{
			name: 'h3',
			icon: Heading3,
			onSelect: () => {},
			isSelected
		},
		{
			name: 'h4',
			icon: Heading4,
			onSelect: () => {},
			isSelected
		},
		{
			name: 'h5',
			icon: Heading5,
			onSelect: () => {},
			isSelected
		},
		{
			name: 'h6',
			icon: Heading6,
			onSelect: () => {},
			isSelected
		}
	];
	const textNodes = ['paragraph', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
	const setTextNode = (event: CustomEvent<string>): void => {
		if (!(event.detail in textNodes)) return;

		switch (event.detail) {
			case 'paragraph':
				() => $editor.chain().focus().setParagraph().run();
				break;
			case 'h1':
				() => $editor.chain().focus().toggleHeading({ level: 1 }).run();
				break;
			case 'h2':
				() => $editor.chain().focus().toggleHeading({ level: 2 }).run();
				break;
			case 'h3':
				() => $editor.chain().focus().toggleHeading({ level: 3 }).run();
				break;
			case 'h4':
				() => $editor.chain().focus().toggleHeading({ level: 4 }).run();
				break;
			case 'h5':
				() => $editor.chain().focus().toggleHeading({ level: 5 }).run();
				break;
			case 'h6':
				() => $editor.chain().focus().toggleHeading({ level: 6 }).run();
				break;
		}
	};

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
	<section
		class={cx(
			cls,
			stack({ direction: 'row', justifyContent: 'center' }),
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

		<Dropdown items={textNodes} on:change={setTextNode} let:item>
			<Button name={item}>
				<svelte:component
					this={{ paragraph: Text, h1: Heading1, h2: Heading2, h3: Heading3 }[item]}
				/>
			</Button>
		</Dropdown>

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
			<Quote strokeWidth={1} />
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
		<Button on:click={() => imageInput.click()}>
			<input
				bind:this={imageInput}
				type="file"
				accept="image/*"
				on:change={handleImage}
				disabled={!$editor.can().chain().focus().setImage({ src: '/image.jpg' }).run()}
				style:display="none"
			/>
			<Image />
		</Button>
	</section>
{/if}
