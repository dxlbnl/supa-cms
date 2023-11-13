<script lang="ts">
	import Navigation from '$lib/components/Navigation.svelte';

	import { css, cx } from 'styled-system/css';
	import { grid, gridItem } from 'styled-system/patterns';
</script>

<main
	class={cx(
		css({
			minHeight: '100vh',
			flexBasis: '50rem'
		}),
		grid({
			gridTemplateColumns: '1fr 2fr'
		})
	)}
>
	<header
		class={css({
			position: 'sticky',
			top: 0,
			textAlign: 'right',
			pt: 32,
			alignSelf: 'start'
		})}
	>
		<h1
			class={css({
				mb: 16
			})}
		>
			PROJECT
		</h1>

		<Navigation />
	</header>

	<content
		class={css({
			p: 4,
			pt: 32
		})}
	>
		<slot />
	</content>
</main>
