<script lang="ts">
	import { onMount } from 'svelte';

	export let name: string | null = null;
	export let value: any = undefined;

	let element: HTMLDivElement;
	let editor: EditorJS;

	onMount(async () => {
		const EditorJS = await import('@editorjs/editorjs');
		const Header = await import('@editorjs/header');
		const Quote = await import('@editorjs/quote');
		const NestedList = await import('@editorjs/nested-list');

		editor = new EditorJS.default({
			data: value,
			holder: element,
			placeholder: 'Let`s write an awesome story!',
			tools: {
				header: Header.default,
				quote: Quote.default,
				list: NestedList.default
			},

			onChange: async (api, event) => {
				value = await api.saver.save();
			}
		});
	});
</script>

<div bind:this={element} class="editor" />

{#if name}
	<input type="hidden" {name} value={JSON.stringify(value)} />
{/if}
