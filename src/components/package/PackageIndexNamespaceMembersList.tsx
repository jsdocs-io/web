import { Declaration, ModuleDeclarations } from "@jsdocs-io/extractor";
import getDeclarationKindDescription from "../../lib/get-declaration-kind-description";
import isCallableDeclarationKind from "../../lib/is-callable-declaration-kind";
import sortByID from "../../lib/sort-by-id";
import InternalLink from "../common/InternalLink";

const PackageIndexNamespaceMembersList = ({
  declarations,
}: {
  declarations: ModuleDeclarations;
}) => {
  const allDeclarations = Object.values(declarations).flat() as Declaration[];
  const members = sortByID(allDeclarations);

  return (
    <ul className="py-1 pl-4 ml-5 border-l border-gray-300 dark:border-gray-700">
      {members.map(({ id, name, kind }) => (
        <li key={`${id}-${kind}`}>
          <InternalLink
            href={`#${id}`}
            title={`${getDeclarationKindDescription({
              kind,
            })} ${name}`}
          >
            {name}
            {isCallableDeclarationKind({ kind }) && "()"}
          </InternalLink>
        </li>
      ))}
    </ul>
  );
};

export default PackageIndexNamespaceMembersList;
