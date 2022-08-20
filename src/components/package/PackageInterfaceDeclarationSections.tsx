import { InterfaceDeclaration } from "@jsdocs-io/extractor";
import PackageDeclarationSection from "./PackageDeclarationSection";

const PackageInterfaceDeclarationSections = ({
  declaration,
}: {
  declaration: InterfaceDeclaration;
}) => {
  const hasMembers = Object.values(declaration.members).flat().length > 0;

  return (
    <div className="space-y-4">
      <PackageDeclarationSection declaration={declaration} />

      {hasMembers && (
        <div className="py-2 pl-4 space-y-8 border-l-2 border-stone-300 dark:border-stone-700">
          {declaration.members.properties.map((decl) => (
            <PackageDeclarationSection key={decl.id} declaration={decl} />
          ))}

          {declaration.members.methods.map((decl) => (
            <PackageDeclarationSection key={decl.id} declaration={decl} />
          ))}

          {declaration.members.constructSignatures.map((decl) => (
            <PackageDeclarationSection key={decl.id} declaration={decl} />
          ))}

          {declaration.members.callSignatures.map((decl) => (
            <PackageDeclarationSection key={decl.id} declaration={decl} />
          ))}

          {declaration.members.indexSignatures.map((decl) => (
            <PackageDeclarationSection key={decl.id} declaration={decl} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageInterfaceDeclarationSections;
