<script lang="ts">
	import IconClose from '~icons/material-symbols/close';
	import IconSearch from '~icons/material-symbols/search';

	const closeQuickSearch = () => {
		document.querySelector<HTMLDialogElement>('#quick-search')?.close();
	};
</script>

<dialog id="quick-search" class="modal" open>
	<div class="modal-box p-0">
		<div class="relative border-b border-base-content/50 py-1">
			<div class="absolute inset-y-0 left-0 flex w-12 items-center justify-center">
				<IconSearch class="h-5 w-5" />
			</div>

			<!-- svelte-ignore a11y-autofocus -->
			<input
				autofocus
				type="text"
				placeholder="Quick search..."
				class="input w-full rounded-none px-12 placeholder-base-content focus:outline-none"
			/>

			<div class="absolute inset-y-0 right-0 flex w-12 items-center justify-center">
				<button class="btn btn-square btn-ghost btn-sm" on:click={closeQuickSearch}>
					<IconClose class="h-5 w-5" />
				</button>
			</div>
		</div>

		<div class="h-48 w-full" />
	</div>

	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
