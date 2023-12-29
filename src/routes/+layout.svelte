<script lang="ts">
	import '@fontsource/bellota/400.css';
	import '@fontsource/bellota/700.css';
	import '@fontsource/fira-sans';

	import '@fontsource/raleway';

	import '../app.css';

	import Content from '$lib/components/Content.svelte';
	import Header from '$lib/components/Header.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
	import WieZijnWij from '$lib/components/WijZijnWij.svelte';
</script>

<Navigation />

<Header>
	<h1 class="feature">Een lichter leven zonder pijn</h1>
	<p class="feature">Wie we zijn, wat we doen en hoe we iemands leven beter maken.</p>
	<button class="cta">Ontdek onze methode</button>
</Header>

<Content>
	<slot />
</Content>

<WieZijnWij />

<section class="content">
	<p>Download ons selfcare werkboek</p>
	<button>Gratis download!</button>
</section>

<footer></footer>

<style>
	.frame {
		background: var(--white);
		box-shadow: 10px 10px 4px 2px rgba(0, 0, 0, 0.25);
		border-radius: 25px;
		overflow: hidden;
		border: 3px var(--green) solid;

		align-self: center;
	}

	footer {
		height: 7rem;
		background: #8bc385;
	}
</style>
