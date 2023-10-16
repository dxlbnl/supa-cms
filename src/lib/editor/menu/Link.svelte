<script>
	import Button from '$lib/components/Button.svelte';
	import { Link } from 'lucide-svelte';
	import { getEditor } from '../EditorContext.svelte';
	import CodeBlock from '$lib/blocks/CodeBlock.svelte';

	const editor = getEditor();
</script>

<Button
	on:click={() => {
		if ($editor) {
			$editor?.chain().focus().extendMarkRange('link').run();
			const { from, to } = $editor.state.selection;
			const text = $editor.state.doc.textBetween(from, to);
			const href = /^https?:\/\//.test(text) ? text : '';

			$editor?.chain().focus().toggleLink({ href }).run();
		}
	}}
	active={$editor?.isActive('link')}
>
	<Link slot="icon" />
</Button>
