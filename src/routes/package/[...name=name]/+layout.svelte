<script lang="ts">
	import { setPackageInfo } from '$lib/stores/package-info';
	import { setQuickSearchStores } from '$lib/stores/quick-search';

	setQuickSearchStores();
	setPackageInfo();
</script>

<slot />
