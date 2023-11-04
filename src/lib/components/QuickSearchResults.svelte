<script lang="ts">
	import { quickSearchResultsKeyboard } from '$lib/actions/quick-search-results-keyboard';
	import { mockDeclarations } from '$lib/temp/mock-declarations';
	import { mod } from '$lib/utils/mod';

	export let closeQuickSearch: () => void;

	const declarations = mockDeclarations;
	let cursor = 0;
	let selectedResult: HTMLLIElement;

	const handleArrowUp = () => {
		cursor = mod(cursor - 1, declarations.length);
	};

	const handleArrowDown = () => {
		cursor = mod(cursor + 1, declarations.length);
	};

	const handleEnter = () => {};

	$: {
		if (selectedResult) {
			selectedResult.scrollIntoView({ block: 'nearest' });
		}
	}
</script>

<div class="h-64 overflow-hidden overflow-y-auto">
	<ul
		class="flex flex-col"
		use:quickSearchResultsKeyboard
		on:arrowup={handleArrowUp}
		on:arrowdown={handleArrowDown}
		on:enter={handleEnter}
	>
		{#each declarations as declaration, index (declaration.id)}
			{@const selected = index === cursor}
			{#if selected}
				<li class="rounded bg-base-content p-1 text-base-100" bind:this={selectedResult}>
					<a
						href="#{declaration.id}"
						class="link-hover link flex justify-between gap-4"
						title={declaration.name}
						on:click={closeQuickSearch}
						><span class="truncate">{declaration.name}</span> <span>({declaration.kind})</span></a
					>
				</li>
			{:else}
				<li class="rounded p-1">
					<a
						href="#{declaration.id}"
						class="link-hover link flex justify-between gap-4"
						title={declaration.name}
						on:click={closeQuickSearch}
						><span class="truncate">{declaration.name}</span> <span>({declaration.kind})</span></a
					>
				</li>
			{/if}
		{/each}
	</ul>
</div>
