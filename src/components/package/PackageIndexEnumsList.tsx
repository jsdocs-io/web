import { EnumDeclaration } from "@jsdocs-io/extractor";
import InternalLink from "../common/InternalLink";
import PackageIndexEnumMembersList from "./PackageIndexEnumMembersList";

const PackageIndexEnumsList = ({ enums }: { enums: EnumDeclaration[] }) => {
  return (
    <ul className="space-y-1">
      {enums.map(({ id, name, members }) => (
        <li key={id}>
          <details>
            <summary>
              <InternalLink href={`#${id}`} title={`Enum ${name}`}>
                {name}
              </InternalLink>
            </summary>

            <PackageIndexEnumMembersList members={members} />
          </details>
        </li>
      ))}
    </ul>
  );
};

export default PackageIndexEnumsList;
