<script lang="ts">
	import FaqLinkButton from '$lib/components/FaqLinkButton.svelte';
	import GitHubLinkButton from '$lib/components/GitHubLinkButton.svelte';
	import HomepageLinkButton from '$lib/components/HomepageLinkButton.svelte';
	import SponsorLinkButton from '$lib/components/SponsorLinkButton.svelte';
	import ThemeButton from '$lib/components/ThemeButton.svelte';
</script>

<div class="flex items-center justify-between gap-2 overflow-x-auto p-4">
	<HomepageLinkButton />

	<div class="flex items-center gap-2">
		<FaqLinkButton />
		<SponsorLinkButton />
		<GitHubLinkButton />
		<ThemeButton />
	</div>
</div>
