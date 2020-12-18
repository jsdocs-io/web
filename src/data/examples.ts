export const exampleOverview = `
/**
 * This is the package overview, denoted by the \`@packageDocumentation\` tag at the end.
 *
 * In this first section, you can provide a quick summary of your package.
 *
 * @remarks
 * In the remarks section, you can expand on important concepts.
 *
 * Inside documentation comments, you can use all the features supported by the
 * {@link https://github.com/microsoft/tsdoc | TSDoc standard} such as:
 *
 * @example
 * Links:
 * {@link https://www.example.com}
 *
 * Links with custom text:
 * {@link https://www.example.com | Example.com}
 *
 * Links to declarations in your own package:
 * {@link someFunction},
 * {@link SomeClass.someMethod | someMethod from SomeClass}
 *
 * Links to declarations in other packages:
 * {@link short-time-ago#timeAgo | timeAgo function from package \`short-time-ago\`}
 *
 * @example
 * Inline code:
 * \`ENV_VAR=true\`
 *
 * @example
 * Code blocks:
 * \`\`\`typescript
 * // someFile.ts
 *
 * const foo = 42;
 * \`\`\`
 *
 * @see {@link https://github.com/microsoft/tsdoc | TSDoc repository} for the standard
 * @see {@link https://microsoft.github.io/tsdoc | TSDoc playground} for more examples
 *
 * @packageDocumentation
 */`;

export const exampleOverviewFile = `
// index.ts

${exampleOverview}`.trim();

export const exampleDeclarationDoc = `
/**
 * \`sum\` returns the sum of two numbers.
 *
 * @param a - the first number
 * @param b - the second number
 * @returns the sum of a and b
 *
 * @example
 * Usage:
 * \`\`\`typescript
 * import { sum } from 'foo';
 *
 * // Output: \`5\`
 * console.log(sum(2, 3));
 * \`\`\`
 *
 * @see {@link https://en.wikipedia.org/wiki/Addition | Addition on Wikipedia}
 */`;

export const exampleDeclarationFile = `
// index.ts

${exampleDeclarationDoc}
export function sum(a: number, b: number): number {
    return a + b;
}`.trim();

export const exampleDeclarationSignature =
    'sum: (a: number, b: number) => number;';

export const examplePackageJSONRepository = `
// package.json

{
    ...,
    "repository": {
        "type": "git",
        "url": "https://github.com/username/repository.git"
    },
    ...
}`.trim();

export const examplePackageJSONRepositoryWithDirectory = `
// package.json

{
    ...,
    "repository": {
        "type": "git",
        "url": "https://github.com/username/repository.git",
        "directory": "path/to/dir/containing/your/package"
    },
    ...
}`.trim();

export const exampleProjectStructure = `
├── src
│   └── index.ts
├── dist
│   ├── index.js
│   └── index.d.ts
└── package.json
`.trim();

export const examplePackageJSONFiles = `
// package.json

{
    ...,
    "files": [
        "src",
        "dist"
    ],
    ...
}`.trim();

export const exampleIndexFile = `
// index.ts

// Re-export declarations from another module
export * from './other-module';

// Direct export
export const name = 'foo';`.trim();
