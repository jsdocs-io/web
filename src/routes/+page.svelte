<script lang="ts">
	import FaqLinkButton from '$lib/components/FaqLinkButton.svelte';
	import GitHubLinkButton from '$lib/components/GitHubLinkButton.svelte';
	import HomepageLogo from '$lib/components/HomepageLogo.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import SearchTip from '$lib/components/SearchTip.svelte';
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

	<div class="flex w-full flex-col items-center gap-6">
		<HomepageLogo />
		<SearchBar />
		<SearchTip />
		<div class="h-4" />
	</div>
</div>
