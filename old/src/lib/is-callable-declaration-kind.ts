import { DeclarationKinds } from "@jsdocs-io/extractor";

const isCallableDeclarationKind = ({
  kind,
}: {
  kind: DeclarationKinds;
}): boolean => {
  switch (kind) {
    case "FunctionDeclaration":
    case "ClassConstructorDeclaration":
    case "InterfaceConstructSignatureDeclaration":
    case "ClassMethodDeclaration":
    case "InterfaceMethodDeclaration":
    case "InterfaceCallSignatureDeclaration":
      return true;
    default:
      return false;
  }
};

export default isCallableDeclarationKind;
