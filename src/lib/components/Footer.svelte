<script lang="ts">
	import AboutLinkButton from '$lib/components/AboutLinkButton.svelte';
	import PoweredByVercelLinkButton from '$lib/components/PoweredByVercelLinkButton.svelte';
	import PrivacyLinkButton from '$lib/components/PrivacyLinkButton.svelte';
</script>

<div
	class="flex flex-none flex-wrap items-center justify-center gap-2 overflow-x-scroll p-4 sm:justify-end sm:overflow-x-auto"
>
	<AboutLinkButton />
	<PrivacyLinkButton />
	<PoweredByVercelLinkButton />
</div>
