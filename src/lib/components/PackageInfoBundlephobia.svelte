<script lang="ts">
	import IconWeight from '~icons/material-symbols/weight';

	export let name: string;
</script>

<a
	href="https://bundlephobia.com/package/{name}"
	class="btn btn-ghost btn-sm flex-nowrap justify-start normal-case"
	title="View package bundle size on Bundlephobia"
>
	<IconWeight class="h-4 w-4 flex-none" />
	<span class="truncate">Bundlephobia</span>
</a>
