<script lang="ts">
	import { X } from 'lucide-svelte';
	import type { Image } from '$schema';
	import { supabase } from '$lib/supabaseClient';

	export let image: Image;

	$: filename = image.name?.split('/').at(-1);

	const hasThumbnail = (img: Image): Boolean =>
		Boolean(img.srcset?.some((src) => Boolean(src.name === 'thumbnail' && src.ready)));

	let deleting = false;
	const deleteImage = async () => {
		deleting = true;
		const paths = [
			image.name,
			...image.srcset.map(({ name }) => `processed/${image.hash}/${name}.webp`),
			...image.srcset.map(({ name }) => `processed/${image.hash}/${name}.jpeg`)
		];
		await supabase.storage.from('media').remove(paths);
		await supabase.from('images').delete().match({ hash: image.hash });
		deleting = false;
	};

	const getSrc = (image: Image, name: string) =>
		`https://veesqakrutpzcryhdhrx.supabase.co/storage/v1/object/public/media/processed/${image.hash}/${name}.webp`;
	const getSrcSet = (image: Image) =>
		image.srcset
			.filter(({ ready }) => ready)
			.flatMap(({ name, width }) => [
				`https://veesqakrutpzcryhdhrx.supabase.co/storage/v1/object/public/media/processed/${image.hash}/${name}.jpeg ${width}w}`,
				`https://veesqakrutpzcryhdhrx.supabase.co/storage/v1/object/public/media/processed/${image.hash}/${name}.webp ${width}w`
			])
			.join(', ');
</script>

<section class="image">
	<section class="actions">
		<button disabled={deleting} on:click={deleteImage}><X /></button>
	</section>
	<img alt={filename} src={getSrc(image, 'thumbnail')} srcset={getSrcSet(image)} />
	<span>{filename}</span>
</section>

<style>
	.image {
		position: relative;
		width: 128px;
		height: 128px;

		&:hover .actions {
			display: flex;
		}

		img {
			height: 100%;
			width: 100%;
			object-fit: cover;
			object-position: center;
		}

		span {
			position: absolute;
			left: 0;
			bottom: 0;
			width: 100%;
			background: rgba(255, 255, 255, 0.5);
		}
	}

	.actions {
		position: absolute;
		top: 0;
		left: 0;
		display: none;
	}
</style>
