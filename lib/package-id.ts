export type PackageIdOptions = {
	pkg: string;
	subpath: string;
};

export const packageId = ({ pkg, subpath }: PackageIdOptions) =>
	[pkg, ...(subpath !== "." ? [subpath] : [])].join("/");
