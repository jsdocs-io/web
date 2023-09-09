import InternalLink from "./InternalLink";

const PackageVersionsLink = ({
  name,
  title,
  children,
}: {
  name: string;
  title?: string;
  children: React.ReactNode;
}) => {
  return (
    <InternalLink href={`/package/${name}/versions`} title={title}>
      {children}
    </InternalLink>
  );
};

export default PackageVersionsLink;
