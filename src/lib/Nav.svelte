<script lang="ts">
	type Menu = {
		label: string;
		page: {
			slug: string;
		} | null;
		entries: Menu[];
	};

	export let menu: Menu;
</script>

<nav>
	<ul>
		{#each menu.entries as entry}
			<li>
				{#if entry.page}
					<a href="/{entry.page.slug}">{entry.label}</a>
				{:else}
					{entry.label}
				{/if}

				{#if entry.entries}
					<svelte:self menu={entry} />
				{/if}
			</li>
		{/each}
	</ul>
</nav>
