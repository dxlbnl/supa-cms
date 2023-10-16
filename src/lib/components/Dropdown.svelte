<script lang="ts">
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import Button from './Button.svelte';
	import { css } from 'styled-system/css';

	export let items: string[];

	let open = false;
</script>

<section>
	<Button
		class={css({
			'& button': {
				display: 'none',
				_active: {
					display: 'initial'
				}
			}
		})}
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
