<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { uploadImage } from '$lib/supabaseClient';
	import type { Editor } from '@tiptap/core';
	import { fly } from 'svelte/transition';

	import { createSelect, melt } from '@melt-ui/svelte';

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
		Check,
		ChevronDown
	} from 'lucide-svelte';
	import { css, cx } from 'styled-system/css';

	import { hstack, stack, vstack, wrap } from 'styled-system/patterns';
	import { type SvelteComponent, getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { page } from '$app/stores';
	import Save from './menu/Save.svelte';

	let cls: string | undefined = undefined;
	export { cls as class };

	let imageInput: HTMLInputElement;

	const editor = getContext<Writable<Editor>>('editor');

	const textOptions = ['p', 'h1', 'h2', 'h3', 'h4'] as const;
	type TextOption = (typeof textOptions)[number];
	type TextType = {
		type: string;
		attrs?: Record<string, any>;
		icon: SvelteComponent;
	};
	const textConfig: Record<TextOption, TextType> = {
		p: {
			type: 'paragraph',
			icon: Text
		},
		h1: {
			type: 'heading',
			attrs: { level: 1 },
			icon: Heading1
		},
		h2: {
			type: 'heading',
			attrs: { level: 2 },
			icon: Heading2
		},
		h3: {
			type: 'heading',
			attrs: { level: 3 },
			icon: Heading3
		},
		h4: {
			type: 'heading',
			attrs: { level: 4 },
			icon: Heading4
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
	const {
		elements: { trigger, menu, option, label },
		states: { selected, open },
		helpers: { isSelected }
	} = createSelect<TextOption>({
		forceVisible: true,
		positioning: {
			placement: 'bottom',
			fitViewport: true,
			sameWidth: true
		},
		defaultSelected: { value: 'p' },
		onSelectedChange({ curr, next }) {
			if (shouldReact) {
				console.log('change', curr, next);
				const nextOption = textConfig[next.value];
				$editor.chain().focus().setNode(nextOption.type, nextOption.attrs).run();
			}

			return next;
		}
	});
	let shouldReact = true;

	const onSelectionUpdate = ({ editor }: { editor: Editor }) => {
		for (const option of textOptions) {
			if (editor.isActive(textConfig[option].type, textConfig[option].attrs)) {
				shouldReact = false;
				selected.set({ value: option });
				shouldReact = true;
				break;
			}
		}
	};
	let listener = false;
	$: if ($editor && !listener) {
		listener = true;
		$editor.on('selectionUpdate', onSelectionUpdate);
		$editor.on('update', onSelectionUpdate);
	}
</script>

{#if $editor}
	<section
		class={cx(
			cls,
			stack({ direction: 'row', justifyContent: 'center', alignItems: 'start', gap: 2 }),
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
		<section>
			<button
				class={cx(
					hstack({ gap: 0 }),
					css({
						p: 1
					})
				)}
				use:melt={$trigger}
			>
				<ChevronDown />
				<svelte:component this={textConfig[$selected.value].icon} />
			</button>

			{#if $open}
				<ul
					use:melt={$menu}
					transition:fly
					class={cx(
						vstack({ gap: 1 }),
						css({
							zIndex: 20,
							p: 1,
							bg: 'white'
						})
					)}
				>
					{#each textOptions as item}
						{@const config = textConfig[item]}
						<li
							use:melt={$option({ value: item })}
							class={cx(
								hstack({ gap: 0 }),
								css({
									position: 'relative',
									rounded: 'md',
									bg: 'gray.100',
									p: 1,
									pl: 6,
									'&[data-highlighted]': {
										bg: 'gray.200'
									},
									'&[data-selected]': {
										bg: 'gray.300'
									}
								})
							)}
						>
							{#if $isSelected(item)}
								<Check
									size={16}
									class={css({
										position: 'absolute',
										left: 1,
										top: '50%',
										zIndex: 20,
										translate: '0 calc(-50% + 1px)'
									})}
								/>
							{/if}
							<svelte:component this={config.icon} />
						</li>{/each}
				</ul>
			{/if}
		</section>

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

		<Save />
	</section>
{/if}
