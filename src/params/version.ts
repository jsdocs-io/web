import type { ParamMatcher } from '@sveltejs/kit';
import validate from 'semver/functions/valid';

export const match: ParamMatcher = (param) => {
	// Validate semver version.
	const version = validate(param);
	return version !== null;
};
