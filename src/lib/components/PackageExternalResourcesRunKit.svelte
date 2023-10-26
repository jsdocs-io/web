<script lang="ts">
	import IconRunKit from '~icons/simple-icons/runkit';

	export let name: string;
</script>

<a
	href="https://npm.runkit.com/{name}"
	class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
	title="Try package on RunKit"
>
	<IconRunKit class="h-4 w-4 flex-none" />
	<span class="truncate">RunKit</span>
</a>
