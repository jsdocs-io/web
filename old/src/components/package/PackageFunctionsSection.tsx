import { FunctionDeclaration } from "@jsdocs-io/extractor";
import PackageDeclarationSection from "./PackageDeclarationSection";

const PackageFunctionsSection = ({
  functions,
}: {
  functions: FunctionDeclaration[];
}) => {
  if (!functions.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 id="package-functions">Functions</h2>

      <div className="space-y-8">
        {functions.map((declaration) => (
          <PackageDeclarationSection
            key={declaration.id}
            declaration={declaration}
          />
        ))}
      </div>
    </section>
  );
};

export default PackageFunctionsSection;
