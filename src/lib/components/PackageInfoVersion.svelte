<script lang="ts">
	import IconSell from '~icons/material-symbols/sell';

	export let version: string;
</script>

<div class="btn btn-ghost btn-sm flex-nowrap justify-start normal-case" title="Package version">
	<IconSell class="h-4 w-4 flex-none" />
	<span class="truncate">Version {version}</span>
</div>
