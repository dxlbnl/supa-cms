<script lang="ts">
	import { SvelteUIProvider } from '@svelteuidev/core';
</script>

<SvelteUIProvider themeObserver="dark">
	<main>
		<slot />
	</main>
</SvelteUIProvider>
