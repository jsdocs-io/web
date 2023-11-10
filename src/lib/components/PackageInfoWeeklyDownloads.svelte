<script lang="ts">
	import { getPackageInfo } from '$lib/stores/package-info';
	import millify from 'millify';
	import IconDownload from '~icons/material-symbols/download';

	const packageInfo = getPackageInfo();
	$: ({ weeklyDownloads } = $packageInfo);
	$: prettyWeeklyDownloads = millify(weeklyDownloads ?? 0);
</script>

{#if weeklyDownloads !== undefined}
	<div
		class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
		title="Package has {weeklyDownloads} weekly downloads"
	>
		<IconDownload class="h-4 w-4 flex-none" />
		<span class="truncate">{prettyWeeklyDownloads} weekly downloads</span>
	</div>
{/if}
