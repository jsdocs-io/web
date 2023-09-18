<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ dependencies } = data);
</script>

<pre>{JSON.stringify(dependencies, null, 2)}</pre>
