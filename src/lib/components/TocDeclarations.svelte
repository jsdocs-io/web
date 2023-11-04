<script lang="ts">
	import { mockDeclarations } from '$lib/temp/mock-declarations';

	const variables = [...mockDeclarations];
	const functions = [...mockDeclarations];
	const classes = [...mockDeclarations];
	const interfaces = [...mockDeclarations];
	const typeAliases = [...mockDeclarations];
	const namespaces = [...mockDeclarations];
</script>

<div class="flex flex-col gap-2 overflow-y-auto">
	{#if variables.length > 0}
		<div class="divider my-1">Variables</div>

		{#each variables as { id, name }}
			<a
				href="#{id}"
				class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
				title="Variable {name}"
			>
				<span class="truncate">{name}</span>
			</a>
		{/each}
	{/if}

	{#if functions.length > 0}
		<div class="divider my-1">Functions</div>
		{#each functions as { id, name }}
			<a
				href="#{id}"
				class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
				title="Function {name}"
			>
				<span class="truncate">{name}</span>
			</a>
		{/each}
	{/if}

	{#if classes.length > 0}
		<div class="divider my-1">Classes</div>
		{#each classes as { id, name }}
			<a
				href="#{id}"
				class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
				title="Class {name}"
			>
				<span class="truncate">{name}</span>
			</a>
		{/each}
	{/if}

	{#if interfaces.length > 0}
		<div class="divider my-1">Interfaces</div>
		{#each interfaces as { id, name }}
			<a
				href="#{id}"
				class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
				title="Interface {name}"
			>
				<span class="truncate">{name}</span>
			</a>
		{/each}
	{/if}

	{#if typeAliases.length > 0}
		<div class="divider my-1">Type Aliases</div>
		{#each typeAliases as { id, name }}
			<a
				href="#{id}"
				class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
				title="Type alias {name}"
			>
				<span class="truncate">{name}</span>
			</a>
		{/each}
	{/if}

	{#if namespaces.length > 0}
		<div class="divider my-1">Namespaces</div>
		{#each namespaces as { id, name }}
			<a
				href="#{id}"
				class="btn btn-ghost btn-sm flex-nowrap justify-start font-normal normal-case leading-normal"
				title="Namespace {name}"
			>
				<span class="truncate">{name}</span>
			</a>
		{/each}
	{/if}
</div>
