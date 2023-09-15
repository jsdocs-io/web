<script lang="ts">
	import SearchResult from '$lib/components/SearchResult.svelte';
	import type { PackageResult } from '$lib/registry/search-packages';

	export let query: string;
	export let packages: PackageResult[];
</script>

<div class="w-full max-w-xl">
	<div class="divider" />
	{#if packages.length > 0}
		{#each packages as pkg}
			<SearchResult {query} {pkg} />
			<div class="divider" />
		{/each}
	{:else}
		<h3 class="block text-2xl font-bold leading-none">No packages found</h3>
		<div class="divider" />
	{/if}
</div>
