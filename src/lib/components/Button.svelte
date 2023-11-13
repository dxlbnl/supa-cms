<script lang="ts" context="module">
	import { CircleDotDashed } from 'lucide-svelte';
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	let className: string | undefined = undefined;

	export let action: (() => void | Promise<void>) | undefined = undefined;
	export { className as class };

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
	class:active
>
	{#if loading}
		<CircleDotDashed />
	{:else}
		<slot name="icon" />
	{/if}
	<slot />
</button>

<style>
	button {
		--_background: var(--button-background, --gray-200);
		--_hover: var(--button-hover, --gray-300);
		--_outline: var(--button-outline, --gray-400);

		display: flex;
		background: var(--_background);
		border-radius: var(--rounded);
		padding: 1rem;

		&:hover {
			background: var(--_hover);
		}
		&:focus {
			outline-color: var(--_outline);
			outline-style: solid;
			outline-width: 3px;
		}

		& > :global(svg) {
			animation: rotate 2s infinite;
		}
	}
</style>
