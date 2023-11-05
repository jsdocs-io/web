<script lang="ts">
	export let query = '';
</script>

<label for="quick-search-input" class="sr-only">Search for symbols in this package</label>

<!-- svelte-ignore a11y-autofocus -->
<input
	id="quick-search-input"
	autofocus
	type="search"
	class="input input-bordered flex-none border-base-content placeholder-base-content"
	bind:value={query}
/>
