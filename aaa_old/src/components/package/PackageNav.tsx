import PackageNavDocsResourcesList from "./PackageNavDocsResourcesList";
import PackageNavExternalResourcesList from "./PackageNavExternalResourcesList";
import PackageNavPackagesList from "./PackageNavPackagesList";

const PackageNav = ({
  name,
  definitelyTypedName,
  untypedName,
  repositoryURL,
  hasDocs = false,
}: {
  name: string;
  definitelyTypedName?: string;
  untypedName?: string;
  repositoryURL?: string;
  hasDocs?: boolean;
}) => {
  return (
    <div className="p-4 space-y-2 border border-stone-300 rounded dark:border-stone-700">
      <PackageNavPackagesList
        name={name}
        definitelyTypedName={definitelyTypedName}
        untypedName={untypedName}
      />

      <PackageNavExternalResourcesList
        name={name}
        repositoryURL={repositoryURL}
      />

      <PackageNavDocsResourcesList name={name} hasDocs={hasDocs} />
    </div>
  );
};

export default PackageNav;
