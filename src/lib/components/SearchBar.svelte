<script>
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
</script>

<div class="join w-full">
	<input
		type="text"
		placeholder="Search npm packages"
		class="input join-item input-bordered input-success input-lg w-full"
	/>
	<button class="btn btn-square btn-success join-item btn-lg"
		><SearchIcon class="h-7 w-7 text-white" /></button
	>
</div>
