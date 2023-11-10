<script lang="ts">
	import { getPackageInfo } from '$lib/stores/package-info';
	import IconAccountBalance from '~icons/material-symbols/account-balance';

	const packageInfo = getPackageInfo();
	$: ({ license } = $packageInfo);
	$: licenseDescription = `${license ?? 'Custom'} license`;
</script>

<div
	class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
	title="Package license"
>
	<IconAccountBalance class="h-4 w-4 flex-none" />
	<span class="truncate">{licenseDescription}</span>
</div>
