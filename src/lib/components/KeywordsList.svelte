<script lang="ts">
	export let keywords: string[];

	$: shortKeywords = keywords.slice(0, 7);
</script>

{#if shortKeywords.length > 0}
	<ul class="flex flex-wrap gap-2">
		{#each shortKeywords as keyword}
			<li>
				<a class="btn btn-xs font-normal normal-case" href="/search?q={keyword}">{keyword}</a>
			</li>
		{/each}
	</ul>
{/if}
