<script lang="ts">
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
</script>

<label class="sr-only" for="search-bar">Search npm packages</label>
<div class="join w-full max-w-xl">
	<input
		id="search-bar"
		type="text"
		placeholder="Search npm packages"
		class="input join-item input-bordered input-lg w-full border-base-content"
	/>
	<button class="btn btn-square btn-outline join-item btn-lg" title="Search"
		><SearchIcon class="h-7 w-7" /></button
	>
</div>
