<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
	import type { Image as TImage } from '$schema';
	import { onMount } from 'svelte';

	import Image from './Image.svelte';

	const hasFile = (dataTransfer: DataTransfer | null): dataTransfer is DataTransfer =>
		Boolean(dataTransfer?.types.includes('Files'));

	let dropzone: HTMLDivElement;
	let loading: boolean;
	let uploading: boolean;
	let images: TImage[] | null = null;

	let dragActive = false;
	let dragOver = false;

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
				console.log('update', payload);
				fetchData();
			})
			.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'images' }, (payload) => {
				console.log('insert', payload);
				fetchData();
			})
			.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'images' }, (payload) => {
				console.log('delete', payload);
				fetchData();
			})
			.subscribe((status, err) => console.log(status, err));
	});

	const handleDrop = async (e: DragEvent) => {
		dragActive = false;
		dragOver = false;

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
</script>

<svelte:document
	on:drop|preventDefault|stopPropagation={() => {
		dragActive = false;
		dragOver = false;
	}}
	on:dragover|preventDefault|stopPropagation={(e) => {
		if (!hasFile(e.dataTransfer)) return;
		dragActive = true;
	}}
	on:dragleave|preventDefault|stopPropagation={() => {
		dragActive = false;
	}}
/>

<div
	class="gallery"
	class:dragOver
	class:dragActive
	bind:this={dropzone}
	role="input"
	on:drop|preventDefault|stopPropagation={handleDrop}
	on:dragover|preventDefault|stopPropagation={(e) => {
		if (!hasFile(e.dataTransfer)) return;

		dragOver = true;
		dragActive = true;
	}}
	on:dragleave={() => {
		dragOver = false;
	}}
>
	<div>
		{#if loading}
			<p>loading...</p>
		{/if}

		{#if uploading}
			<p>Uploading...</p>
		{/if}
	</div>
	{#if images}
		{#each images as image}
			<Image {image} />
		{:else}
			<p>Drag images here to upload</p>
		{/each}
	{/if}
</div>

<style>
	.gallery {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(128px, 1fr));
		grid-template-rows: repeat(auto-fill, minmax(128px, 1fr));
		gap: 1;

		position: relative;
		outline-width: 2px;
		outline-style: dashed;
		outline-color: transparent;

		& > div {
			grid-column: 1 / -1;
		}

		&.dragActive {
			outline-color: var(--gray-300);

			&:after {
				content: 'Drop files here';
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				pointer-events: none;
				background: var(--orange-300);
				text-align: center;
				line-height: 100%;
			}

			&.dragOver {
				outline-color: var(--gray-600);

				&:after {
					background: var(--green-200);
				}
			}
		}
	}
</style>
