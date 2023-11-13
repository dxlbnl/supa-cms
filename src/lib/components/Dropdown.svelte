<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import Button from './Button.svelte';

	export let items: string[];

	let open = false;
</script>

<section>
	<Button
		on:click={() => {
			open = !open;
		}}
	>
		{#if open}
			<ChevronUp />
		{:else}
			<ChevronDown />
		{/if}
	</Button>

	{#if open}
		{#each items as item (item)}
			<slot {item} />
		{/each}
	{/if}
</section>

<style>
	section > :global(button) {
		display: none;

		.active {
			display: initial;
		}
	}
</style>
