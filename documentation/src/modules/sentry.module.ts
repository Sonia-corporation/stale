// eslint-disable-next-line import/no-unresolved
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import * as Sentry from '@sentry/browser';

console.debug(`Sentry module initialized`);

if (ExecutionEnvironment.canUseDOM) {
  console.debug(`Initializing Sentry...`);

  Sentry.init({
    dsn: `https://3e75b18963924b688011fda3e2b75f4e@o1376500.ingest.sentry.io/6685609`,
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: 1.0,
  });

  console.debug(`Sentry initialized`);
}
