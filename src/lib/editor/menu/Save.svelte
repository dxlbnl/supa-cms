<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { Save } from 'lucide-svelte';
	import { updatePage } from '$lib/supabaseClient';
	import { page } from '$app/stores';
	import { getEditor } from '../EditorContext.svelte';
	import type { Writable } from 'svelte/store';
	import { css } from 'styled-system/css';

	export let editable: Writable<boolean>;
	const editor = getEditor();
	const handleSave = async () => {
		await updatePage({ slug: $page.params.slug || 'index', content: $editor?.getJSON() || {} });
		$editable = false;
	};
</script>

<Button style={css({ colorPalette: 'green' })} action={handleSave}>
	<Save slot="icon" />
</Button>
