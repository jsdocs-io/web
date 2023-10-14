<script lang="ts">
	import IconLinkedServices from '~icons/material-symbols/linked-services';

	export let dependencies: Record<string, string>;

	$: dependenciesNumber = Object.keys(dependencies).length;
</script>

<div
	class="btn btn-ghost btn-sm flex-nowrap justify-start normal-case"
	title="Package production dependencies"
>
	<IconLinkedServices class="h-4 w-4 flex-none" />
	<span class="truncate"
		>{dependenciesNumber} {dependenciesNumber === 1 ? 'dependency' : 'dependencies'}</span
	>
</div>
