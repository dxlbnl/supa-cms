<script lang="ts">
	import { css } from 'styled-system/css';

	const style = css({
		position: 'fixed',
		left: '50%',

		border: '5px solid',
		borderColor: 'blue.400',
		rounded: 'sm',

		top: '20%',
		marginLeft: '-100px',
		minWidth: '200px',
		minHeight: '200px',

		bg: 'white',

		zIndex: '1000'
	});
</script>

<div class={style} />
