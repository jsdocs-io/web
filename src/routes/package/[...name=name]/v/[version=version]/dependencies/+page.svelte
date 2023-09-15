<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ name, version, dependencies } = data);
</script>

<h1>Dependencies for package {name} version {version}</h1>

<pre>{JSON.stringify(dependencies, null, 2)}</pre>
