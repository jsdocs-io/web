<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ name, version } = data);
</script>

<h1>Dependencies for package {name} at version {version}</h1>

<pre>{JSON.stringify(data, null, 2)}</pre>
