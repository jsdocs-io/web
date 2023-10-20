<script lang="ts">
	import PackageInfoDependencies from '$lib/components/PackageInfoDependencies.svelte';
	import PackageInfoLicense from '$lib/components/PackageInfoLicense.svelte';
	import PackageInfoPublishedAt from '$lib/components/PackageInfoPublishedAt.svelte';
	import PackageInfoUnpackedSize from '$lib/components/PackageInfoUnpackedSize.svelte';
	import PackageInfoVersion from '$lib/components/PackageInfoVersion.svelte';
	import PackageInfoWeeklyDownloads from '$lib/components/PackageInfoWeeklyDownloads.svelte';

	export let name: string;
	export let version: string;
	export let publishedAt: string;
	export let license: string | undefined;
	export let dependencies: Record<string, string>;
	export let weeklyDownloads: number | undefined;
	export let unpackedSize: number;
</script>

<PackageInfoVersion {name} {version} />
<PackageInfoPublishedAt {publishedAt} />
<PackageInfoLicense {license} />
<PackageInfoDependencies {name} {version} {dependencies} />
{#if weeklyDownloads}
	<PackageInfoWeeklyDownloads {weeklyDownloads} />
{/if}
<PackageInfoUnpackedSize {unpackedSize} />
