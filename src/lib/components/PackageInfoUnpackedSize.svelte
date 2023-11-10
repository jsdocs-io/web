<script lang="ts">
	import { getPackageInfo } from '$lib/stores/package-info';
	import millify from 'millify';
	import IconHardDrive from '~icons/material-symbols/hard-drive';

	const packageInfo = getPackageInfo();
	$: ({ unpackedSize } = $packageInfo);
	$: prettySize = millify(unpackedSize ?? 0, {
		units: ['B', 'kB', 'MB', 'GB', 'TB'],
		space: true
	});
</script>

{#if unpackedSize !== undefined}
	<div
		class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
		title="Package occupies {unpackedSize} bytes on disk"
	>
		<IconHardDrive class="h-4 w-4 flex-none" />
		<span class="truncate">{prettySize} unpacked size</span>
	</div>
{/if}
