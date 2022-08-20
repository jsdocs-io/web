import { EnumMemberDeclaration } from "@jsdocs-io/extractor";
import InternalLink from "../common/InternalLink";

const PackageIndexEnumMembersList = ({
  members,
}: {
  members: EnumMemberDeclaration[];
}) => {
  if (!members.length) {
    return null;
  }

  return (
    <ul className="py-1 pl-4 ml-5 border-l border-stone-300 dark:border-stone-700">
      {members.map(({ id, name }) => (
        <li key={id}>
          <InternalLink href={`#${id}`} title={`Enum member ${name}`}>
            {name}
          </InternalLink>
        </li>
      ))}
    </ul>
  );
};

export default PackageIndexEnumMembersList;
