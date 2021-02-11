import { hasPackageDeclarations } from '../../src/lib/has-package-declarations';

describe('hasPackageDeclarations', () => {
    it('returns false if API is undefined', () => {
        expect(hasPackageDeclarations({})).toBeFalsy();
        expect(hasPackageDeclarations({ api: undefined })).toBeFalsy();
    });

    it('returns false if API has no declarations', () => {
        expect(
            hasPackageDeclarations({
                api: {
                    declarations: {} as any,
                } as any,
            })
        ).toBeFalsy();

        expect(
            hasPackageDeclarations({
                api: {
                    overview: '/** Foo */',
                    declarations: {
                        variables: [],
                        functions: [],
                        classes: [],
                        interfaces: [],
                        enums: [],
                        typeAliases: [],
                        namespaces: [],
                    },
                    files: [{ filename: 'index.d.ts' }],
                },
            })
        ).toBeFalsy();
    });

    it('returns true if API has some declarations', () => {
        expect(
            hasPackageDeclarations({
                api: {
                    overview: '/** Foo */',
                    declarations: {
                        variables: [{ id: 'foo' } as any],
                        functions: [],
                        classes: [],
                        interfaces: [],
                        enums: [],
                        typeAliases: [],
                        namespaces: [],
                    },
                    files: [{ filename: 'index.d.ts' }],
                },
            })
        ).toBeTruthy();
    });
});
