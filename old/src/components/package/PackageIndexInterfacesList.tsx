import { InterfaceDeclaration } from "@jsdocs-io/extractor";
import InternalLink from "../common/InternalLink";
import PackageIndexInterfaceMembersList from "./PackageIndexInterfaceMembersList";

const PackageIndexInterfacesList = ({
  interfaces,
}: {
  interfaces: InterfaceDeclaration[];
}) => {
  return (
    <ul className="space-y-1">
      {interfaces.map(({ id, name, members }) => (
        <li key={id}>
          <details>
            <summary>
              <InternalLink href={`#${id}`} title={`Interface ${name}`}>
                {name}
              </InternalLink>
            </summary>

            <PackageIndexInterfaceMembersList members={members} />
          </details>
        </li>
      ))}
    </ul>
  );
};

export default PackageIndexInterfacesList;
