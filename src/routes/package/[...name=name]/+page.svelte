<script lang="ts">
	import DocRoot from '$lib/components/DocRoot.svelte';
	import InfoSidebar from '$lib/components/InfoSidebar.svelte';
	import QuickSearch from '$lib/components/QuickSearch.svelte';
	import TocSidebar from '$lib/components/TocSidebar.svelte';
	import { getPackageInfo } from '$lib/stores/package-info';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ updatedAt, analyzedAt, analysisDuration } = data);

	const packageInfo = getPackageInfo();
	$: $packageInfo = data;
</script>

<div class="flex grow justify-center">
	<div class="flex max-w-screen-4xl grow justify-between gap-4 px-4 py-6">
		<TocSidebar />

		<DocRoot />

		<InfoSidebar {updatedAt} {analyzedAt} {analysisDuration} />
	</div>
</div>

<QuickSearch />
