<script lang="ts">
	export let closeQuickSearch: () => void;

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

	let selected = 0;
</script>

<div class="h-64 overflow-hidden overflow-y-auto">
	<ul class="flex flex-col">
		{#each declarations as declaration, i (declaration.id)}
			{@const active = i === selected}
			<li class="rounded p-1" class:bg-base-content={active} class:text-base-100={active}>
				<a
					href="#{declaration.id}"
					class="link-hover link flex justify-between gap-4"
					title={declaration.name}
					on:click={closeQuickSearch}
					><span class="truncate">{declaration.name}</span> <span>(TODO:)</span></a
				>
			</li>
		{/each}
	</ul>
</div>
