<script>
	import BaselineSearch from '$lib/icons/BaselineSearch.svelte';
</script>

<div class="join">
	<input
		type="text"
		placeholder="Search npm packages"
		class="input input-bordered input-lg w-full max-w-xs join-item"
	/>
	<button class="btn join-item btn-square btn-lg"><BaselineSearch class="w-6 h-6" /></button>
</div>
