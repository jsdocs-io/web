<script lang="ts">
	import PackageInfoDependencies from '$lib/components/PackageInfoDependencies.svelte';
	import PackageInfoLicense from '$lib/components/PackageInfoLicense.svelte';
	import PackageInfoPublishedAt from '$lib/components/PackageInfoPublishedAt.svelte';
	import PackageInfoUnpackedSize from '$lib/components/PackageInfoUnpackedSize.svelte';
	import PackageInfoVersion from '$lib/components/PackageInfoVersion.svelte';
	import PackageInfoWeeklyDownloads from '$lib/components/PackageInfoWeeklyDownloads.svelte';

	export let version: string;
	export let dependencies: Record<string, string>;
	export let publishedAt: string;
	export let license: string;
	export let weeklyDownloads: number;
	export let unpackedSize: number;
</script>

<PackageInfoVersion {version} />
<PackageInfoPublishedAt {publishedAt} />
<PackageInfoLicense {license} />
<PackageInfoDependencies {dependencies} />
<PackageInfoWeeklyDownloads {weeklyDownloads} />
<PackageInfoUnpackedSize {unpackedSize} />
