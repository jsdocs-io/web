<script lang="ts">
	import IconClose from '~icons/material-symbols/close';

	export let closeQuickSearch: () => void;
</script>

<div class="flex flex-none items-center justify-between">
	<h3 class="font-bold">Quick Search</h3>

	<button
		class="btn btn-square btn-ghost btn-sm"
		on:click={closeQuickSearch}
		title="Close quick search (Hotkey: Esc)"
	>
		<IconClose class="h-5 w-5" />
	</button>
</div>
