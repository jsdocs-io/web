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

<Navbar />
<slot />
<Footer />
