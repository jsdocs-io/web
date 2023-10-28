<script lang="ts">
	const declarations = [
		{ id: 'analyzeRegistryPackage', name: 'analyzeRegistryPackage' },
		{ id: 'isClassConstructorDeclaration', name: 'isClassConstructorDeclaration' },
		{ id: 'isClassDeclaration', name: 'isClassDeclaration' },
		{ id: 'isClassMethodDeclaration', name: 'isClassMethodDeclaration' },
		{ id: 'isClassPropertyDeclaration', name: 'isClassPropertyDeclaration' },
		{ id: 'isEnumDeclaration', name: 'isEnumDeclaration' },
		{ id: 'isEnumMemberDeclaration', name: 'isEnumMemberDeclaration' },
		{ id: 'isFunctionDeclaration', name: 'isFunctionDeclaration' },
		{ id: 'isInterfaceCallSignatureDeclaration', name: 'isInterfaceCallSignatureDeclaration' },
		{
			id: 'isInterfaceConstructSignatureDeclaration',
			name: 'isInterfaceConstructSignatureDeclaration'
		},
		{ id: 'isInterfaceDeclaration', name: 'isInterfaceDeclaration' },
		{ id: 'isInterfaceIndexSignatureDeclaration', name: 'isInterfaceIndexSignatureDeclaration' },
		{ id: 'isInterfaceMethodDeclaration', name: 'isInterfaceMethodDeclaration' },
		{ id: 'isInterfacePropertyDeclaration', name: 'isInterfacePropertyDeclaration' },
		{ id: 'isNamespaceDeclaration', name: 'isNamespaceDeclaration' },
		{ id: 'isTypeAliasDeclaration', name: 'isTypeAliasDeclaration' },
		{ id: 'isVariableDeclaration', name: 'isVariableDeclaration' }
	];

	const variables = [...declarations];
	const functions = [...declarations];
	const classes = [...declarations];
	const interfaces = [...declarations];
	const typeAliases = [...declarations];
	const namespaces = [...declarations];
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
