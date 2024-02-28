import { TypeAliasDeclaration } from "@jsdocs-io/extractor";
import InternalLink from "../common/InternalLink";

const PackageIndexTypeAliasesList = ({
  typeAliases,
}: {
  typeAliases: TypeAliasDeclaration[];
}) => {
  return (
    <ul className="space-y-1">
      {typeAliases.map(({ id, name }) => (
        <li key={id}>
          <InternalLink href={`#${id}`} title={`Type alias ${name}`}>
            {name}
          </InternalLink>
        </li>
      ))}
    </ul>
  );
};

export default PackageIndexTypeAliasesList;
