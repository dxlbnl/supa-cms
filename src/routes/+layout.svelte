<script lang="ts">
	import '@fontsource/inconsolata';
	import '@fontsource/alfa-slab-one';
	import '@fontsource-variable/open-sans';

	import '../app.css';
</script>

<header>
	<h1>Title</h1>

	<nav>
		<ul>
			<li>
				<a href="/">Home</a>
				<a href="/pag1">things</a>
				<a href="/pag1">page 2</a>
				<a href="/pag1">page 3</a>
			</li>
		</ul>
	</nav>
</header>

<main>
	<slot />
</main>
