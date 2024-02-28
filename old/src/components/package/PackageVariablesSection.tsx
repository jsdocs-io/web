import { VariableDeclaration } from "@jsdocs-io/extractor";
import PackageDeclarationSection from "./PackageDeclarationSection";

const PackageVariablesSection = ({
  variables,
}: {
  variables: VariableDeclaration[];
}) => {
  if (!variables.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 id="package-variables">Variables</h2>

      <div className="space-y-8">
        {variables.map((declaration) => (
          <PackageDeclarationSection
            key={declaration.id}
            declaration={declaration}
          />
        ))}
      </div>
    </section>
  );
};

export default PackageVariablesSection;
