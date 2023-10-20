<script lang="ts">
	import millify from 'millify';
	import IconHardDrive from '~icons/material-symbols/hard-drive';

	export let unpackedSize: number;

	$: prettySize = millify(unpackedSize, {
		units: ['B', 'kB', 'MB', 'GB', 'TB'],
		space: true
	});
</script>

<div
	class="btn btn-ghost btn-sm flex-nowrap justify-start normal-case"
	title="Package occupies {unpackedSize} bytes on disk"
>
	<IconHardDrive class="h-4 w-4 flex-none" />
	<span class="truncate">{prettySize} unpacked size</span>
</div>
