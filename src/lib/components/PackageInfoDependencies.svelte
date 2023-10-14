<script lang="ts">
	import IconLinkedServices from '~icons/material-symbols/linked-services';

	export let dependencies: Record<string, string>;

	$: dependenciesNumber = Object.keys(dependencies).length;
	$: dependenciesQuantifier = dependenciesNumber === 1 ? 'dependency' : 'dependencies';
	$: dependenciesDescription = `${dependenciesNumber} ${dependenciesQuantifier}`;
</script>

<div
	class="btn btn-ghost btn-sm flex-nowrap justify-start normal-case"
	title="Number of production dependencies for the package"
>
	<IconLinkedServices class="h-4 w-4 flex-none" />
	<span class="truncate">{dependenciesDescription}</span>
</div>
