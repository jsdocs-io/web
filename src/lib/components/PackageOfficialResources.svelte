<script lang="ts">
	import PackageOfficialResourcesHomepage from '$lib/components/PackageOfficialResourcesHomepage.svelte';
	import PackageOfficialResourcesNpm from '$lib/components/PackageOfficialResourcesNpm.svelte';
	import PackageOfficialResourcesRepository from '$lib/components/PackageOfficialResourcesRepository.svelte';

	export let name: string;
	export let repository: string;
	export let homepage: string;
</script>

<PackageOfficialResourcesNpm {name} />
<PackageOfficialResourcesRepository {repository} />
<PackageOfficialResourcesHomepage {homepage} />
