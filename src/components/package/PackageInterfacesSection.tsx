import { InterfaceDeclaration } from "@jsdocs-io/extractor";
import React from "react";
import { PackageInterfaceDeclarationSections } from "./PackageInterfaceDeclarationSections";

export function PackageInterfacesSection({
  interfaces,
}: {
  interfaces: InterfaceDeclaration[];
}) {
  if (!interfaces.length) {
    return null;
  }

  return (
    <section className="space-y-4">
      <h2 id="package-interfaces">Interfaces</h2>

      <div className="space-y-8">
        {interfaces.map((declaration) => (
          <PackageInterfaceDeclarationSections
            key={declaration.id}
            declaration={declaration}
          />
        ))}
      </div>
    </section>
  );
}
