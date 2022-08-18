import { DeclarationKinds } from "@jsdocs-io/extractor";

export function getDeclarationKindDescription({
  kind,
}: {
  kind: DeclarationKinds;
}): string {
  switch (kind) {
    // Top level declarations
    case "VariableDeclaration":
      return "Variable";
    case "FunctionDeclaration":
      return "Function";
    case "ClassDeclaration":
      return "Class";
    case "InterfaceDeclaration":
      return "Interface";
    case "EnumDeclaration":
      return "Enum";
    case "TypeAliasDeclaration":
      return "Type alias";
    case "NamespaceDeclaration":
      return "Namespace";

    // Member declarations
    case "ClassConstructorDeclaration":
    case "InterfaceConstructSignatureDeclaration":
      return "Constructor";
    case "ClassPropertyDeclaration":
    case "InterfacePropertyDeclaration":
      return "Property";
    case "ClassMethodDeclaration":
    case "InterfaceMethodDeclaration":
      return "Method";
    case "InterfaceCallSignatureDeclaration":
      return "Call signature";
    case "InterfaceIndexSignatureDeclaration":
      return "Index signature";
    case "EnumMemberDeclaration":
      return "Enum member";
  }

  return "";
}
