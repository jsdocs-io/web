<script lang="ts">
	import { formatDistanceStrict } from 'date-fns';
	import { onMount } from 'svelte';
	import IconCalendarClock from '~icons/material-symbols/calendar-clock';

	export let publishedAt: string;

	let relativePublishedAt = publishedAt;
	onMount(() => {
		relativePublishedAt = formatDistanceStrict(new Date(publishedAt), new Date(), {
			addSuffix: true
		});
	});
</script>

<div
	class="btn btn-ghost btn-sm flex-nowrap justify-start normal-case"
	title="Package publish time"
>
	<IconCalendarClock class="h-4 w-4 flex-none" />
	<time class="truncate" datetime={publishedAt}>{relativePublishedAt}</time>
</div>
