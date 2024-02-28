import { InterfaceDeclaration } from "@jsdocs-io/extractor";
import PackageIndexInterfacesList from "./PackageIndexInterfacesList";

const PackageIndexInterfacesSection = ({
  interfaces,
}: {
  interfaces: InterfaceDeclaration[];
}) => {
  if (!interfaces.length) {
    return null;
  }

  return (
    <section className="space-y-2">
      <h3 id="package-index-interfaces">Interfaces</h3>

      <PackageIndexInterfacesList interfaces={interfaces} />
    </section>
  );
};

export default PackageIndexInterfacesSection;
