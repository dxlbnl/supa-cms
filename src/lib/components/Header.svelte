<header>
	<img width="100%" src="swing-on-the-campuhan-ridge-walk-ubud 3.png" alt="swinging" />
	<section class="darken" />

	<section class="content">
		<slot />
	</section>
</header>

<style>
	header {
		display: grid;
		grid-template-areas: 'stack';
		aspect-ratio: 16/8;
		height: auto;
		min-height: min-content;
		overflow: hidden;

		& > * {
			grid-area: stack;
		}

		& > img {
			object-fit: cover;
			object-position: center;
		}

		& .darken {
			background: linear-gradient(
				117deg,
				rgba(0, 0, 0, 0.58) 15.34%,
				rgba(0, 0, 0, 0.42) 43.12%,
				rgba(58, 128, 51, 0) 74.85%
			);
		}
	}

	.content {
		color: white;
		justify-items: start;

		& > h1 {
			font-size: 4rem;
			line-height: 5rem;
			margin-block: 4rem 1rem;
		}
	}
</style>
