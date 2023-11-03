<script lang="ts">
	import QuickSearchBackdrop from '$lib/components/QuickSearchBackdrop.svelte';
	import QuickSearchHeader from '$lib/components/QuickSearchHeader.svelte';
	import QuickSearchInput from '$lib/components/QuickSearchInput.svelte';
	import QuickSearchResults from '$lib/components/QuickSearchResults.svelte';

	let dialog: HTMLDialogElement;
	let query = '';

	const closeQuickSearch = () => {
		dialog.close();
	};

	const clearQuery = () => {
		query = '';
	};
</script>

<dialog id="quick-search" class="open:modal" on:close={clearQuery} bind:this={dialog} open>
	<div class="modal-box">
		<div class="flex flex-col gap-4">
			<QuickSearchHeader {closeQuickSearch} />
			<QuickSearchInput {query} />
			<QuickSearchResults {closeQuickSearch} />
		</div>
	</div>

	<QuickSearchBackdrop />
</dialog>
