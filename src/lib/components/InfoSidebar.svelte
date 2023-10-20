<script lang="ts">
	import PackageExternalResources from '$lib/components/PackageExternalResources.svelte';
	import PackageInfo from '$lib/components/PackageInfo.svelte';
	import PackageOfficialResources from '$lib/components/PackageOfficialResources.svelte';
	import SystemInfo from '$lib/components/SystemInfo.svelte';

	export let name: string;
	export let version: string;

	export let repository: string | undefined;
	export let homepage: string | undefined;

	export let publishedAt: string;
	export let license: string | undefined;
	export let dependencies: Record<string, string>;
	export let weeklyDownloads: number | undefined;
	export let unpackedSize: number | undefined;

	export let updatedAt: string;
	export let analyzedAt: string | undefined = undefined;
	export let analysisDuration: number | undefined = undefined;
</script>

<div class="flex w-96 flex-col gap-2">
	<div class="divider my-1">Official Resources</div>
	<PackageOfficialResources {name} {repository} {homepage} />

	<div class="divider my-1">Package Info</div>
	<PackageInfo
		{name}
		{version}
		{publishedAt}
		{license}
		{dependencies}
		{weeklyDownloads}
		{unpackedSize}
	/>

	<div class="divider my-1">External Resources</div>
	<PackageExternalResources {name} {version} />

	<div class="divider my-1">System Info</div>
	<SystemInfo {name} {version} {updatedAt} {analyzedAt} {analysisDuration} />
</div>
