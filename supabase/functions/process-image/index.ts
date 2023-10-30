import {
	ImageMagick,
	IMagickImage,
	initialize,
	MagickFormat
} from 'https://deno.land/x/imagemagick_deno/mod.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Response } from "https://esm.sh/v133/@supabase/node-fetch@2.6.14/denonext/node-fetch.mjs";

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

const processImage = async (image: Image, buffer: Uint8Array) => {

  const { data: folder} = await supabase.storage.from('media').list(`processed/${image.hash}`, {
    limit: 100,
    offset: 0,
    sortBy: { column: 'name', order: 'asc' },
  })

  const toProcess = image.srcset.filter(({ name }) => !folder?.find(({ name: n }) => n === `${name}.webp`))

  if (!toProcess.length) {
    console.log('No images to process');
    return
  }

  console.log('Processing images', toProcess, folder)

	ImageMagick.read(buffer, async (img: IMagickImage) => {
		console.log('Read image', [img.format, img.label]);
		for (const src of toProcess) {
			console.log('Resizing image');
			img.resize(src.width, img.height);
			console.log(`Resized image ${src.name}`);

			console.log('Saving image/webp');
			await img.write(MagickFormat.Webp, (data: Uint8Array) =>
				supabase.storage.from('media').upload(`processed/${image.hash}/${src.name}.webp`, data, {
					contentType: 'image/webp',
					upsert: true
				})
			);
			await supabase.from('images').update({ srcset: image.srcset }).match({ hash: image.hash });

			console.log('Saving image/jpeg');
			await img.write(MagickFormat.Jpeg, (data: Uint8Array) =>
				supabase.storage.from('media').upload(`processed/${image.hash}/${src.name}.jpeg`, data, {
					contentType: 'image/jpeg',
					upsert: true
				})
			);
			console.log(`Done with ${src.name} at ${src.width}x${img.height}`);
      src.ready = true
		}
    await supabase.from('images').update({ srcset: image.srcset }).match({ hash: image.hash });
	});

}

Deno.serve(async (req) => {
	const { table, schema, record } = await req.json();

	if (table !== 'images' || schema !== 'public') {
		return new Response('Called with wrong webhook', { status: 400 });
	}

  if (!record.name.startsWith('images/')) {
    return new Response('Not processing', { status: 400 });
  }

	console.log('processing image', record.hash);

	const img = await supabase.storage.from('media').download(record.name);
	if (!img.data) {
		return new Response('no file found', { status: 400 });
	}
	await processImage(record, new Uint8Array(await img.data.arrayBuffer()));

	return new Response();
});
