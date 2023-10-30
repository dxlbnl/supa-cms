import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

type InsertPayload = {
	type: 'INSERT';
	table: string;
	schema: string;
	record: {
		id: string;
		name: string;
		owner: null;
		version: null;
		metadata: null;
		bucket_id: string;
		created_at: string;
		updated_at: string;
		path_tokens: string[];
		last_accessed_at: string;
	};
	old_record: null;
};

const supabase = createClient(
	// Supabase API URL - env var exported by default when deployed.
	Deno.env.get('SUPABASE_URL') ?? '',
	// Supabase API SERVICE ROLE KEY - env var exported by default when deployed.
	Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
);

Deno.serve(async (req) => {
	const { table, schema, record } = (await req.json()) as InsertPayload;

	if (table !== 'objects' || schema !== 'storage') {
		return new Response('Called with wrong webhook', { status: 400 });
	}

	if (!record.name.startsWith('images/')) {
		return new Response('Not processing');
	}

	if (!/\.jpe?g/i.test(record.name)) {
		return new Response('Not processing');
	}

	console.log('Creating image record for ', record.name);

	const { error } = await supabase.from('images').insert({
		hash: record.id,
		name: record.name,
		srcset: [
			{
				width: 320,
				name: 'thumbnail'
			}
		],
		meta: record.metadata
	});

	if (error) {
		console.error(error);
		return new Response(error.message, { status: 400 });
	}

	return new Response(null);
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
