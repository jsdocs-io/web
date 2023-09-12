<script lang="ts">
	import { navigating } from '$app/stores';
	import NProgress from 'nprogress';
	import '../../node_modules/nprogress/nprogress.css';
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

<slot />
