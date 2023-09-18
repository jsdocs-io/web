import validate from 'validate-npm-package-name';

export const isValidPackageName = (name: string): boolean => {
	return validate(name).validForNewPackages;
};
