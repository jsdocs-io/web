import { ClassDeclaration } from "@jsdocs-io/extractor";
import PackageDeclarationSection from "./PackageDeclarationSection";

const PackageClassDeclarationSections = ({
  declaration,
}: {
  declaration: ClassDeclaration;
}) => {
  const hasMembers =
    declaration.constructors.length > 0 ||
    Object.values(declaration.members).flat().length > 0;

  return (
    <div className="space-y-4">
      <PackageDeclarationSection declaration={declaration} />

      {hasMembers && (
        <div className="py-2 pl-4 space-y-8 border-l-2 border-stone-300 dark:border-stone-700">
          {declaration.constructors.map((decl) => (
            <PackageDeclarationSection key={decl.id} declaration={decl} />
          ))}

          {declaration.members.properties.map((decl) => (
            <PackageDeclarationSection key={decl.id} declaration={decl} />
          ))}

          {declaration.members.methods.map((decl) => (
            <PackageDeclarationSection key={decl.id} declaration={decl} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageClassDeclarationSections;
