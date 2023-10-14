<script lang="ts" context="module">
	import { CircleDotDashed } from 'lucide-svelte';
	import { css, cva, cx } from 'styled-system/css';

	const button = cva({
		base: {
			display: 'flex',
			background: 'colorPalette.200',
			rounded: 'sm',
			padding: 1,
			_hover: {
				background: 'colorPalette.300'
			},
			_focus: {
				outlineColor: 'colorPalette.400',
				outlineStyle: 'solid',
				outlineWidth: '3px'
			}
		},
		variants: {
			states: {
				initial: {
					colorPalette: 'gray'
				},
				active: {
					colorPalette: 'blue'
				}
			}
		},
		defaultVariants: {
			states: 'initial'
		}
	});
</script>

<script lang="ts">
	import type { SystemProperties } from 'styled-system/types';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let className: string | undefined = undefined;

	export let action: (() => void | Promise<void>) | undefined = undefined;
	export { className as class };
	export let color: SystemProperties['colorPalette'] = undefined;
	export let active: boolean = false;
	export let disabled: boolean = false;

	let loading = false;
</script>

<button
	{...$$props}
	disabled={disabled || loading}
	on:click={async () => {
		loading = true;
		await action?.();
		await dispatch('click');
		loading = false;
	}}
	class={cx(
		css({ colorPalette: color }),
		className,
		button({ states: (active && 'active') || undefined })
	)}
>
	{#if loading}
		<CircleDotDashed
			class={css({
				animation: 'rotate 2s infinite'
			})}
		/>
	{:else}
		<slot name="icon" />
	{/if}
	<slot />
</button>
