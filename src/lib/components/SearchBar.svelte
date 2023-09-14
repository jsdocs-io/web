<script lang="ts">
	import { focusSearchBar } from '$lib/actions/focus-search-bar';
	import IconSearch from '~icons/material-symbols/search';

	export let query: string | undefined = undefined;
</script>

<label class="sr-only" for="search-bar">Search npm packages. Press Ctrl and K to focus.</label>
<form class="join w-full max-w-xl" action="/search">
	<input
		use:focusSearchBar
		id="search-bar"
		type="search"
		name="q"
		placeholder="Search npm packages [Ctrl+K]"
		bind:value={query}
		class="input join-item input-bordered input-lg w-full border-base-content"
	/>
	<button class="btn btn-square btn-outline join-item btn-lg" title="Search" type="submit"
		><IconSearch class="h-7 w-7" /></button
	>
</form>
