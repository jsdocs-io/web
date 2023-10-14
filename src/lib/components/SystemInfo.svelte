<script lang="ts">
	import SystemInfoAnalysisDuration from '$lib/components/SystemInfoAnalysisDuration.svelte';
	import SystemInfoBugReport from '$lib/components/SystemInfoBugReport.svelte';
	import SystemInfoUpdatedAt from '$lib/components/SystemInfoUpdatedAt.svelte';

	export let name: string;
	export let version: string;
	export let updatedAt: string;
	export let analysisDuration: number;
</script>

<SystemInfoUpdatedAt {updatedAt} />
<SystemInfoAnalysisDuration {analysisDuration} />
<SystemInfoBugReport {name} {version} />
