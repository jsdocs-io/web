<script lang="ts">
	import PackageInfoBundlephobia from '$lib/components/PackageInfoBundlephobia.svelte';
	import PackageInfoDependencies from '$lib/components/PackageInfoDependencies.svelte';
	import PackageInfoHomepage from '$lib/components/PackageInfoHomepage.svelte';
	import PackageInfoLicense from '$lib/components/PackageInfoLicense.svelte';
	import PackageInfoNpm from '$lib/components/PackageInfoNpm.svelte';
	import PackageInfoPublishedAt from '$lib/components/PackageInfoPublishedAt.svelte';
	import PackageInfoRepository from '$lib/components/PackageInfoRepository.svelte';
	import PackageInfoRunKit from '$lib/components/PackageInfoRunKit.svelte';
	import PackageInfoUnpackedSize from '$lib/components/PackageInfoUnpackedSize.svelte';
	import PackageInfoUnpkg from '$lib/components/PackageInfoUnpkg.svelte';
	import PackageInfoVersion from '$lib/components/PackageInfoVersion.svelte';
	import PackageInfoWeeklyDownloads from '$lib/components/PackageInfoWeeklyDownloads.svelte';
	import SystemInfoAnalysisInfo from '$lib/components/SystemInfoAnalysisInfo.svelte';
	import SystemInfoBugReport from '$lib/components/SystemInfoBugReport.svelte';
	import SystemInfoUpdatedAt from '$lib/components/SystemInfoUpdatedAt.svelte';

	export let analyzedAt: string | undefined = undefined;
	export let analysisDuration: number | undefined = undefined;
</script>

<div class="hidden w-72 flex-col gap-2 self-start xl:flex">
	<div class="divider my-1">Official Resources</div>
	<PackageInfoNpm />
	<PackageInfoRepository />
	<PackageInfoHomepage />

	<div class="divider my-1">Package Info</div>
	<PackageInfoVersion />
	<PackageInfoPublishedAt />
	<PackageInfoLicense />
	<PackageInfoDependencies />
	<PackageInfoWeeklyDownloads />
	<PackageInfoUnpackedSize />

	<div class="divider my-1">External Resources</div>
	<PackageInfoUnpkg />
	<PackageInfoBundlephobia />
	<PackageInfoRunKit />

	<div class="divider my-1">System Info</div>
	<SystemInfoUpdatedAt />
	{#if analyzedAt && analysisDuration}
		<SystemInfoAnalysisInfo {analyzedAt} {analysisDuration} />
	{/if}
	<SystemInfoBugReport />
</div>
