import { ClassDeclaration } from "@jsdocs-io/extractor";
import InternalLink from "../common/InternalLink";
import PackageIndexClassMembersList from "./PackageIndexClassMembersList";

const PackageIndexClassesList = ({
  classes,
}: {
  classes: ClassDeclaration[];
}) => {
  return (
    <ul className="space-y-1">
      {classes.map(({ id, name, members }) => (
        <li key={id}>
          <details>
            <summary>
              <InternalLink href={`#${id}`} title={`Class ${name}`}>
                {name}
              </InternalLink>
            </summary>

            <PackageIndexClassMembersList members={members} />
          </details>
        </li>
      ))}
    </ul>
  );
};

export default PackageIndexClassesList;
