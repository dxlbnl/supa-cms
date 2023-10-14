<script>
	import Button from '$lib/components/Button.svelte';
	import { Link } from 'lucide-svelte';
	import { getEditor } from '../EditorContext.svelte';

	const editor = getEditor();
</script>

<Button
	on:click={() => {
		$editor?.chain().focus().extendMarkRange('link').setLink({ href: 'http://google.com' }).run();
	}}
	active={$editor?.isActive('link')}
>
	<Link slot="icon" />
</Button>
