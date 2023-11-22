<script>
	import Content from '$lib/components/Content.svelte';
	import Header from '$lib/components/Header.svelte';
	import Navigation from '$lib/components/Navigation.svelte';
</script>

<Navigation />

<Header>
	<h1 class="feature">Een lichter leven zonder pijn</h1>
	<p class="feature">Wie we zijn, wat we doen en hoe we iemands leven beter maken.</p>
	<button class="cta">Ontdek onze methode</button>
</Header>

<Content>
	<section class="columns">
		<div>
			<h2>De verlamming van pijn..</h2>
			<p>
				Wij kennen het maar al te goed!<br />Je hebt alles geprobeerd, maar de behandeling werkt
				niet of maar tijdelijk. Je pijn of andere symptomen zorgen ervoor dat je niet alles kan doen
				wat je zou willen. En dat frustreert je!<br />
			</p>
			<a href="#"> Lees meer over de symptomen.. </a>
		</div>
		<div class="frame">
			<img class="Image11" src="/pain.jpeg" />
		</div>
	</section>

	<section>
		<h1>De verlamming van Chronische pijn..</h1>
		<p>Wij kennen het maar al te goed!</p>
		<p>Je hebt alles geprobeerd, maar de behandeling werkt niet of maar tijdelijk.</p>
		<p>
			Je pijn of andere symptomen zorgen ervoor dat je niet alles kan doen wat je zou willen. En dat
			frustreert je!
		</p>
		<a href="/symptomen"> Lees meer over de symptomen.. </a>

		<img src="art-chronische-pijn.svg" />
	</section>
</Content>

<style>
	.frame {
		background: var(--white);
		box-shadow: 10px 10px 4px 2px rgba(0, 0, 0, 0.25);
		border-radius: 25px;
		overflow: hidden;
		border: 3px var(--green) solid;
	}
</style>
