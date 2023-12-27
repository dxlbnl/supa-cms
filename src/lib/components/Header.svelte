<header>
	<section class="background">
		<img
			class="background"
			width="100%"
			src="swing-on-the-campuhan-ridge-walk-ubud 3.png"
			alt="swinging"
		/>
	</section>
	<section class="darken" />

	<section class="content">
		<slot />
	</section>
</header>

<style>
	header {
		/* position: relative; */
		display: grid;
		grid-template-areas: 'stack';
		/* aspect-ratio: 16/8; */
		/* height: auto; */
		min-height: min-content;
		overflow: hidden;

		& > * {
			grid-area: stack;
		}

		& > .background {
			position: relative;
			z-index: -10;

			& > img {
				position: absolute;
				inset: 0;
				object-fit: cover;
				object-position: center;
				height: 100%;
				width: 100%;
			}
		}

		& .darken {
			inset: 0;
			z-index: -4;
			background: linear-gradient(
				117deg,
				rgba(0, 0, 0, 0.58) 15.34%,
				rgba(0, 0, 0, 0.42) 43.12%,
				rgba(58, 128, 51, 0) 74.85%
			);
		}
	}

	.content {
		border: thin solid teal;
		color: white;
		justify-items: start;

		padding-block: 4rem 11rem;

		& > h1 {
			font-size: 4rem;
			line-height: 5rem;
			margin-block: 1rem;
		}
	}
</style>
