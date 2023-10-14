<script lang="ts">
	import PackageExternalResourcesBundlephobia from '$lib/components/PackageExternalResourcesBundlephobia.svelte';
	import PackageExternalResourcesRunKit from '$lib/components/PackageExternalResourcesRunKit.svelte';
	import PackageExternalResourcesUnpkg from '$lib/components/PackageExternalResourcesUnpkg.svelte';

	export let name: string;
	export let version: string;
</script>

<PackageExternalResourcesUnpkg {name} {version} />
<PackageExternalResourcesBundlephobia {name} {version} />
<PackageExternalResourcesRunKit {name} />
