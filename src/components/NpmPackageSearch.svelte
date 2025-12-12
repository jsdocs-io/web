<script lang="ts">
	import { throttle } from "lodash-es";
	import { resource, useMutationObserver, watch } from "runed";
	import LucideLoaderCircle from "~icons/lucide/loader-circle";
	import LucideSearch from "~icons/lucide/search";
	import LucideX from "~icons/lucide/x";
	import { mod } from "../../lib/client/mod";
	import { scrollIntoView } from "../../lib/client/scroll-into-view";

	interface NpmPackage {
		name: string;
		description: string;
	}

	interface NpmSearchResponse {
		objects: { package: { name: string; description?: string } }[];
	}

	let dialog = $state<HTMLDialogElement>();
	let resultsList = $state<HTMLUListElement>();

	let query = $state("");
	let resultsCursor = $state(0);

	let results = resource(
		() => query,
		async (query, _, { signal }): Promise<NpmPackage[]> => {
			let text = query.trim();
			if (text.length < 2) return [];
			let endpoint = `https://registry.npmjs.org/-/v1/search?text=${text}&size=20`;
			let response = await fetch(endpoint, { signal });
			let json = (await response.json()) as NpmSearchResponse;
			return json.objects.map(({ package: pkg }) => ({
				name: pkg.name,
				description: pkg.description ?? "Description not available",
			}));
		},
		{ lazy: true, initialValue: [], debounce: 400 },
	);

	// Track when the dialog is opened or closed.
	// Workaround as the ToggleEvent is not supported for dialog in Safari.
	// See https://developer.mozilla.org/en-US/docs/Web/API/ToggleEvent
	// and https://github.com/sveltejs/svelte/issues/4723.
	useMutationObserver(
		() => dialog,
		() => {
			resetSearchState();
		},
		{ attributeFilter: ["open"] },
	);

	// When results change, move the cursor to the first result.
	watch(
		() => results.current,
		() => {
			resultsCursor = 0;
		},
	);

	// When the cursor moves, scroll the search result into view.
	watch(
		() => resultsCursor,
		() => {
			scrollIntoView(resultsList, resultsCursor);
		},
	);

	function resetSearchState() {
		query = "";
		resultsCursor = 0;
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (
			// Open the dialog with Ctrl+Shift+F or Cmd+Shift+F.
			(event.ctrlKey || event.metaKey) &&
			event.shiftKey &&
			event.key.toLowerCase() === "f" &&
			dialog !== undefined &&
			!dialog.open
		) {
			event.preventDefault();
			dialog.showModal();
		}
	}

	let handleInputKeydown = throttle((event: KeyboardEvent) => {
		switch (event.key) {
			case "ArrowUp":
				event.preventDefault();
				prevResult();
				return;
			case "ArrowDown":
				event.preventDefault();
				nextResult();
				return;
			case "Enter":
				event.preventDefault();
				useResult();
				return;
		}
	}, 25);

	function prevResult() {
		resultsCursor = mod(resultsCursor - 1, results.current.length);
	}

	function nextResult() {
		resultsCursor = mod(resultsCursor + 1, results.current.length);
	}

	function useResult() {
		let pkgName = results.current[resultsCursor]?.name;
		if (!pkgName) return;
		closeDialog();
		window.location.href = `/package/${pkgName}`;
	}

	function closeDialog() {
		dialog?.close();
	}
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<!-- Remove transition to let search input autofocus; see https://github.com/saadeghi/daisyui/issues/3440 -->
<dialog id="npm-search-dialog" bind:this={dialog} class="modal [transition:unset]">
	<div class="modal-box max-w-2xl [transition:unset]">
		<form method="dialog">
			<button class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
				<LucideX class="size-5" />
			</button>
		</form>

		<div class="grid gap-4">
			<h3 class="text-lg font-bold">Search npm packages</h3>

			<label class="input w-full text-base">
				<span class="sr-only">Search packages on npm</span>

				{#if results.loading}
					<LucideLoaderCircle class="size-4 animate-spin" />
				{:else}
					<LucideSearch class="size-4" />
				{/if}

				<!-- svelte-ignore a11y_autofocus -->
				<input
					type="search"
					autocomplete="off"
					bind:value={query}
					onkeydown={handleInputKeydown}
					autofocus
				/>
			</label>

			<div class="h-96 overflow-y-auto">
				{#if results.loading}
					<!-- Empty slot to clear area between searches -->
				{:else if results.error}
					<div>Error searching npm</div>
				{:else if results.current.length > 0}
					<ul bind:this={resultsList}>
						{#each results.current as result, i (result.name)}
							<li>
								<a
									class={[
										"flex flex-col rounded px-2 py-1",
										i === resultsCursor && "bg-primary text-primary-content",
										i !== resultsCursor && "hover:bg-primary hover:text-primary-content/85",
									]}
									href="/package/{result.name}"
									onclick={closeDialog}
								>
									<span class="truncate font-bold">{result.name}</span>
									<span class="truncate text-sm">{result.description}</span>
								</a>
							</li>
						{/each}
					</ul>
				{:else if results.current.length === 0 && query.length > 0}
					<div
						class="bg-primary text-primary-content flex items-center justify-between gap-4 rounded px-2 py-1"
					>
						<div class="flex flex-col">
							<span class="truncate font-bold">No results</span>
							<span class="truncate text-sm">Try another query</span>
						</div>
						<span class="opacity-85">¯\_(ツ)_/¯</span>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<form method="dialog" class="modal-backdrop">
		<button>Close npm package search</button>
	</form>
</dialog>
