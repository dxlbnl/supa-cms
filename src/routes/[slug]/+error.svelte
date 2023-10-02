<script lang="ts">
	import { page } from '$app/stores';
</script>

<h1>{$page.status}</h1>
<p>{$page.error.message}</p>

<form method="POST" action="?/create">
	<button>Create a page</button>
</form>
