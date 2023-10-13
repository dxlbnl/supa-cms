<script lang="ts">
	import { fly } from 'svelte/transition';

	import { createSelect, melt } from '@melt-ui/svelte';

	import { Text, Heading1, Heading2, Heading3, Heading4, Check, ChevronDown } from 'lucide-svelte';
	import { css, cx } from 'styled-system/css';

	import { hstack, vstack } from 'styled-system/patterns';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Editor } from '@tiptap/core';

	const editor = getContext<Writable<Editor>>('editor');

	const textOptions = ['p', 'h1', 'h2', 'h3', 'h4'] as const;
	type TextOption = (typeof textOptions)[number];
	type TextType = {
		type: string;
		attrs?: Record<string, any>;
		icon: ConstructorOfATypedSvelteComponent;
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
			if (shouldReact && next) {
				const nextOption = textConfig[next.value];
				$editor.chain().focus().setNode(nextOption.type, nextOption.attrs).run();
			}

			return next;
		}
	});
	let shouldReact = true;

	const onSelectionUpdate = ({ editor }: { editor: Editor }) => {
		for (let i = 0; i < textOptions.length; i++) {
			const option: TextOption = textOptions[i];
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
		<svelte:component this={textConfig[$selected?.value || 'p'].icon} />
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
