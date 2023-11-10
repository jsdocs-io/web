<script lang="ts">
	import { getPackageInfo } from '$lib/stores/package-info';
	import IconNpm from '~icons/simple-icons/npm';

	const packageInfo = getPackageInfo();
	$: ({ name } = $packageInfo);
</script>

<a
	href="https://www.npmjs.com/package/{name}"
	class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
	title="View package on npm"
>
	<IconNpm class="h-4 w-4 flex-none" />
	<span class="truncate">{name}</span>
</a>
