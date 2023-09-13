<script lang="ts">
	import Pill from '$lib/components/Pill.svelte';

	export let name: string;
	export let version: string;
	export let query: string;
</script>

<div class="flex flex-wrap items-center gap-4">
	<a class="link-hover link block leading-none" href="/package/{name}">
		<h3 class="block text-2xl font-bold leading-none">{name}</h3>
	</a>
	<Pill>{version}</Pill>
	{#if name === query}
		<Pill>Exact match</Pill>
	{/if}
</div>
