<script lang="ts">
	const packages = ['foo', 'bar', 'baz'];
</script>

<ul>
	{#each packages as p}
		<li>{p}</li>
	{/each}
</ul>
