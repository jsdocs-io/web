<script lang="ts">
	import SearchIcon from '$lib/icons/SearchIcon.svelte';

	export let query: string | undefined = undefined;
</script>

<label class="sr-only" for="search-bar">Search npm packages</label>
<form class="join w-full max-w-xl" action="/search">
	<input
		id="search-bar"
		type="search"
		name="q"
		placeholder="Search npm packages"
		bind:value={query}
		class="input join-item input-bordered input-lg w-full border-base-content"
	/>
	<button class="btn btn-square btn-outline join-item btn-lg" title="Search" type="submit"
		><SearchIcon class="h-7 w-7" /></button
	>
</form>
