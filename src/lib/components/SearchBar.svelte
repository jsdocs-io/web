<script>
	import RoundSearch from '$lib/icons/RoundSearch.svelte';
</script>

<div class="join">
	<input
		type="text"
		placeholder="Search npm packages"
		class="input input-bordered input-lg w-full max-w-xs join-item"
	/>
	<button class="btn join-item btn-square btn-lg"><RoundSearch class="w-7 h-7" /></button>
</div>
