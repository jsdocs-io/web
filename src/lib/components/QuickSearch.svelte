<script lang="ts">
	import IconClose from '~icons/material-symbols/close';
	import IconSearch from '~icons/material-symbols/search';

	let query = '';

	const closeQuickSearch = () => {
		document.querySelector<HTMLDialogElement>('#quick-search')?.close();
	};

	const clearQuery = () => {
		query = '';
	};
</script>

<dialog id="quick-search" class="modal" on:close={clearQuery}>
	<div class="modal-box p-0">
		<div class="flex items-center border-b border-base-content/50">
			<div class="flex w-12 flex-none items-center justify-center">
				<IconSearch class="h-5 w-5" />
			</div>

			<!-- svelte-ignore a11y-autofocus -->
			<input
				autofocus
				type="text"
				placeholder="Quick search..."
				class="input grow rounded-none border-none px-0 placeholder-base-content focus-within:outline-none focus:outline-none"
				bind:value={query}
			/>

			<div class="flex w-12 flex-none items-center justify-center">
				<button
					class="btn btn-square btn-ghost btn-sm"
					on:click={closeQuickSearch}
					title="Close quick search (Hotkey: Esc)"
				>
					<IconClose class="h-5 w-5" />
				</button>
			</div>
		</div>

		<div class="h-48 w-full" />
	</div>

	<form method="dialog" class="modal-backdrop">
		<button>Close quick search</button>
	</form>
</dialog>
