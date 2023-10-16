<script lang="ts">
	import { page } from '$app/stores';
	import { css } from 'styled-system/css';

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
		}
	];
	const styles = css({
		color: 'gray.400',
		'& li[data-active=true]': {
			color: 'gray.900'
		},
		'& a': {
			color: 'inherit',
			textDecorationLine: 'none'
		},
		'& ul': {
			listStyle: 'none'
		}
	});
</script>

<nav class={styles}>
	<ul>
		{#each menu as item}
			<li data-active={$page.url.pathname === item.url}>
				<a href={item.url}>{item.name}</a>
			</li>
		{/each}
	</ul>
</nav>
