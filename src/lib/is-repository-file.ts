/**
 * isRepositoryFile checks if the given filename may belong in a repository.
 *
 * In other words, it checks that the filename is not in directories
 * that are usually git-ignored.
 */
export function isRepositoryFile({ filename }: { filename: string }): boolean {
    return !(
        filename.startsWith('dist/') ||
        filename.startsWith('out/') ||
        filename.startsWith('build/')
    );
}
