import { DeclarationKinds } from '@jsdocs-io/package-analyzer';
import { isCallableDeclarationKind } from '../../src/lib/is-callable-declaration-kind';

describe('isCallableDeclarationKind', () => {
    it('returns true for callable declaration kinds', () => {
        const kinds = [
            DeclarationKinds.FunctionDeclaration,
            DeclarationKinds.ClassConstructorDeclaration,
            DeclarationKinds.ClassMethodDeclaration,
            DeclarationKinds.InterfaceMethodDeclaration,
            DeclarationKinds.InterfaceConstructSignatureDeclaration,
            DeclarationKinds.InterfaceCallSignatureDeclaration,
        ];

        for (const kind of kinds) {
            expect(isCallableDeclarationKind({ kind })).toBeTruthy();
        }
    });

    it('returns false for non-callable declaration kinds', () => {
        const kinds = [
            DeclarationKinds.VariableDeclaration,
            DeclarationKinds.ClassDeclaration,
            DeclarationKinds.ClassPropertyDeclaration,
            DeclarationKinds.InterfaceDeclaration,
            DeclarationKinds.InterfacePropertyDeclaration,
            DeclarationKinds.InterfaceIndexSignatureDeclaration,
            DeclarationKinds.EnumDeclaration,
            DeclarationKinds.EnumMemberDeclaration,
            DeclarationKinds.TypeAliasDeclaration,
            DeclarationKinds.NamespaceDeclaration,
        ];

        for (const kind of kinds) {
            expect(isCallableDeclarationKind({ kind })).toBeFalsy();
        }
    });
});
