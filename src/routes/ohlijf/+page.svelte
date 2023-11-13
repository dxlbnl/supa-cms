<header>
	<img width="100%" src="swing-on-the-campuhan-ridge-walk-ubud 3.png" alt="swinging" />
	<p class="tagline">Een lichter leven zonder pijn</p>
	<section>
		<button>Ontdek onze methode</button>
	</section>

	<section class="darken" />

	<nav>
		<a href="/ohlijf">OhLijf <img src="logo.svg" alt="OhLijf logo" /></a>
		<ul>
			<li>Artikelen</li>
			<li>Ons verhaal</li>
			<li>Word beter</li>
			<li>Downloads</li>
		</ul>
	</nav>
</header>

<main class="content">
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

	<svg viewBox="0 0 1440 2142" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M756.929 104.328C1032 -70.7422 1381.73 50.0487 1516 104.328V2087.65C1516 1961.41 873.614 1896.15 670.037 2038.86C507.175 2153.03 17.7201 2146.2 -76 2087.65V104.328C82.8897 158.607 501.693 266.774 756.929 104.328Z"
			fill="white"
			stroke="url(#paint0_linear_1_27)"
			stroke-width="25"
		/>
		<defs>
			<linearGradient
				id="paint0_linear_1_27"
				x1="497.979"
				y1="201.932"
				x2="882.317"
				y2="-62.6218"
				gradientUnits="userSpaceOnUse"
			>
				<stop stop-color="#8BC385" />
				<stop offset="1" stop-color="#3A8033" />
			</linearGradient>
		</defs>
	</svg>
</main>

<style>
	header {
		display: grid;
		grid-template-areas: 'stack';

		& > * {
			grid-area: stack;
		}

		& .darken {
			background: linear-gradient(
				117deg,
				rgba(0, 0, 0, 0.58) 15.34%,
				rgba(0, 0, 0, 0.42) 43.12%,
				rgba(58, 128, 51, 0) 74.85%
			);
		}

		& nav {
			display: grid;
			grid-template-columns: 1fr 1fr;
			height: 6rem;

			& > a {
				display: flex;
				color: #ffe5d6;
				font-size: 4.6rem;
				text-decoration: none;
			}

			& ul {
				display: grid;
				grid-template-columns: repeat(5 1fr);
				justify-items: center;
				list-style: none;

				color: white;
				font-size: 1.5rem;
				font-weight: 600;

				& > * {
					white-space: nowrap;
				}
			}
		}
	}
</style>
