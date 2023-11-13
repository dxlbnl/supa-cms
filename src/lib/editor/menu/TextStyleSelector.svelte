<script lang="ts">
	import { fly } from 'svelte/transition';

	import { createSelect, melt } from '@melt-ui/svelte';

	import { Text, Heading1, Heading2, Heading3, Heading4, Check, ChevronDown } from 'lucide-svelte';

	import type { Editor } from '@tiptap/core';
	import { getEditor } from '../EditorContext.svelte';

	const editor = getEditor();

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
				$editor?.chain().focus().setNode(nextOption.type, nextOption.attrs).run();
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
	<button use:melt={$trigger}>
		<ChevronDown />
		<svelte:component this={textConfig[$selected?.value || 'p'].icon} />
	</button>

	{#if $open}
		<ul use:melt={$menu} transition:fly>
			{#each textOptions as item}
				{@const config = textConfig[item]}
				<li use:melt={$option({ value: item })}>
					{#if $isSelected(item)}
						<Check size={16} />
					{/if}
					<svelte:component this={config.icon} />
				</li>{/each}
		</ul>
	{/if}
</section>

<style>
	button {
		display: flex;
		flex-direction: row;
		gap: 0;

		padding: 0.5rem;
	}

	ul {
		display: flex;
		flex-direction: column;

		z-index: 20;
		padding: 0.5rem;
		background-color: white;

		li {
			display: flex;
			flex-direction: row;
			gap: 0;

			position: relative;
			border-radius: var(--radius);
			background-color: var(--gray-100);
			padding: 0.5rem;
			padding-left: 3rem;

			[data-highlighted] {
				background-color: var(--gray-200);
			}
			[data-selected] {
				background-color: var(--gray-300);
			}

			:global(svg) {
				position: absolute;
				left: 0.5rem;
				top: 50%;
				z-index: 20;
				transform: 0 calc(-50% + 1px);
			}
		}
	}
</style>
