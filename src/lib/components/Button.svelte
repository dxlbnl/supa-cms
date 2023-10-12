<script lang="ts" context="module">
	import { css, cx } from 'styled-system/css';
	export const styles = css({
		display: 'flex',
		colorPalette: 'gray',
		'&[data-active="true"]': {
			colorPalette: 'blue'
		},
		background: 'colorPalette.200',
		_hover: {
			background: 'colorPalette.300'
		},
		_focus: {
			outlineColor: 'colorPalette.400',
			outlineStyle: 'solid',
			outlineWidth: '3px'
		},
		rounded: '.5em',
		padding: 1
	});
</script>

<script lang="ts">
	import { token } from 'styled-system/tokens';

	let className: string | undefined = undefined;
	export { className as class };

	export let active: boolean = false;
</script>

<button {...$$props} on:click data-active={active} class={cx(className, styles)}>
	<slot />
</button>
