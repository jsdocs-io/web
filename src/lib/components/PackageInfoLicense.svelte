<script lang="ts">
	import IconAccountBalance from '~icons/material-symbols/account-balance';

	export let license: string | undefined;

	$: licenseDescription = `${license ?? 'Custom'} license`;
</script>

<div class="btn btn-ghost btn-sm flex-nowrap justify-start normal-case" title="Package license">
	<IconAccountBalance class="h-4 w-4 flex-none" />
	<span class="truncate">{licenseDescription}</span>
</div>
