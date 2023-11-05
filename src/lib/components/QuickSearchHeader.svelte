<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import IconClose from '~icons/material-symbols/close';

	const dispatch = createEventDispatcher();

	const handleCloseButtonClick = () => {
		dispatch('closebuttonclick');
	};
</script>

<div class="flex flex-none items-center justify-between">
	<h3 class="font-bold">Quick Search</h3>

	<button
		class="btn btn-square btn-ghost btn-sm"
		title="Close quick search (Hotkey: Esc)"
		on:click={handleCloseButtonClick}
	>
		<IconClose class="h-5 w-5" />
	</button>
</div>
