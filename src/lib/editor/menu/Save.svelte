<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { css } from 'styled-system/css';
	import { CircleDotDashed, Save } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';
	import type { Editor } from '@tiptap/core';
	import { updatePage } from '$lib/supabaseClient';
	import { page } from '$app/stores';

	const editor = getContext<Writable<Editor>>('editor');
	let saving = false;
	const handleSave = async () => {
		saving = true;
		await updatePage({ slug: $page.params.slug || 'index', content: $editor.getJSON() });
		saving = false;
	};
</script>

<Button disabled={saving} class={css({ colorPalette: 'green', ml: 8 })} on:click={handleSave}>
	{#if saving}
		<CircleDotDashed
			class={css({
				animation: 'rotate 2s infinite'
			})}
		/>
	{:else}
		<Save />
	{/if}
</Button>
