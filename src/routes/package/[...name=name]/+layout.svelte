<script lang="ts">
	import PackageInfo from '$lib/components/PackageInfo.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	$: ({ packageInfo } = data);
</script>

<PackageInfo {packageInfo} />

<slot />
