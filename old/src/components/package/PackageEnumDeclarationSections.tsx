import { EnumDeclaration } from "@jsdocs-io/extractor";
import PackageDeclarationSection from "./PackageDeclarationSection";

const PackageEnumDeclarationSections = ({
  declaration,
}: {
  declaration: EnumDeclaration;
}) => {
  const hasMembers = declaration.members.length > 0;

  return (
    <div className="space-y-4">
      <PackageDeclarationSection declaration={declaration} />

      {hasMembers && (
        <div className="py-2 pl-4 space-y-8 border-l-2 border-stone-300 dark:border-stone-700">
          {declaration.members.map((decl) => (
            <PackageDeclarationSection key={decl.id} declaration={decl} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PackageEnumDeclarationSections;
