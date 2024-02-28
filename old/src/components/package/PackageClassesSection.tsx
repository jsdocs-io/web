import { ClassDeclaration } from "@jsdocs-io/extractor";
import PackageClassDeclarationSections from "./PackageClassDeclarationSections";

const PackageClassesSection = ({
  classes,
}: {
  classes: ClassDeclaration[];
}) => {
  if (!classes.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 id="package-classes">Classes</h2>

      <div className="space-y-8">
        {classes.map((declaration) => (
          <PackageClassDeclarationSections
            key={declaration.id}
            declaration={declaration}
          />
        ))}
      </div>
    </section>
  );
};

export default PackageClassesSection;
