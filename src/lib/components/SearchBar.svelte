<script>
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
</script>

<div class="join">
	<input
		type="text"
		placeholder="Search npm packages"
		class="input join-item input-bordered input-lg w-full max-w-xs"
	/>
	<button class="btn btn-square join-item btn-lg"><SearchIcon class="h-7 w-7" /></button>
</div>
