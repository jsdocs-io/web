<script lang="ts">
	import HomepageLogo from '$lib/components/HomepageLogo.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import SearchTip from '$lib/components/SearchTip.svelte';
</script>

<div class="flex grow flex-col items-center justify-center gap-6 p-4">
	<HomepageLogo />
	<SearchBar />
	<SearchTip />
	<div class="h-4" />
</div>
