import { VariableDeclaration } from "@jsdocs-io/extractor";
import PackageIndexVariablesList from "./PackageIndexVariablesList";

const PackageIndexVariablesSection = ({
  variables,
}: {
  variables: VariableDeclaration[];
}) => {
  if (!variables.length) {
    return null;
  }

  return (
    <section className="space-y-2">
      <h3 id="package-index-variables">Variables</h3>

      <PackageIndexVariablesList variables={variables} />
    </section>
  );
};

export default PackageIndexVariablesSection;
