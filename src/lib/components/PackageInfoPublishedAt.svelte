<script lang="ts">
	import { getPackageInfo } from '$lib/stores/package-info';
	import { formatDistanceStrict } from 'date-fns';
	import { onMount } from 'svelte';
	import IconCalendarClock from '~icons/material-symbols/calendar-clock';

	const packageInfo = getPackageInfo();
	$: ({ publishedAt } = $packageInfo);
	$: prettyPublishedAt = publishedAt;

	onMount(() => {
		prettyPublishedAt = formatDistanceStrict(new Date(publishedAt), new Date(), {
			addSuffix: true
		});
	});
</script>

<div
	class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
	title="Package was published on {publishedAt}"
>
	<IconCalendarClock class="h-4 w-4 flex-none" />
	<time class="truncate" datetime={publishedAt}>Published {prettyPublishedAt}</time>
</div>
