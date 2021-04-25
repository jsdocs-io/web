import { writeFileSync } from 'fs-extra';
import * as path from 'path';
import { dedent } from 'ts-dedent';
import { prerenderedPackages } from '../src/data/prerendered-packages';

main();

function main(): void {
    writeRobotsTXTFile({ packages: prerenderedPackages });
    console.log('Done');
}

function writeRobotsTXTFile({ packages }: { packages: string[] }): void {
    const robotsTXTFilepath = path.join(__dirname, '../public/robots.txt');

    const data = dedent(`
        User-agent: SemrushBot
        Disallow: /

        User-agent: *
        ${packages
            .map((name) => `Allow: /package/${name}$`)
            .join('\n'.padEnd(9, ' '))}
        Disallow: /package/
        Crawl-Delay: 30

        Sitemap: https://www.jsdocs.io/sitemap.xml

    `);

    writeFileSync(robotsTXTFilepath, data);
}
