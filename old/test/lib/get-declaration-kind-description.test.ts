import { DeclarationKinds } from "@jsdocs-io/extractor";
import getDeclarationKindDescription from "../../src/lib/get-declaration-kind-description";

describe("getDeclarationKindDescription", () => {
  it("returns a description for each declaration kind", () => {
    const kinds = [
      DeclarationKinds.VariableDeclaration,
      DeclarationKinds.FunctionDeclaration,
      DeclarationKinds.ClassDeclaration,
      DeclarationKinds.ClassConstructorDeclaration,
      DeclarationKinds.ClassPropertyDeclaration,
      DeclarationKinds.ClassMethodDeclaration,
      DeclarationKinds.InterfaceDeclaration,
      DeclarationKinds.InterfacePropertyDeclaration,
      DeclarationKinds.InterfaceMethodDeclaration,
      DeclarationKinds.InterfaceConstructSignatureDeclaration,
      DeclarationKinds.InterfaceCallSignatureDeclaration,
      DeclarationKinds.InterfaceIndexSignatureDeclaration,
      DeclarationKinds.EnumDeclaration,
      DeclarationKinds.EnumMemberDeclaration,
      DeclarationKinds.TypeAliasDeclaration,
      DeclarationKinds.NamespaceDeclaration,
    ];

    for (const kind of kinds) {
      expect(getDeclarationKindDescription({ kind })).toBeTruthy();
    }
  });

  it("does not return a description for unknown kinds", () => {
    expect(getDeclarationKindDescription({ kind: "Unknown" as any })).toEqual(
      ""
    );
  });
});
