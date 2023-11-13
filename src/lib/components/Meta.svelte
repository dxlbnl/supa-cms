<script lang="ts">
	import { page } from '$app/stores';
	import { updatePageMeta } from '$lib/supabaseClient';
	import type { PageMeta } from '$schema';
	import type { Writable } from 'svelte/store';
	import Button from './Button.svelte';

	export let meta: PageMeta = {} as PageMeta;
	export let editable: Writable<boolean>;
</script>

{#if $editable}
	<form
		on:submit={async () => {
			await updatePageMeta({ slug: $page.params.slug || 'index', meta });
			$editable = false;
		}}
	>
		<section>
			<div>
				<label>
					<p>Title:</p>
					<input type="text" bind:value={meta.title} />
				</label>
			</div>
			<div>
				<label>
					<p>Description:</p>
					<textarea bind:value={meta.description} />
				</label>
			</div>
			<div>
				<label>
					<p>Image:</p>
					<input type="text" bind:value={meta.title} />
				</label>
			</div>
		</section>

		<Button>submit</Button>
	</form>
{/if}

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{meta.title}</title>
	<meta name="title" content={meta.title} />
	<meta name="description" content={meta.description} />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://supa-cms.vercel.app/" />
	<meta property="og:title" content={meta.title} />
	<meta property="og:description" content={meta.description} />
	{#if meta.image}
		<meta property="og:image" content={meta.image} />
	{/if}

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://supa-cms.vercel.app/" />
	<meta property="twitter:title" content={meta.title} />
	<meta property="twitter:description" content={meta.description} />
	{#if meta.image}
		<meta property="twitter:image" content={meta.image} />
	{/if}
</svelte:head>
