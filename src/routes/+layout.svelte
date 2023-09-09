<script>
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
</script>

<div class="flex h-screen flex-col">
	<Navbar />

	<div class="grow">
		<slot />
	</div>

	<Footer />
</div>
