<script lang="ts">
	import { css, cx } from 'styled-system/css';
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

<section
	class={css({
		position: 'relative',
		width: 128,
		height: 128,

		_hover: {
			'& .actions': {
				display: 'flex'
			}
		}
	})}
>
	<section
		class={cx(
			'actions',
			css({
				position: 'absolute',
				top: 0,
				left: 0,
				display: 'none'
			})
		)}
	>
		<button disabled={deleting} on:click={deleteImage}><X /></button>
	</section>
	<img
		class={css({
			height: '100%',
			width: '100%',
			objectFit: 'cover',
			objectPosition: 'center'
		})}
		alt={filename}
		src={getSrc(image, 'thumbnail')}
		srcset={getSrcSet(image, 'thumbnail')}
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
</section>
