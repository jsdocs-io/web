export type PackageSlugPathOptions = {
	resolvedPkg: string;
	subpath: string;
};

export const packageSlugPath = ({
	resolvedPkg,
	subpath,
}: PackageSlugPathOptions) =>
	["/package", resolvedPkg, ...(subpath !== "." ? [subpath] : [])].join("/");
