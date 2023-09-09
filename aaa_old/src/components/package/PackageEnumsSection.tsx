import { EnumDeclaration } from "@jsdocs-io/extractor";
import PackageEnumDeclarationSections from "./PackageEnumDeclarationSections";

const PackageEnumsSection = ({ enums }: { enums: EnumDeclaration[] }) => {
  if (!enums.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 id="package-enums">Enums</h2>

      <div className="space-y-8">
        {enums.map((declaration) => (
          <PackageEnumDeclarationSections
            key={declaration.id}
            declaration={declaration}
          />
        ))}
      </div>
    </section>
  );
};

export default PackageEnumsSection;
