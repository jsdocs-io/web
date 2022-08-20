import { TypeAliasDeclaration } from "@jsdocs-io/extractor";
import PackageIndexTypeAliasesList from "./PackageIndexTypeAliasesList";

const PackageIndexTypeAliasesSection = ({
  typeAliases,
}: {
  typeAliases: TypeAliasDeclaration[];
}) => {
  if (!typeAliases.length) {
    return null;
  }

  return (
    <section className="space-y-2">
      <h3 id="package-index-type-aliases">Type Aliases</h3>

      <PackageIndexTypeAliasesList typeAliases={typeAliases} />
    </section>
  );
};

export default PackageIndexTypeAliasesSection;
