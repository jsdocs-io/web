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
