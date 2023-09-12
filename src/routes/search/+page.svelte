<script lang="ts">
	import SearchBar from '$lib/components/SearchBar.svelte';
	import SearchResults from '$lib/components/SearchResults.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ query, packages } = data);
</script>

<SearchBar />
<SearchResults {query} {packages} />
