import { ClassMemberDeclarations } from "@jsdocs-io/extractor";
import getDeclarationKindDescription from "../../lib/get-declaration-kind-description";
import isCallableDeclarationKind from "../../lib/is-callable-declaration-kind";
import sortByID from "../../lib/sort-by-id";
import InternalLink from "../common/InternalLink";

const PackageIndexClassMembersList = ({
  members: rawMembers,
}: {
  members: ClassMemberDeclarations;
}) => {
  const { properties, methods } = rawMembers;
  const members = sortByID([...properties, ...methods]);
  if (!members.length) {
    return null;
  }

  return (
    <ul className="py-1 pl-4 ml-5 border-l border-stone-300 dark:border-stone-700">
      {members.map(({ id, name, kind }) => (
        <li key={id}>
          <InternalLink
            href={`#${id}`}
            title={`Class ${getDeclarationKindDescription({
              kind,
            }).toLowerCase()} ${name}`}
          >
            {name}
            {isCallableDeclarationKind({ kind }) && "()"}
          </InternalLink>
        </li>
      ))}
    </ul>
  );
};

export default PackageIndexClassMembersList;
