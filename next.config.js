const { StatsWriterPlugin } = require('webpack-stats-plugin');
const Visualizer = require('webpack-visualizer-plugin');

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

        return config;
    },
});
