import { FunctionDeclaration } from "@jsdocs-io/extractor";
import PackageIndexFunctionsList from "./PackageIndexFunctionsList";

const PackageIndexFunctionsSection = ({
  functions,
}: {
  functions: FunctionDeclaration[];
}) => {
  if (!functions.length) {
    return null;
  }

  return (
    <section className="space-y-2">
      <h3 id="package-index-functions">Functions</h3>

      <PackageIndexFunctionsList functions={functions} />
    </section>
  );
};

export default PackageIndexFunctionsSection;
