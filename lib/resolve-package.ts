export type ResolvePackageOptions = {
	pkgName: string;
	packages: string[];
};

export const resolvePackage = ({ pkgName, packages }: ResolvePackageOptions) =>
	// For the given package name (e.g., `foo`), find the corresponding installed
	// version ID (e.g., `foo@1.0.0`) in the list of installed packages.
	packages.find((p) => p.startsWith(`${pkgName}@`))!;
