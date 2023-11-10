<script lang="ts">
	import { setPackageInfo } from '$lib/stores/package-info';
	import { setPageInfo } from '$lib/stores/page-info';

	setPackageInfo();
	setPageInfo();
</script>

<slot />
