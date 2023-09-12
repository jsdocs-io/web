<script lang="ts">
	import { navigating } from '$app/stores';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import NProgress from 'nprogress';
	import '../app.css';

	NProgress.configure({ showSpinner: false });
	$: {
		if ($navigating) {
			NProgress.start();
		} else {
			NProgress.done();
		}
	}
</script>

<div class="flex h-screen flex-col">
	<Navbar />

	<div class="grow p-4">
		<slot />
	</div>

	<Footer />
</div>
