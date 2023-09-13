<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import SearchResults from '$lib/components/SearchResults.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ query, packages } = data);
</script>

<div class="h-6" />
<div class="flex flex-col items-center gap-6">
	<SearchBar />
	<SearchResults {query} {packages} />
</div>
