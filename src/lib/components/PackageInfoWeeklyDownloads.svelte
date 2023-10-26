<script lang="ts">
	import millify from 'millify';
	import IconDownload from '~icons/material-symbols/download';

	export let weeklyDownloads: number;
</script>

<div
	class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
	title="Package has {weeklyDownloads} weekly downloads"
>
	<IconDownload class="h-4 w-4 flex-none" />
	<span class="truncate">{millify(weeklyDownloads)} weekly downloads</span>
</div>
