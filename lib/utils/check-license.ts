export function checkLicense(license = "") {
	// See https://docs.npmjs.com/cli/v10/configuring-npm/package-json#license
	license = license.trim().toLowerCase();
	if (!license) throw new Error("no license");
	if (license.startsWith("unlicense")) throw new Error("unlicensed");
	if (license.startsWith("see ")) throw new Error("external license");
}
