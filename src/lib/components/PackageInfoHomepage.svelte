<script lang="ts">
	import { getPackageInfo } from '$lib/stores/package-info';
	import { urlCanParse } from '$lib/utils/url-can-parse';
	import IconExplore from '~icons/material-symbols/explore';

	const packageInfo = getPackageInfo();
	$: ({ homepage } = $packageInfo);
	$: url = homepage && urlCanParse(homepage) ? new URL(homepage) : undefined;
	$: prettyHomepage =
		url?.href.replace('https://', '').replace('http://', '').replace(/\/$/, '') ?? '';
</script>

{#if url}
	<a
		href={url.href}
		class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
		title="View package homepage"
	>
		<IconExplore class="h-4 w-4 flex-none" />
		<span class="truncate">{prettyHomepage}</span>
	</a>
{/if}
