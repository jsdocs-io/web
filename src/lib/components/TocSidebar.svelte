<script lang="ts">
	import TocDeclarations from '$lib/components/TocDeclarations.svelte';
	import TocQuickSearch from '$lib/components/TocQuickSearch.svelte';
</script>

<div class="hidden w-1/3 max-w-[18rem] flex-col gap-6 self-start md:flex">
	<TocQuickSearch />
	<TocDeclarations />
</div>
