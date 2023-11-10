<script lang="ts">
	import DocRoot from '$lib/components/DocRoot.svelte';
	import InfoSidebar from '$lib/components/InfoSidebar.svelte';
	import QuickSearch from '$lib/components/QuickSearch.svelte';
	import TocSidebar from '$lib/components/TocSidebar.svelte';
	import { getPackageApi, setPackageApi } from '$lib/stores/package-api';
	import { getPackageInfo } from '$lib/stores/package-info';
	import { getPageInfo } from '$lib/stores/page-info';
	import { setQuickSearchStores } from '$lib/stores/quick-search';
	import type { PageData } from './$types';

	export let data: PageData;

	setPackageApi();
	setQuickSearchStores();

	const packageApi = getPackageApi();
	const packageInfo = getPackageInfo();
	const pageInfo = getPageInfo();
	$: $packageApi = data;
	$: $packageInfo = data;
	$: $pageInfo = data;
</script>

<div class="flex grow justify-center">
	<div class="flex max-w-screen-4xl grow justify-between gap-4 px-4 py-6">
		<TocSidebar />
		<DocRoot />
		<InfoSidebar />
	</div>
</div>

<QuickSearch />
