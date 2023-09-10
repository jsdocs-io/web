import type { ParamMatcher } from '@sveltejs/kit';
import validate from 'validate-npm-package-name';

export const match: ParamMatcher = (param) => {
	// Remove trailing slash if present and validate package name.
	const name = param.replace(/\/$/, '');
	return validate(name).validForNewPackages;
};
