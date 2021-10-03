const { withSentryConfig } = require('@sentry/nextjs');
const { LicenseWebpackPlugin } = require('license-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');
const Visualizer = require('webpack-visualizer-plugin2');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

// Collect licensing information for OSS packages
const licensePlugin = new LicenseWebpackPlugin({
    outputFilename: 'oss-licenses.json',
    perChunkOutput: false,
    excludedPackageTest: (name) => {
        // Not real packages
        return [
            '@prism-react-renderer/duotoneDark',
            '@prism-react-renderer/prism',
        ].includes(name);
    },
    renderLicenses: (rawModules) => {
        const modules = rawModules.map((mod) => {
            // See `RawOSSLibrary` in `lib/get-oss-libraries.ts`
            return {
                name: mod.name,
                version: mod.packageJson.version,
                license: mod.licenseId,
                licenseText: mod.licenseText,
            };
        });

        return JSON.stringify(modules, null, 4);
    },
});

const statsPlugin = new StatsWriterPlugin({
    filename: 'stats.json',
    stats: {
        context: __dirname,
        assets: true,
        entrypoints: true,
        chunks: true,
        chunkModules: true,
        modules: true,
    },
});

const visualizerPlugin = new Visualizer();

const moduleExports = withBundleAnalyzer({
    webpack: (config, { isServer }) => {
        const isClient = !isServer;

        if (isClient) {
            config.plugins.push(licensePlugin);
        }

        config.plugins.push(statsPlugin);
        config.plugins.push(visualizerPlugin);

        return config;
    },
});

const SentryWebpackPluginOptions = {
    // Additional config options for the Sentry Webpack plugin. Keep in mind that
    // the following options are set automatically, and overriding them is not
    // recommended:
    //   release, url, org, project, authToken, configFile, stripPrefix,
    //   urlPrefix, include, ignore

    silent: true, // Suppresses all logs
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
