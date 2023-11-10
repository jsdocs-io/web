<script lang="ts">
	import { getPackageInfo } from '$lib/stores/package-info';
	import IconLinkedServices from '~icons/material-symbols/linked-services';

	const packageInfo = getPackageInfo();
	$: ({ name, version, dependencies } = $packageInfo);
	$: dependenciesNumber = Object.keys(dependencies).length;
	$: dependenciesQuantifier = dependenciesNumber === 1 ? 'dependency' : 'dependencies';
	$: dependenciesDescription = `${dependenciesNumber} ${dependenciesQuantifier}`;
</script>

<a
	href="https://www.npmjs.com/package/{name}/v/{version}?activeTab=dependencies"
	class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
	title="Package has {dependenciesNumber} production {dependenciesQuantifier}"
>
	<IconLinkedServices class="h-4 w-4 flex-none" />
	<span class="truncate">{dependenciesDescription}</span>
</a>
