import { NamespaceDeclaration } from "@jsdocs-io/extractor";
import InternalLink from "../common/InternalLink";
import PackageIndexNamespaceMembersList from "./PackageIndexNamespaceMembersList";

const PackageIndexNamespacesList = ({
  namespaces,
}: {
  namespaces: NamespaceDeclaration[];
}) => {
  return (
    <ul className="space-y-1">
      {namespaces.map(({ id, name, declarations }) => (
        <li key={id}>
          <details>
            <summary>
              <InternalLink href={`#${id}`} title={`Namespace ${name}`}>
                {name}
              </InternalLink>
            </summary>

            <PackageIndexNamespaceMembersList declarations={declarations} />
          </details>
        </li>
      ))}
    </ul>
  );
};

export default PackageIndexNamespacesList;
