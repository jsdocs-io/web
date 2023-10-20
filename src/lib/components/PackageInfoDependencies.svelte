<script lang="ts">
	import IconLinkedServices from '~icons/material-symbols/linked-services';

	export let name: string;
	export let version: string;
	export let dependencies: Record<string, string>;

	$: dependenciesNumber = Object.keys(dependencies).length;
	$: dependenciesQuantifier = dependenciesNumber === 1 ? 'dependency' : 'dependencies';
	$: dependenciesDescription = `${dependenciesNumber} ${dependenciesQuantifier}`;
</script>

<a
	href="https://www.npmjs.com/package/{name}/v/{version}?activeTab=dependencies"
	class="btn btn-ghost btn-sm flex-nowrap justify-start normal-case"
	title="Package has {dependenciesNumber} production {dependenciesQuantifier}"
>
	<IconLinkedServices class="h-4 w-4 flex-none" />
	<span class="truncate">{dependenciesDescription}</span>
</a>
