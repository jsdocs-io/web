export type PackagePagePathOptions = {
	pkg: string;
	subpath: string;
};

export const packagePagePath = ({ pkg, subpath }: PackagePagePathOptions) =>
	["/package", pkg, ...(subpath !== "." ? [subpath] : [])].join("/");
