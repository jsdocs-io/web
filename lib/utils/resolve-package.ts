export function resolvePackage(pkgName: string, packages: string[]): string {
	// For the given package name (e.g., `foo`), find the corresponding installed
	// version ID (e.g., `foo@1.0.0`) in the list of installed packages.
	return packages.find((pkg) => pkg.startsWith(`${pkgName}@`))!;
}
