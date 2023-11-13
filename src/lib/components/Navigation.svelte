<script lang="ts">
	import { page } from '$app/stores';

	const menu = [
		{
			name: 'Home',
			url: '/'
		},
		{
			name: 'About',
			url: '/about'
		},
		{
			name: 'Tech',
			url: '/tech'
		},
		{
			name: 'Contact',
			url: '/contact'
		},
		{ name: 'Login', url: '/login' },
		{ name: 'Images', url: '/images' }
	];
</script>

<nav>
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
		color: var(--gray-400);

		& li.active {
			color: var(--gray-900);
		}

		& a {
			color: inherit;
			text-decoration-line: none;
		}

		& ul {
			list-style: none;
		}
	}
</style>
