<script lang="ts">
	import { getPackageInfo, setPackageInfo } from '$lib/stores/package-info';
	import { getPageInfo, setPageInfo } from '$lib/stores/page-info';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	setPackageInfo();
	setPageInfo();

	const packageInfo = getPackageInfo();
	const pageInfo = getPageInfo();
	$: $packageInfo = data;
	$: $pageInfo = data;
</script>

<slot />
