<script lang="ts">
	import AboutLinkButton from '$lib/components/AboutLinkButton.svelte';
	import PoweredByVercelLinkButton from '$lib/components/PoweredByVercelLinkButton.svelte';
	import PrivacyLinkButton from '$lib/components/PrivacyLinkButton.svelte';
</script>

<div class="flex-none">
	<div class="mx-auto max-w-screen-4xl">
		<div class="flex items-center justify-start gap-2 overflow-x-auto p-4 sm:justify-end">
			<AboutLinkButton />
			<PrivacyLinkButton />
			<PoweredByVercelLinkButton />
		</div>
	</div>
</div>
