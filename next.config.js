const { LicenseWebpackPlugin } = require("license-webpack-plugin");
const { StatsWriterPlugin } = require("webpack-stats-plugin");
const Visualizer = require("webpack-visualizer-plugin2");

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

// Collect licensing information for OSS packages
const licensePlugin = new LicenseWebpackPlugin({
  outputFilename: "oss-licenses.json",
  perChunkOutput: false,
  excludedPackageTest: (name) => {
    // Not real packages
    return [
      "@prism-react-renderer/duotoneDark",
      "@prism-react-renderer/prism",
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
  filename: "stats.json",
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

module.exports = withBundleAnalyzer({
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
