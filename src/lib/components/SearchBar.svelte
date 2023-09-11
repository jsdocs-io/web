<script>
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
</script>

<div class="join flex w-full justify-center">
	<input
		type="text"
		placeholder="Search npm packages"
		class="input join-item input-bordered input-lg w-full max-w-lg border-base-content"
	/>
	<button class="btn btn-square btn-outline join-item btn-lg" title="Search"
		><SearchIcon class="h-7 w-7" /></button
	>
</div>
