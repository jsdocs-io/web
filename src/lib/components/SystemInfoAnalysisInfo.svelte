<script lang="ts">
	import { formatDistanceStrict } from 'date-fns';
	import millify from 'millify';
	import { onMount } from 'svelte';
	import IconBolt from '~icons/material-symbols/bolt';

	export let analyzedAt: string;
	export let analysisDuration: number;

	let prettyAnalyzedAt = analyzedAt;
	onMount(() => {
		prettyAnalyzedAt = formatDistanceStrict(new Date(analyzedAt), new Date(), {
			addSuffix: true
		});
	});

	$: prettyDuration = millify(analysisDuration, {
		units: ['ms', 's']
	});
</script>

<div
	class="btn btn-ghost btn-sm flex-nowrap justify-start normal-case leading-normal"
	title="Package was analyzed on {analyzedAt} in {analysisDuration}ms"
>
	<IconBolt class="h-4 w-4 flex-none" />
	<span class="truncate"
		>Analyzed <time class="truncate" datetime={analyzedAt}>{prettyAnalyzedAt}</time> in {prettyDuration}</span
	>
</div>
