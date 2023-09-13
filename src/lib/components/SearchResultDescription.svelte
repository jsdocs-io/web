<script lang="ts">
	export let description: string;
</script>

{#if description}
	<p class="line-clamp-3">{description}</p>
{/if}
