import { DeclarationKinds } from '@jsdocs-io/extractor';

export function isCallableDeclarationKind({
    kind,
}: {
    kind: DeclarationKinds;
}): boolean {
    switch (kind) {
        case 'FunctionDeclaration':
        case 'ClassConstructorDeclaration':
        case 'InterfaceConstructSignatureDeclaration':
        case 'ClassMethodDeclaration':
        case 'InterfaceMethodDeclaration':
        case 'InterfaceCallSignatureDeclaration':
            return true;
        default:
            return false;
    }
}
