import { EnumDeclaration } from "@jsdocs-io/extractor";
import React from "react";
import { PackageDeclarationSection } from "./PackageDeclarationSection";

export function PackageEnumDeclarationSections({
  declaration,
}: {
  declaration: EnumDeclaration;
}) {
  const hasMembers = declaration.members.length > 0;

  return (
    <div className="space-y-4">
      <PackageDeclarationSection declaration={declaration} />

      {hasMembers && (
        <div className="py-2 pl-4 space-y-8 border-l-2 border-gray-300 dark:border-gray-700">
          {declaration.members.map((decl) => (
            <PackageDeclarationSection key={decl.id} declaration={decl} />
          ))}
        </div>
      )}
    </div>
  );
}
