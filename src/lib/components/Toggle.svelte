<script lang="ts">
	import { createToggle, melt } from '@melt-ui/svelte';
	import type { Writable } from 'svelte/store';

	export let pressed: Writable<boolean>;

	const {
		elements: { root }
	} = createToggle({ pressed });
</script>

<button use:melt={$root} aria-label="Toggle italic">
	<slot />
</button>

<style>
	[data-state='on'] {
		background: green;
	}
</style>
