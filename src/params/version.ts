import type { ParamMatcher } from '@sveltejs/kit';
import validate from 'semver/functions/valid';

export const match: ParamMatcher = (version) => {
	// The version param is valid if the version `1.2.3` is a valid semver.
	return validate(version) !== null;
};
