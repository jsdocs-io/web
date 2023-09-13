<script lang="ts">
	import SearchResult from '$lib/components/SearchResult.svelte';
	import type { Package } from '$lib/registry/search-packages';

	export let query: string;
	export let packages: Package[];
</script>

{#if packages.length > 0}
	<div class="w-full max-w-xl">
		<div class="divider" />
		{#each packages as pkg}
			<SearchResult {query} {pkg} />
			<div class="divider" />
		{/each}
	</div>
{:else}
	<p class="text-2xl font-bold">No packages found</p>
{/if}
