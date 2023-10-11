<script lang="ts">
	import { css, cx } from 'styled-system/css';
	import { token } from 'styled-system/tokens';

	let className: string | undefined = undefined;
	export { className as class };

	export let active: boolean = false;
</script>

<button
	{...$$props}
	on:click
	data-active={active}
	class={cx(
		className,
		css({
			display: 'flex',
			colorPalette: 'gray',
			'&[data-active="true"]': {
				colorPalette: 'blue'
			},
			background: 'colorPalette.100',
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
		})
	)}
>
	<slot />
</button>
