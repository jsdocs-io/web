<script lang="ts">
	import PackageInfoBundlephobia from '$lib/components/PackageInfoBundlephobia.svelte';
	import PackageInfoDependencies from '$lib/components/PackageInfoDependencies.svelte';
	import PackageInfoLicense from '$lib/components/PackageInfoLicense.svelte';
	import PackageInfoNpm from '$lib/components/PackageInfoNpm.svelte';
	import PackageInfoPublishedAt from '$lib/components/PackageInfoPublishedAt.svelte';
	import PackageInfoRepository from '$lib/components/PackageInfoRepository.svelte';
	import PackageInfoRunKit from '$lib/components/PackageInfoRunKit.svelte';
	import PackageInfoUnpackedSize from '$lib/components/PackageInfoUnpackedSize.svelte';
	import PackageInfoUnpkg from '$lib/components/PackageInfoUnpkg.svelte';
	import PackageInfoVersion from '$lib/components/PackageInfoVersion.svelte';
	import PackageInfoWeeklyDownloads from '$lib/components/PackageInfoWeeklyDownloads.svelte';
	import type { PackageInfo } from '$lib/registry/fetch-package-info';

	export let packageInfo: PackageInfo;

	$: ({
		name,
		version,
		repository,
		dependencies,
		publishedAt,
		license,
		weeklyDownloads,
		unpackedSize
	} = packageInfo);
</script>

<div class="flex w-1/2 flex-col gap-2">
	<div class="divider my-0">External Services</div>

	<PackageInfoNpm {name} />
	<PackageInfoRepository {repository} />
	<PackageInfoRunKit {name} />
	<PackageInfoUnpkg {name} />
	<PackageInfoBundlephobia {name} />

	<div class="divider my-0">Package Info</div>

	<PackageInfoVersion {version} />
	<PackageInfoDependencies {dependencies} />
	<PackageInfoPublishedAt {publishedAt} />
	<PackageInfoLicense {license} />
	<PackageInfoWeeklyDownloads {weeklyDownloads} />
	<PackageInfoUnpackedSize {unpackedSize} />
</div>
