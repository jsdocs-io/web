export const isValidLicense = (s = "") => {
	// See https://docs.npmjs.com/cli/v10/configuring-npm/package-json#license
	const license = s.toLowerCase();
	return license && license !== "unlicensed" && !license.startsWith("see ");
};
