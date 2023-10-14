<script lang="ts">
	import { urlCanParse } from '$lib/utils/url-can-parse';
	import IconExplore from '~icons/material-symbols/explore';

	export let homepage: string;

	$: url = urlCanParse(homepage) ? new URL(homepage) : undefined;
	$: prettyHomepage = url?.href.replace('https://', '').replace('http://', '') ?? '';
</script>

{#if url}
	<a
		href={homepage}
		class="btn btn-ghost btn-sm flex-nowrap justify-start normal-case"
		title="View package homepage"
	>
		<IconExplore class="h-4 w-4 flex-none" />
		<span class="truncate">{prettyHomepage}</span>
	</a>
{/if}
