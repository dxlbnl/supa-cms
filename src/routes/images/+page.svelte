<script lang="ts">
	import { supabase } from '$lib/supabaseClient';
</script>

{#await supabase.storage
	.from('media')
	.list('images', { limit: 100, offset: 0, sortBy: { column: 'name', order: 'asc' } })}
	<p>loading...</p>
{:then { data }}
	<pre>{JSON.stringify(data, null, 2)}</pre>
{/await}
