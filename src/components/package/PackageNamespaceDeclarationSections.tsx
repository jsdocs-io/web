import { NamespaceDeclaration } from "@jsdocs-io/extractor";
import PackageClassDeclarationSections from "./PackageClassDeclarationSections";
import PackageDeclarationSection from "./PackageDeclarationSection";
import PackageEnumDeclarationSections from "./PackageEnumDeclarationSections";
import PackageInterfaceDeclarationSections from "./PackageInterfaceDeclarationSections";

const PackageNamespaceDeclarationSections = ({
  declaration,
}: {
  declaration: NamespaceDeclaration;
}) => {
  const hasMembers = Object.values(declaration.declarations).flat().length > 0;

  return (
    <div className="space-y-4">
      <PackageDeclarationSection declaration={declaration} />

      {hasMembers && (
        <div className="py-2 pl-4 space-y-8 border-l-2 border-gray-300 dark:border-gray-700">
          {declaration.declarations.variables.map((decl) => (
            <PackageDeclarationSection key={decl.id} declaration={decl} />
          ))}

          {declaration.declarations.functions.map((decl) => (
            <PackageDeclarationSection key={decl.id} declaration={decl} />
          ))}

          {declaration.declarations.classes.map((decl) => (
            <PackageClassDeclarationSections key={decl.id} declaration={decl} />
          ))}

          {declaration.declarations.interfaces.map((decl) => (
            <PackageInterfaceDeclarationSections
              key={decl.id}
              declaration={decl}
            />
          ))}

          {declaration.declarations.enums.map((decl) => (
            <PackageEnumDeclarationSections key={decl.id} declaration={decl} />
          ))}

          {declaration.declarations.typeAliases.map((decl) => (
            <PackageDeclarationSection key={decl.id} declaration={decl} />
          ))}

          {declaration.declarations.namespaces.map((decl) => (
            <PackageNamespaceDeclarationSections
              key={decl.id}
              declaration={decl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageNamespaceDeclarationSections;
