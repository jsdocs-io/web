export function packageId(pkg: string, subpath: string): string {
	// Assume subpath was already normalized.
	if (subpath === ".") return pkg;
	return `${pkg}/${subpath}`;
}
