import { VariableDeclaration } from "@jsdocs-io/extractor";
import InternalLink from "../common/InternalLink";

const PackageIndexVariablesList = ({
  variables,
}: {
  variables: VariableDeclaration[];
}) => {
  return (
    <ul className="space-y-1">
      {variables.map(({ id, name }) => (
        <li key={id}>
          <InternalLink href={`#${id}`} title={`Variable ${name}`}>
            {name}
          </InternalLink>
        </li>
      ))}
    </ul>
  );
};

export default PackageIndexVariablesList;
