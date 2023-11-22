<script lang="ts">
	import { page } from '$app/stores';

	const menu = [
		{
			name: 'Artikelen',
			url: '/'
		},
		{
			name: 'Ons verhaal',
			url: '/over-ons'
		},
		{
			name: 'Word beter',
			url: '/beter'
		},
		{
			name: 'Downloads',
			url: '/downloads'
		}
	];
</script>

<nav>
	<a class="logo" href="/ohlijf">
		<h1>OhLijf</h1>
		<img src="logo.svg" alt="OhLijf logo" /></a
	>
	<ul>
		{#each menu as item}
			<li data-active={$page.url.pathname === item.url}>
				<a href={item.url}>{item.name}</a>
			</li>
		{/each}
	</ul>
</nav>

<style>
	nav {
		display: grid;
		grid-template-columns: auto auto;
		height: 4.5rem;
		padding: 0 4.5rem;
		background: var(--white);

		& * {
			color: var(--green);
		}
	}

	.logo {
		display: grid;
		grid-template-columns: min-content auto;
		align-items: center;
		text-decoration: none;
		overflow: hidden;

		& h1 {
			font-family: 'Bellota', sans-serif;
			margin: 0;
			font-size: 2.5rem;
		}
		& img {
			height: 100%;
		}
	}

	ul {
		display: grid;
		grid-auto-flow: column;
		justify-items: end;
		align-items: center;
		gap: 1rem;

		padding: 0;
		margin: 0;
		list-style: none;

		color: white;
		font-size: 1.5rem;
		font-weight: 600;

		& > * {
			white-space: nowrap;
		}
		& a {
			text-decoration: none;
		}
	}
</style>
