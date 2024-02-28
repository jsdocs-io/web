import { FunctionDeclaration } from "@jsdocs-io/extractor";
import InternalLink from "../common/InternalLink";

const PackageIndexFunctionsList = ({
  functions,
}: {
  functions: FunctionDeclaration[];
}) => {
  return (
    <ul className="space-y-1">
      {functions.map(({ id, name }) => (
        <li key={id}>
          <InternalLink href={`#${id}`} title={`Function ${name}`}>
            {`${name}()`}
          </InternalLink>
        </li>
      ))}
    </ul>
  );
};

export default PackageIndexFunctionsList;
