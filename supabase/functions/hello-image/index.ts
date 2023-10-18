import {
	ImageMagick,
	IMagickImage,
	initialize,
	MagickFormat
} from 'https://deno.land/x/imagemagick_deno/mod.ts';
import { encodeHex } from 'https://deno.land/std@0.202.0/encoding/hex.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

await initialize(); // make sure to initialize first!

// const data: Uint8Array = await Deno.readFile("image.jpg");

const processImage = (data: Uint8Array, format = MagickFormat.Webp) => {
	return new Promise<Uint8Array>((resolve) => {
		ImageMagick.read(data, (img: IMagickImage) => {
			img.resize(800, 600);

			img.write(format, (data: Uint8Array) => {
				resolve(data);
			});
		});
	});
};

Deno.serve({}, async (req) => {
	console.log('Echo image');
	const data = await req.arrayBuffer();

	const hashBuffer = await crypto.subtle.digest('SHA-256', data);
	const hash = encodeHex(hashBuffer);
	console.log('Got image with hash: ', hash);

	const cachedImage = await fetch(
		`https://veesqakrutpzcryhdhrx.supabase.co/storage/v1/object/public/image/${hash}.webp`
	);

	if (cachedImage.ok) return cachedImage;

	const supabase = createClient(
		// Supabase API URL - env var exported by default when deployed.
		Deno.env.get('SUPABASE_URL') ?? '',
		// Supabase API SERVICE ROLE KEY - env var exported by default when deployed.
		Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
	);

	const response = await processImage(new Uint8Array(data), MagickFormat.Webp);
	const { error } = await supabase.storage.from('image').upload(`${hash}.webp`, response, {
		contentType: 'image/webp'
	});
	if (error) {
		console.error(error);

		return new Response(error.message, { status: 400 });
	}
	{
		const response = await processImage(new Uint8Array(data), MagickFormat.Jpeg);
		const { error } = await supabase.storage.from('image').upload(`${hash}.jpeg`, response, {
			contentType: 'image/jpeg'
		});
		if (error) {
			console.error(error);

			return new Response(error.message, { status: 400 });
		}
	}

	console.log('Uploaded image to Supabase Storage');

	return new Response(response, { headers: { 'Content-Type': 'image/webp' } });
});
// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
