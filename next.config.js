const { StatsWriterPlugin } = require('webpack-stats-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const LicensePlugin = require('webpack-license-plugin');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    webpack: (config, {}) => {
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

        config.plugins.push(new Visualizer());

        config.plugins.push(new LicensePlugin());

        return config;
    },
});
