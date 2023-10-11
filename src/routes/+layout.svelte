<script lang="ts">
	import '@fontsource/inconsolata';
	import '@fontsource/alfa-slab-one';
	import '@fontsource-variable/open-sans';

	import '../app.css';
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
			textAlign: 'right',
			alignSelf: 'center'
		})}
	>
		<h1
			class={css({
				mb: 16
			})}
		>
			PROJECT
		</h1>

		<nav>
			<ul>
				<li>
					<a href="/">Home</a>
				</li>
				<li>
					<a href="/about">About</a>
				</li>
				<li>
					<a href="/tech">Tech</a>
				</li>
				<li>
					<a href="/contact">Contact</a>
				</li>
			</ul>
		</nav>
	</header>

	<content
		class={css({
			p: 8
		})}
	>
		<slot />
	</content>
</main>
