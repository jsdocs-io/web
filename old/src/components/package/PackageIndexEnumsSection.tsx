import { EnumDeclaration } from "@jsdocs-io/extractor";
import PackageIndexEnumsList from "./PackageIndexEnumsList";

const PackageIndexEnumsSection = ({ enums }: { enums: EnumDeclaration[] }) => {
  if (!enums.length) {
    return null;
  }

  return (
    <section className="space-y-2">
      <h3 id="package-index-enums">Enums</h3>

      <PackageIndexEnumsList enums={enums} />
    </section>
  );
};

export default PackageIndexEnumsSection;
