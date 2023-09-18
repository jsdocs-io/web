import { isValidPackageName } from '$lib/registry/is-valid-package-name';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param) => {
	// Remove trailing slash if present and validate package name.
	const name = param.replace(/\/$/, '');
	return isValidPackageName(name);
};
