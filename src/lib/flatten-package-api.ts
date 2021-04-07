import { NamespaceDeclaration, PackageAPI } from '@jsdocs-io/extractor';

export function flattenPackageAPI({
    api,
}: {
    api?: PackageAPI;
}): PackageAPI | undefined {
    if (!api) {
        return undefined;
    }

    const flatNamespaces = flattenNamespaces({
        namespaces: api.declarations.namespaces,
    }).sort((a, b) => a.id.localeCompare(b.id));

    return {
        ...api,
        declarations: {
            ...api.declarations,
            namespaces: flatNamespaces,
        },
    };
}

function flattenNamespaces({
    namespaces,
}: {
    namespaces: NamespaceDeclaration[];
}): NamespaceDeclaration[] {
    if (!namespaces.length) {
        return [];
    }

    // Copy current namespaces removing nested namespaces from declarations
    const shallowNamespaces = namespaces.map((declaration) => ({
        ...declaration,
        declarations: { ...declaration.declarations, namespaces: [] },
    }));

    // Extract nested namespaces
    const nestedNamespaces = namespaces.flatMap(
        ({ declarations: { namespaces } }) => namespaces
    );

    // Flatten nested namespaces recursively
    const shallowNestedNamespaces = flattenNamespaces({
        namespaces: nestedNamespaces,
    });

    return [...shallowNamespaces, ...shallowNestedNamespaces];
}
