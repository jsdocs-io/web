<script lang="ts">
	import millify from 'millify';
	import IconBolt from '~icons/material-symbols/bolt';

	export let analysisDuration: number;

	$: prettyDuration = millify(analysisDuration, {
		units: ['ms', 's']
	});
</script>

<div
	class="btn btn-ghost btn-sm flex-nowrap justify-start normal-case"
	title="Time it took to analyze the package: {analysisDuration}ms"
>
	<IconBolt class="h-4 w-4 flex-none" />
	<span class="truncate">Analyzed in {prettyDuration}</span>
</div>
