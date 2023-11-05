<script lang="ts">
	import QuickSearchBackdrop from '$lib/components/QuickSearchBackdrop.svelte';
	import QuickSearchHeader from '$lib/components/QuickSearchHeader.svelte';
	import QuickSearchInput from '$lib/components/QuickSearchInput.svelte';
	import QuickSearchResults from '$lib/components/QuickSearchResults.svelte';

	let dialog: HTMLDialogElement | undefined;
	let query = '';

	const closeQuickSearch = () => {
		dialog?.close();
	};

	const clearQuery = () => {
		query = '';
	};
</script>

<dialog id="quick-search" class="open:modal" on:close={clearQuery} bind:this={dialog}>
	<div class="modal-box">
		<div class="flex flex-col gap-4">
			<QuickSearchHeader on:closebuttonclick={closeQuickSearch} />
			<QuickSearchInput bind:query />
			<QuickSearchResults on:resultclick={closeQuickSearch} />
		</div>
	</div>
	<QuickSearchBackdrop />
</dialog>
