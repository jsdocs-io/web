import { isRepositoryFile } from '../../src/lib/is-repository-file';

describe('isRepositoryFile', () => {
    it('should return true for files without known git-ignored prefixes', () => {
        expect(isRepositoryFile({ filename: 'foo.ts' })).toBe(true);
        expect(isRepositoryFile({ filename: 'some/dir/bar.ts' })).toBe(true);
        expect(isRepositoryFile({ filename: 'baz.d.ts' })).toBe(true);
    });

    it('should return false for files with known git-ignored prefixes', () => {
        expect(isRepositoryFile({ filename: 'dist/foo.d.ts' })).toBe(false);
        expect(isRepositoryFile({ filename: 'out/foo.d.ts' })).toBe(false);
        expect(isRepositoryFile({ filename: 'build/foo.d.ts' })).toBe(false);
    });
});
