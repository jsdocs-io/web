<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ versions } = data);
</script>

<pre>{JSON.stringify(versions, null, 2)}</pre>
