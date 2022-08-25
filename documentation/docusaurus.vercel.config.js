const config = require(`./docusaurus.core.config.js`);

config.clientModules = [require.resolve(`./src/modules/sentry.module.ts`)];
config.url = `https://sonia-stale-action.vercel.app`;

module.exports = config;
