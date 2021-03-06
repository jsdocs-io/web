import { writeFileSync } from 'fs-extra';
import * as path from 'path';
import { prerenderedPackages } from '../src/data/prerendered-packages';
const format = require('xml-formatter');

main();

function main(): void {
    writeSitemapFile({ packages: prerenderedPackages });
    console.log('Done');
}

function writeSitemapFile({ packages }: { packages: string[] }): void {
    const sitemapFilepath = path.join(__dirname, '../public/sitemap.xml');

    const data = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
            <loc>https://www.jsdocs.io</loc>
        </url>
        <url>
            <loc>https://www.jsdocs.io/about</loc>
        </url>
        <url>
            <loc>https://www.jsdocs.io/guide</loc>
        </url>
        <url>
            <loc>https://www.jsdocs.io/sponsor</loc>
        </url>
        <url>
            <loc>https://www.jsdocs.io/credits</loc>
        </url>
        <url>
            <loc>https://www.jsdocs.io/privacy</loc>
        </url>

    ${packages
        .map((name) => {
            return `
            <url>
                <loc>https://www.jsdocs.io/package/${name}</loc>
            </url>`;
        })
        .join('')}
    </urlset>`;

    writeFileSync(sitemapFilepath, format(data, { collapseContent: true }));
}
