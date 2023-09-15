<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ name, dependencies } = data);
</script>

<h1>Dependencies for package {name}</h1>

<pre>{JSON.stringify(dependencies, null, 2)}</pre>
