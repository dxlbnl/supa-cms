import {
	ImageMagick,
	IMagickImage,
	initialize,
	MagickFormat
} from 'https://deno.land/x/imagemagick_deno/mod.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

await initialize(); // make sure to initialize first!

const supabase = createClient(
	// Supabase API URL - env var exported by default when deployed.
	Deno.env.get('SUPABASE_URL') ?? '',
	// Supabase API SERVICE ROLE KEY - env var exported by default when deployed.
	Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

type Image = {
	name: string;
	hash: string;
	srcset: {
		width: number;
		name: string;
	}[];
};

const processImage = (image: Image, buffer: Uint8Array) =>
	ImageMagick.read(buffer, async (img: IMagickImage) => {
		console.log('Read image', [img.format, img.label]);
		for (const { width, name } of image.srcset) {
			console.log('Resizing image');
			img.resize(width, img.height);
			console.log(`Resized image ${name}`);

			console.log('Saving image/webp');
			await img.write(MagickFormat.Webp, (data: Uint8Array) =>
				supabase.storage.from('media').upload(`processed/${image.hash}/${name}.webp`, data, {
					contentType: 'image/webp',
					upsert: true
				})
			);
			await supabase.from('image').update({ srcset: image.srcset }).match({ hash: image.hash });

			console.log('Saving image/jpeg');
			await img.write(MagickFormat.Jpeg, (data: Uint8Array) =>
				supabase.storage.from('media').upload(`processed/${image.hash}/${name}.jpeg`, data, {
					contentType: 'image/jpeg',
					upsert: true
				})
			);
			console.log(`Done with ${name} at ${width}x${img.height}`);
		}
	});

Deno.serve(async (req) => {
	const { table, schema, record } = await req.json();

	if (table !== 'image' || schema !== 'public') {
		return new Response('Called with wrong webhook', { status: 400 });
	}

	console.log('processing image', record.hash);

	const img = await supabase.storage.from('media').download(record.name);

	if (!img.data) {
		return new Response('no file found', { status: 400 });
	}
	await processImage(record, new Uint8Array(await img.data.arrayBuffer()));

	return new Response();
});
