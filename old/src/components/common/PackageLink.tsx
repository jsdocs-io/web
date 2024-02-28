import InternalLink from "./InternalLink";

const PackageLink = ({
  name,
  version,
  declarationID,
  title,
  children,
}: {
  name: string;
  version?: string;
  declarationID?: string;
  title?: string;
  children: React.ReactNode;
}) => {
  const packageBaseRoute = version
    ? `/package/${name}/v/${version}`
    : `/package/${name}`;

  const packageRoute = declarationID
    ? `${packageBaseRoute}#${declarationID}`
    : packageBaseRoute;

  return (
    <InternalLink href={packageRoute} title={title}>
      {children}
    </InternalLink>
  );
};

export default PackageLink;
