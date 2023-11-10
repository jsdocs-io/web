<script lang="ts">
	import { getPackageApi } from '$lib/stores/package-api';
	import { formatDistanceStrict } from 'date-fns';
	import millify from 'millify';
	import { onMount } from 'svelte';
	import IconBolt from '~icons/material-symbols/bolt';

	const packageApi = getPackageApi();
	$: ({ analysisDuration, analyzedAt } = $packageApi);
	$: prettyAnalyzedAt = analyzedAt;
	$: prettyAnalysisDuration = millify(analysisDuration, { units: ['ms', 's'] });

	onMount(() => {
		prettyAnalyzedAt = formatDistanceStrict(new Date(analyzedAt), new Date(), {
			addSuffix: true
		});
	});
</script>

<div
	class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
	title="Package was analyzed on {analyzedAt} in {analysisDuration}ms"
>
	<IconBolt class="h-4 w-4 flex-none" />
	<span class="truncate"
		>Analyzed <time class="truncate" datetime={analyzedAt}>{prettyAnalyzedAt}</time> in {prettyAnalysisDuration}</span
	>
</div>
