<script lang="ts">
	import IconBugReport from '~icons/material-symbols/bug-report';

	export let name: string;
	export let version: string;

	$: issueUrl = `https://github.com/jsdocs-io/web/issues/new?title=Package+${name}@${version}+has+missing+or+incorrect+documentation&template=package-with-missing-or-incorrect-documentation.md`;
</script>

<a
	href={issueUrl}
	class="btn btn-ghost btn-sm flex-nowrap justify-start normal-case"
	title="Missing or incorrect documentation? Report a bug!"
>
	<IconBugReport class="h-4 w-4 flex-none" />
	<span class="truncate">Report a bug with this package</span>
</a>
