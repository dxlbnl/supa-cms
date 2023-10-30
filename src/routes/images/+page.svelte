<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import type { Image } from '$schema';
	import { css, cx } from 'styled-system/css';
	import { grid, gridItem, wrap } from 'styled-system/patterns';
	import { onMount } from 'svelte';

	const hasFile = (dataTransfer: DataTransfer | null): dataTransfer is DataTransfer =>
		Boolean(dataTransfer?.types.includes('Files'));

	let dropzone: HTMLDivElement;
	let loading: boolean;
	let uploading: boolean;
	let images: Image[] | null = null;

	const fetchData = async () => {
		loading = true;
		const response = await supabase
			.from('images')
			.select()
			.order('created_at', { ascending: false });
		images = response.data;
		loading = false;
	};

	onMount(async () => {
		fetchData();

		supabase
			.channel('images')
			.on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'images' }, (payload) => {
				fetchData();
			})
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'images' }, (payload) => {
				fetchData();
			})
			.subscribe((status, err) => console.log(status, err));
	});

	const handleDrop = async (e: DragEvent) => {
		delete dropzone.dataset.dragactive;
		delete dropzone.dataset.dragover;

		if (!hasFile(e.dataTransfer)) return;

		uploading = true;

		await Promise.all(
			Array.from(e.dataTransfer.files).map(async (file: File) => {
				console.log('uploading', file);
				await supabase.storage.from('media').upload(`images/${file.name}`, file);
			})
		);
		uploading = false;
		console.log('Uploaded files');
	};

	const hasThumbnail = (img: Image): Boolean =>
		Boolean(img.srcset?.some((src) => Boolean(src.name === 'thumbnail' && src.ready)));
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
			gap: 1
		}),
		css({
			position: 'relative',
			outlineWidth: 2,
			outlineStyle: 'dashed',
			outlineColor: 'transparent',
			'&[data-dragactive]': {
				outlineColor: 'gray.300',
				'&:after': {
					content: '"Drop files here"',
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
					pointerEvents: 'none',
					background: 'orange.100',
					textAlign: 'center',
					lineHeight: '100%'
				},

				'&[data-dragover]': {
					outlineColor: 'gray.600',
					'&:after': {
						background: 'green.200'
					}
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
	{#if loading}
		<p>loading...</p>
	{/if}

	{#if uploading}
		<p>Uploading...</p>
	{/if}

	{#if images}
		{#each images as image}
			{@const filename = image.name.split('/').at(-1)}
			<button
				class={css({
					position: 'relative',
					width: 128,
					height: 128
				})}
			>
				<img
					class={css({
						height: '100%',
						width: '100%',
						objectFit: 'cover',
						objectPosition: 'center'
					})}
					src={hasThumbnail(image)
						? `https://veesqakrutpzcryhdhrx.supabase.co/storage/v1/object/public/media/processed/${image.hash}/thumbnail.webp`
						: ''}
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
	{/if}
</div>
