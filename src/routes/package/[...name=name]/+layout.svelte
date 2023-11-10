<script lang="ts">
	import { setPackageInfo } from '$lib/stores/package-info';
	import { setPageInfo } from '$lib/stores/page-info';
	import { setQuickSearchStores } from '$lib/stores/quick-search';

	setPackageInfo();
	setPageInfo();
	setQuickSearchStores();
</script>

<slot />
