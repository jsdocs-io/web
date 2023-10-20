<script lang="ts">
	import { formatDistanceStrict } from 'date-fns';
	import { onMount } from 'svelte';
	import IconUpdate from '~icons/material-symbols/update';

	export let updatedAt: string;

	let prettyUpdatedAt = updatedAt;
	onMount(() => {
		prettyUpdatedAt = formatDistanceStrict(new Date(updatedAt), new Date(), {
			addSuffix: true
		});
	});
</script>

<div
	class="btn btn-ghost btn-sm flex-nowrap justify-start normal-case"
	title="Page was rendered on {updatedAt}"
>
	<IconUpdate class="h-4 w-4 flex-none" />
	<time class="truncate" datetime={updatedAt}>Updated {prettyUpdatedAt}</time>
</div>
