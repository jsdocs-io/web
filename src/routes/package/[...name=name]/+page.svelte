<script lang="ts">
	import InfoSidebar from '$lib/components/InfoSidebar.svelte';
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
		<div class="sticky top-6 hidden h-[50px] w-72 bg-yellow-900 md:block">Table of Contents</div>

		<div class="h-[5000px] grow bg-red-900" />

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
