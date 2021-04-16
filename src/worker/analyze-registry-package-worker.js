const { analyzeRegistryPackage } = require('@jsdocs-io/extractor');

module.exports = async ({ name, version }) => {
    return analyzeRegistryPackage({ name, version });
};
