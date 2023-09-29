<script lang=ts>
  import { onMount } from 'svelte';
  import { createDirectus, rest, readItem } from '@directus/sdk';

  const client = createDirectus('http://0.0.0.0:8055').with(rest());

  onMount(async () => {
    const result = await client.request(readItem('article', '520652fa-dbb2-4de3-a622-b68c00157de1', { fields: ['*', 'blocks.item:block.content' ]}));
    console.log(result);
  });
    
</script>