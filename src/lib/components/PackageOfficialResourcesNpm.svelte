<script lang="ts">
	import IconNpm from '~icons/simple-icons/npm';

	export let name: string;
</script>

<a
	href="https://www.npmjs.com/package/{name}"
	class="btn btn-ghost btn-sm flex-nowrap justify-start normal-case"
	title="View package on npm"
>
	<IconNpm class="h-4 w-4 flex-none" />
	<span class="truncate">{name}</span>
</a>
