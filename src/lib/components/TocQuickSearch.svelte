<script lang="ts">
	import { handleQuickSearchHotkey } from '$lib/actions/handle-quick-search-hotkey';
	import IconSearch from '~icons/material-symbols/search';

	const openQuickSearch = () => {
		const dialog = document.querySelector<HTMLDialogElement>('#quick-search');
		if (dialog && !dialog.open) {
			dialog.showModal();
		}
	};
</script>

<button
	class="btn btn-outline justify-between text-base font-normal normal-case leading-normal"
	title="Perform a quick search (Hotkey: F)"
	on:click={openQuickSearch}
	use:handleQuickSearchHotkey
>
	<div class="flex items-center gap-2">
		<IconSearch class="h-5 w-5" />
		Quick search...
	</div>
	<div class="badge badge-ghost">F</div>
</button>
