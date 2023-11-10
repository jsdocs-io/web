<script lang="ts">
	import { getPackageInfo } from '$lib/stores/package-info';
	import IconDeployedCode from '~icons/material-symbols/deployed-code';

	const packageInfo = getPackageInfo();
	$: ({ name, version } = $packageInfo);
</script>

<a
	href="https://unpkg.com/browse/{name}@{version}/"
	class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
	title="View package contents on unpkg"
>
	<IconDeployedCode class="h-4 w-4 flex-none" />
	<span class="truncate">Unpkg</span>
</a>
