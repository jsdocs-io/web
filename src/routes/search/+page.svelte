<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import SearchResults from '$lib/components/SearchResults.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ query, packages } = data);
</script>

<div class="flex grow flex-col items-center gap-6 px-4 py-6">
	<SearchBar {query} />
	<SearchResults {query} {packages} />
</div>
