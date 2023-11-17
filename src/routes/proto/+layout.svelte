<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';
</script>

<main>
	<header>
		<h1>PROJECT</h1>

		<Navigation />
	</header>

	<content>
		<slot />
	</content>
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 1fr 2fr;

		min-height: 100vh;
		flex-basis: 50rem;
	}

	header {
		position: sticky;
		top: 0;
		text-align: right;
		padding-top: 4rem;

		align-self: start;

		& h1 {
			margin-bottom: 2rem;
		}
	}

	content {
		padding: 1rem;
		padding-top: 4rem;
	}
</style>
