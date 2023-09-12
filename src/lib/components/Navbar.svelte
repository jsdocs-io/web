<script lang="ts">
	import FaqLinkButton from '$lib/components/FaqLinkButton.svelte';
	import GitHubLinkButton from '$lib/components/GitHubLinkButton.svelte';
	import SponsorLinkButton from '$lib/components/SponsorLinkButton.svelte';
	import ThemeButton from '$lib/components/ThemeButton.svelte';
</script>

<div class="flex items-center gap-2 overflow-x-scroll p-4 sm:justify-end sm:overflow-x-auto">
	<FaqLinkButton />
	<SponsorLinkButton />
	<GitHubLinkButton />
	<ThemeButton />
</div>
