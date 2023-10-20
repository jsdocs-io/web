<script lang="ts">
	import PackageOfficialResourcesHomepage from '$lib/components/PackageOfficialResourcesHomepage.svelte';
	import PackageOfficialResourcesNpm from '$lib/components/PackageOfficialResourcesNpm.svelte';
	import PackageOfficialResourcesRepository from '$lib/components/PackageOfficialResourcesRepository.svelte';

	export let name: string;
	export let repository: string | undefined;
	export let homepage: string | undefined;
</script>

<PackageOfficialResourcesNpm {name} />
{#if repository}
	<PackageOfficialResourcesRepository {repository} />
{/if}
{#if homepage}
	<PackageOfficialResourcesHomepage {homepage} />
{/if}
