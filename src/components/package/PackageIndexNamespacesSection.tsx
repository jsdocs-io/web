import { NamespaceDeclaration } from "@jsdocs-io/extractor";
import PackageIndexNamespacesList from "./PackageIndexNamespacesList";

const PackageIndexNamespacesSection = ({
  namespaces,
}: {
  namespaces: NamespaceDeclaration[];
}) => {
  if (!namespaces.length) {
    return null;
  }

  return (
    <section className="space-y-2">
      <h3 id="package-index-namespaces">Namespaces</h3>

      <PackageIndexNamespacesList namespaces={namespaces} />
    </section>
  );
};

export default PackageIndexNamespacesSection;
