import { InterfaceDeclaration } from "@jsdocs-io/extractor";
import PackageInterfaceDeclarationSections from "./PackageInterfaceDeclarationSections";

const PackageInterfacesSection = ({
  interfaces,
}: {
  interfaces: InterfaceDeclaration[];
}) => {
  if (!interfaces.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 id="package-interfaces">Interfaces</h2>

      <div className="space-y-8">
        {interfaces.map((declaration) => (
          <PackageInterfaceDeclarationSections
            key={declaration.id}
            declaration={declaration}
          />
        ))}
      </div>
    </section>
  );
};

export default PackageInterfacesSection;
