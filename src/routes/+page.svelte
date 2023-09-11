<script lang="ts">
	import FaqLinkButton from '$lib/components/FaqLinkButton.svelte';
	import GitHubLinkButton from '$lib/components/GitHubLinkButton.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import SearchTip from '$lib/components/SearchTip.svelte';
	import SponsorLinkButton from '$lib/components/SponsorLinkButton.svelte';
	import ThemeButton from '$lib/components/ThemeButton.svelte';
</script>

<div class="h-screen p-4">
	<div class="relative flex h-full items-center justify-center">
		<div class="absolute inset-x-0 top-0 flex items-center justify-end gap-2">
			<FaqLinkButton />
			<SponsorLinkButton />
			<GitHubLinkButton />
			<ThemeButton />
		</div>

		<div>
			<SearchBar />
			<SearchTip />
		</div>
	</div>
</div>
