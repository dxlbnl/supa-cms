import { defineTextStyles, defineConfig, defineGlobalStyles } from '@pandacss/dev';

const textStyles = defineTextStyles({
	body: {
		description: 'The body text style - used in paragraphs',
		value: {
			fontFamily: 'Open Sans Variable',
			fontWeight: '500',
			fontSize: '16',
			lineHeight: '24',
			letterSpacing: '0',
			textDecoration: 'None',
			textTransform: 'None'
		}
	},
	heading: {
		value: {
			fontFamily: 'Alfa Slab One',
			fontWeight: '500',
			fontSize: '1.5rem',
			lineHeight: '1.5rem',
			letterSpacing: '0',
			textDecoration: 'None',
			textTransform: 'None'
		}
	},
	code: {
		value: {
			fontFamily: 'Inconsolata',
			fontSize: '.7rem'
		}
	}
});

const globalCss = defineGlobalStyles({
	'html, body': {
		textStyle: 'body',
		color: 'gray.900',
		backgroundColor: 'gray.100',
		lineHeight: '1.5'
	},
	body: {
		display: 'flex',
		justifyContent: 'center'
	},
	a: {
		color: 'blue.500',
		textDecoration: 'underline',
		cursor: 'pointer'
	},
	'h1,h2,h3,h4,h5,h6': {
		textStyle: 'heading',
		margin: '.5rem 0'
	},
	h1: {
		fontSize: '2.5rem',
		lineHeight: '2.5rem',
		fontWeight: '900'
	},
	h2: {
		fontSize: '2rem',
		fontWeight: '700'
	},
	h3: {
		fontSize: '1.5rem',
		fontWeight: '700'
	},
	h4: {
		fontSize: '1.2rem',
		fontWeight: '500'
	},
	h5: {
		fontSize: '1.2rem',
		fontWeight: '300'
	},
	h6: {
		fontSize: '1rem',
		fontWeight: '300'
	},

	ul: {
		listStyle: 'disc',
		marginLeft: '1rem'
	},

	input: {
		rounded: 'md'
	},

	'pre, code': {
		textStyle: 'code'
	},

	'.layout': {
		display: 'grid',
		gridTemplateColumns: 'repeat(2, 1fr)',
		gridGap: '1em'
	},

	blockquote: {
		bg: 'gray.100',
		pl: 8
	},
	'p:empty': {
		height: 6
	}
});

export default defineConfig({
	// Whether to use css reset
	preflight: true,

	// Where to look for your css declarations
	include: ['./src/**/*.{js,ts,svelte}'],

	// Files to exclude
	exclude: [],

	// Useful for theme customization
	theme: {
		extend: {
			textStyles
		}
	},

	globalCss,

	// The output directory for your css system
	outdir: 'styled-system'
});
