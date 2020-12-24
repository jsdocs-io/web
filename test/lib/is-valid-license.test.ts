import { isValidLicense } from '../../src/lib/is-valid-license';

describe('isValidLicense', () => {
    it('returns false for invalid licenses', () => {
        expect(isValidLicense({})).toBeFalsy();
        expect(isValidLicense({ license: undefined })).toBeFalsy();

        // UNLICENSED
        expect(isValidLicense({ license: 'UNLICENSED' })).toBeFalsy();
        expect(isValidLicense({ license: 'UNlicensed' })).toBeFalsy();
        expect(isValidLicense({ license: 'unlicensed' })).toBeFalsy();

        expect(isValidLicense({ license: 'SEE ' })).toBeFalsy();
        expect(isValidLicense({ license: 'SEE LICENSE IN ...' })).toBeFalsy();
        expect(isValidLicense({ license: 'see ' })).toBeFalsy();
        expect(isValidLicense({ license: 'see license' })).toBeFalsy();
        expect(isValidLicense({ license: 'see license in ...' })).toBeFalsy();
    });

    it('returns true for valid licenses', () => {
        expect(isValidLicense({ license: 'MIT' })).toBeTruthy();
        expect(isValidLicense({ license: 'Apache-2.0' })).toBeTruthy();

        // unlicense.org license
        expect(isValidLicense({ license: 'Unlicense' })).toBeTruthy();
        expect(isValidLicense({ license: 'unlicense' })).toBeTruthy();
    });
});
