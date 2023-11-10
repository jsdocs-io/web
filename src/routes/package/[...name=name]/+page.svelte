<script lang="ts">
	import DocRoot from '$lib/components/DocRoot.svelte';
	import InfoSidebar from '$lib/components/InfoSidebar.svelte';
	import QuickSearch from '$lib/components/QuickSearch.svelte';
	import TocSidebar from '$lib/components/TocSidebar.svelte';
	import { getPackageInfo } from '$lib/stores/package-info';
	import { getPageInfo } from '$lib/stores/page-info';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ analyzedAt, analysisDuration } = data);

	const packageInfo = getPackageInfo();
	const pageInfo = getPageInfo();
	$: $packageInfo = data;
	$: $pageInfo = data;
</script>

<div class="flex grow justify-center">
	<div class="flex max-w-screen-4xl grow justify-between gap-4 px-4 py-6">
		<TocSidebar />

		<DocRoot />

		<InfoSidebar {analyzedAt} {analysisDuration} />
	</div>
</div>

<QuickSearch />
