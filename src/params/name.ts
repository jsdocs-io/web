import type { ParamMatcher } from '@sveltejs/kit';
import validate from 'validate-npm-package-name';

export const match: ParamMatcher = (name) => {
	// The name param is valid if the package name `some-name` or `@a/some-name` is also valid.
	return validate(name).validForNewPackages || validate(`@a/${name}`).validForNewPackages;
};
