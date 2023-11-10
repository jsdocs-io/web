<script lang="ts">
	import { getPackageInfo } from '$lib/stores/package-info';
	import IconWeight from '~icons/material-symbols/weight';

	const packageInfo = getPackageInfo();
	$: ({ name, version } = $packageInfo);
</script>

<a
	href="https://bundlephobia.com/package/{name}@{version}"
	class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
	title="View bundle size on Bundlephobia"
>
	<IconWeight class="h-4 w-4 flex-none" />
	<span class="truncate">Bundlephobia</span>
</a>
