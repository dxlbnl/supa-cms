<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import Button from '$lib/components/Button.svelte';
	import { createPage } from '$lib/supabaseClient';
	import { Plus } from 'lucide-svelte';
</script>

<h1>{$page.status}</h1>
<p>{$page.error?.message}</p>

<Button
	on:click={async () => {
		await createPage($page.params.slug);
		goto($page.params.slug);
	}}
>
	<Plus /> Create a page</Button
>
