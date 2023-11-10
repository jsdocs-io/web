<script lang="ts">
	import { getPackageInfo } from '$lib/stores/package-info';
	import IconSell from '~icons/material-symbols/sell';

	const packageInfo = getPackageInfo();
	$: ({ name, version } = $packageInfo);
</script>

<a
	href="https://www.npmjs.com/package/{name}/v/{version}"
	class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
	title="Package version"
>
	<IconSell class="h-4 w-4 flex-none" />
	<span class="truncate">Version {version}</span>
</a>
