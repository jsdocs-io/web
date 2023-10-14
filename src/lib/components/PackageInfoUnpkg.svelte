<script lang="ts">
	import IconDeployedCode from '~icons/material-symbols/deployed-code';

	export let name: string;
</script>

<a
	href="https://unpkg.com/{name}/"
	class="btn btn-ghost btn-sm flex-nowrap justify-start normal-case"
	title="View package contents on unpkg"
>
	<IconDeployedCode class="h-4 w-4 flex-none" />
	<span class="truncate">Unpkg</span>
</a>
