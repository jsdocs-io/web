<script lang="ts">
	import DocRoot from '$lib/components/DocRoot.svelte';
	import InfoSidebar from '$lib/components/InfoSidebar.svelte';
	import TocSidebar from '$lib/components/TocSidebar.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({
		name,
		version,
		repository,
		homepage,
		publishedAt,
		license,
		dependencies,
		weeklyDownloads,
		unpackedSize,
		updatedAt,
		analyzedAt,
		analysisDuration
	} = data);
</script>

<div class="flex grow justify-center">
	<div class="flex max-w-screen-4xl grow justify-between gap-4 px-4 py-6">
		<TocSidebar />

		<DocRoot />

		<InfoSidebar
			{name}
			{version}
			{repository}
			{homepage}
			{publishedAt}
			{license}
			{dependencies}
			{weeklyDownloads}
			{unpackedSize}
			{updatedAt}
			{analyzedAt}
			{analysisDuration}
		/>
	</div>
</div>
