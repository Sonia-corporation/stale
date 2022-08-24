const config = require(`./docusaurus.core.config.js`);

config.clientModules = [require.resolve(`./src/modules/sentry.module.ts`)];

module.exports = config;
