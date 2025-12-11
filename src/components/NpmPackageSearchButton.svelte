<script lang="ts">
	import { onMount } from "svelte";
	import LucideSearch from "~icons/lucide/search";

	let shortcut = $state("Ctrl+Shift+F");

	onMount(() => {
		if (navigator.userAgent.includes("Mac")) {
			shortcut = "⇧⌘F";
		}
	});

	function openNpmSearchDialog() {
		const dialog = document.querySelector<HTMLDialogElement>("#npm-search-dialog");
		if (!dialog || dialog.open) return;
		dialog.showModal();
	}
</script>

<div class="contents md:hidden">
	<button
		type="button"
		class="btn-sm-icon-outline"
		title="Search npm packages"
		onclick={openNpmSearchDialog}
	>
		<LucideSearch class="size-4" />
	</button>
</div>

<div class="hidden md:contents">
	<button
		type="button"
		class="btn-sm-outline"
		title="Search npm packages"
		onclick={openNpmSearchDialog}
	>
		<LucideSearch class="size-4" />
		<span>Search npm packages</span>
		<kbd class="kbd">{shortcut}</kbd>
	</button>
</div>
