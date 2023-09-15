<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ name, versions } = data);
</script>

<h1>Versions for package {name}</h1>

<pre>{JSON.stringify(versions, null, 2)}</pre>
