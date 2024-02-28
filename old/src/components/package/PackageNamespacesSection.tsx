import { NamespaceDeclaration } from "@jsdocs-io/extractor";
import PackageNamespaceDeclarationSections from "./PackageNamespaceDeclarationSections";

const PackageNamespacesSection = ({
  namespaces,
}: {
  namespaces: NamespaceDeclaration[];
}) => {
  if (!namespaces.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 id="package-namespaces">Namespaces</h2>

      <div className="space-y-8">
        {namespaces.map((declaration) => (
          <PackageNamespaceDeclarationSections
            key={declaration.id}
            declaration={declaration}
          />
        ))}
      </div>
    </section>
  );
};

export default PackageNamespacesSection;
