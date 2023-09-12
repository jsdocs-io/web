<script lang="ts">
	import KeywordsList from '$lib/components/KeywordsList.svelte';
	import SearchResultTitle from '$lib/components/SearchResultTitle.svelte';
	import type { Package } from '$lib/registry/search-packages';

	export let query: string;
	export let pkg: Package;

	$: ({ name, version, description, keywords } = pkg);
</script>

<div class="flex flex-col gap-2">
	<SearchResultTitle {name} {version} {query} />
	<p>{description}</p>
	<KeywordsList {keywords} />
</div>
