<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import { css, cx } from 'styled-system/css';
	import { grid, gridItem, wrap } from 'styled-system/patterns';

	const hasFile = (dataTransfer: DataTransfer | null): dataTransfer is DataTransfer =>
		Boolean(dataTransfer?.types.includes('Files'));

	let dropzone: HTMLDivElement;

	const handleDrop = async (e: DragEvent) => {
		delete dropzone.dataset.dragactive;
		delete dropzone.dataset.dragover;

		if (!hasFile(e.dataTransfer)) return;

		await Promise.all(
			Array.from(e.dataTransfer.files).map((file: File) => {
				console.log('uploading', file);
				return supabase.storage.from('media').upload(`images/${file.name}`, file);
			})
		);
		console.log('Uploaded files');
	};
</script>

<svelte:document
	on:drop|preventDefault|stopPropagation={() => {
		delete dropzone.dataset.dragactive;
		delete dropzone.dataset.dragover;
	}}
	on:dragover|preventDefault|stopPropagation={(e) => {
		if (!hasFile(e.dataTransfer)) return;
		dropzone.dataset.dragactive = 'true';
	}}
	on:dragleave|preventDefault|stopPropagation={() => {
		delete dropzone.dataset.dragactive;
	}}
/>

<div
	bind:this={dropzone}
	role="input"
	class={cx(
		grid({
			gridTemplateColumns: 'repeat(auto-fill, minmax(128px, 1fr))',
			gridTemplateRows: 'repeat(auto-fill, minmax(128px, 1fr))',
			gap: 2
		}),
		css({
			outlineWidth: 2,
			outlineStyle: 'dashed',
			outlineColor: 'transparent',
			'&[data-dragactive]': {
				outlineColor: 'gray.300',

				'&[data-dragover]': {
					outlineColor: 'gray.600'
				}
			}
		})
	)}
	on:drop|preventDefault|stopPropagation={handleDrop}
	on:dragover|preventDefault|stopPropagation={(e) => {
		if (!hasFile(e.dataTransfer)) return;

		dropzone.dataset.dragover = 'true';
		dropzone.dataset.dragactive = 'true';
	}}
	on:dragleave={() => {
		delete dropzone.dataset.dragover;
	}}
>
	{#await supabase.from('image').select()}
		<p>loading...</p>
	{:then { data }}
		{#each data as image}
			{@const filename = image.name.split('/').at(-1)}
			<button
				class={css({
					position: 'relative',
					width: 128,
					height: 128
				})}
			>
				<img
					class="{css({
						width: '100%',
						height: '100%',
						objectFit: 'cover',
						objectPosition: 'center'
					})})}"
					src="https://veesqakrutpzcryhdhrx.supabase.co/storage/v1/object/public/media/processed/{image.hash}/thumbnail.webp"
					alt={filename}
				/>
				<span
					class={css({
						position: 'absolute',
						left: 0,
						bottom: 0,
						width: '100%',
						background: 'rgba(255,255,255,0.5)'
					})}>{filename}</span
				>
			</button>
		{/each}
	{/await}
</div>
