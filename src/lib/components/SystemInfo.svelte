<script lang="ts">
	import SystemInfoAnalysisInfo from '$lib/components/SystemInfoAnalysisInfo.svelte';
	import SystemInfoBugReport from '$lib/components/SystemInfoBugReport.svelte';
	import SystemInfoUpdatedAt from '$lib/components/SystemInfoUpdatedAt.svelte';

	export let name: string;
	export let version: string;
	export let updatedAt: string;
	export let analyzedAt: string | undefined;
	export let analysisDuration: number | undefined;
</script>

<SystemInfoUpdatedAt {updatedAt} />
{#if analyzedAt && analysisDuration}
	<SystemInfoAnalysisInfo {analyzedAt} {analysisDuration} />
{/if}
<SystemInfoBugReport {name} {version} />
