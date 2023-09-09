import type { ParamMatcher } from '@sveltejs/kit';
import validate from 'validate-npm-package-name';

export const match: ParamMatcher = (scope) => {
	// The scope param is valid if the package name `@some-scope/a` is also valid.
	return validate(`${scope}/a`).validForNewPackages;
};
