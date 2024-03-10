export type PackagePagePathOptions = {
	resolvedPkg: string;
	subpath: string;
};

export const packagePagePath = ({ resolvedPkg, subpath }: PackagePagePathOptions) =>
	["/package", resolvedPkg, ...(subpath !== "." ? [subpath] : [])].join("/");
