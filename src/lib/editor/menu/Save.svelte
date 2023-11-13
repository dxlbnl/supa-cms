<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { Save } from 'lucide-svelte';
	import { updatePage } from '$lib/supabaseClient';
	import { page } from '$app/stores';
	import { getEditor } from '../EditorContext.svelte';
	import type { Writable } from 'svelte/store';

	export let editable: Writable<boolean>;
	const editor = getEditor();
	const handleSave = async () => {
		await updatePage({ slug: $page.params.slug || 'index', content: $editor?.getJSON() || {} });
		$editable = false;
	};
</script>

<Button action={handleSave}>
	<Save slot="icon" />
</Button>

<style>
	:root {
		--button-background: var(--green-200);
		--button-hover: var(--green-300);
		--button-outline: var(--green-400);
	}
</style>
