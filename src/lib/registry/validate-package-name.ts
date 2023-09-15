import validate from 'validate-npm-package-name';

export const validatePackageName = (name: string) => {
	return validate(name).validForNewPackages;
};
