<script lang="ts">
	import IconSell from '~icons/material-symbols/sell';

	export let name: string;
	export let version: string;
</script>

<a
	href="https://www.npmjs.com/package/{name}/v/{version}"
	class="btn btn-ghost btn-sm flex-nowrap justify-start normal-case leading-normal"
	title="Package version"
>
	<IconSell class="h-4 w-4 flex-none" />
	<span class="truncate">Version {version}</span>
</a>
