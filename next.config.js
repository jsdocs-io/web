const { StatsWriterPlugin } = require('webpack-stats-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const LicensePlugin = require('webpack-license-plugin');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    webpack: (config, {}) => {
        // Webpack stats
        config.plugins.push(
            new StatsWriterPlugin({
                filename: 'stats.json',
                stats: {
                    context: __dirname,
                    assets: true,
                    entrypoints: true,
                    chunks: true,
                    chunkModules: true,
                    modules: true,
                },
            })
        );

        // Webpack stats visualizer
        config.plugins.push(new Visualizer());

        // OSS packages in webpack bundles
        config.plugins.push(new LicensePlugin());

        return config;
    },
});
