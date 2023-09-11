<script lang="ts">
	import FaqLinkButton from '$lib/components/FaqLinkButton.svelte';
	import GitHubLinkButton from '$lib/components/GitHubLinkButton.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import SponsorLinkButton from '$lib/components/SponsorLinkButton.svelte';
	import ThemeButton from '$lib/components/ThemeButton.svelte';
</script>

<div class="relative flex h-screen items-center justify-center p-4">
	<div
		class="absolute inset-x-0 top-0 flex items-center gap-2 overflow-x-scroll p-4 sm:justify-end sm:overflow-x-auto"
	>
		<FaqLinkButton />
		<SponsorLinkButton />
		<GitHubLinkButton />
		<ThemeButton />
	</div>

	<div class="w-full">
		<SearchBar />
	</div>

	<!-- <div class="border">
			<h1 class="flex items-center justify-center gap-4 text-center text-4xl font-bold">
				<svg class="h-12 w-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
					><path
						fill="currentColor"
						d="M11 21.725v-9.15L3 7.95v8.025q0 .55.263 1T4 17.7l7 4.025Zm2 0l7-4.025q.475-.275.738-.725t.262-1V7.95l-8 4.625v9.15Zm3.975-13.75l2.95-1.725L13 2.275Q12.525 2 12 2t-1 .275L9.025 3.4l7.95 4.575ZM12 10.85l2.975-1.7l-7.925-4.6l-3 1.725L12 10.85Z"
					/></svg
				>
				jsDocs.io
			</h1>
			<p class="prose text-center text-xl">Automatic documentation for npm packages</p>
			<SearchBar />
			<SearchTip />
		</div> -->
</div>
