<script lang="ts">
	import { urlCanParse } from '$lib/utils/url-can-parse';
	import IconGit from '~icons/simple-icons/git';
	import IconGitHub from '~icons/simple-icons/github';
	import IconGitLab from '~icons/simple-icons/gitlab';

	export let repository: string;

	const providerNames: Record<string, string> = {
		'github.com': 'GitHub',
		'gitlab.com': 'GitLab'
	};

	$: url = urlCanParse(repository) ? new URL(repository) : undefined;
</script>

{#if url}
	<a
		href={url.href}
		class="btn btn-ghost btn-sm flex-nowrap justify-start normal-case"
		title="View repository on {providerNames[url.hostname] ?? url.hostname}"
	>
		{#if url.hostname === 'github.com'}
			<IconGitHub class="h-4 w-4 flex-none" />
		{:else if url.hostname === 'gitlab.com'}
			<IconGitLab class="h-4 w-4 flex-none" />
		{:else}
			<IconGit class="h-4 w-4 flex-none" />
		{/if}
		<span class="truncate">{url.pathname.replace('/', '')}</span>
	</a>
{/if}
