<script lang="ts">
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { css } from 'styled-system/css';
</script>

<h1 class={css({ textAlign: 'center', mb: 20 })}>{$page.status}</h1>
<p>{$page.error?.message}</p>

<form method="POST" action="?/create">
	<Button>Create a page</Button>
</form>
