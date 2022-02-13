// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

/**
 * @description
 * Return the Jest configuration for a given project
 * @param {Readonly<string>} type The project type
 * @returns {Object} The Jest configuration
 */
const createProject = (type) => {
  return {
    // All imported modules in your tests should be mocked automatically
    automock: false,

    // Stop running tests after `n` failures
    bail: false,

    // Respect "browser" field in package.json when resolving modules
    // browser: false,

    cache: true,

    // The directory where Jest should store its cached dependency information
    cacheDirectory: `./.cache-jest`,

    // Automatically clear mock calls and instances between every test
    clearMocks: true,

    // Indicates whether the coverage information should be collected while executing the test
    collectCoverage: false,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    collectCoverageFrom: [`src/**`, `tests/**`, `!tests/utils/**`],

    // The directory where Jest should output its coverage files
    coverageDirectory: `coverage`,

    // An array of regexp pattern strings used to skip coverage collection
    // coveragePathIgnorePatterns: [
    //   "\\\\node_modules\\\\"
    // ],

    // A list of reporter names that Jest uses when writing coverage reports
    coverageReporters: [`json`, `text-summary`, `lcov`],

    // An object that configures minimum threshold enforcement for coverage results
    // coverageThreshold: undefined,

    // A path to a custom dependency extractor
    // dependencyExtractor: undefined,

    displayName: {
      color: getProjectColor(type),
      name: type,
    },

    // Make calling deprecated APIs throw helpful error messages
    errorOnDeprecated: true,

    // Force coverage collection from ignored files using an array of glob patterns
    // forceCoverageMatch: [],

    // A path to a module which exports an async function that is triggered once before all test suites
    // globalSetup: undefined,

    // A path to a module which exports an async function that is triggered once after all test suites
    // globalTeardown: undefined,

    // A set of global variables that need to be available in all test environments
    globals: {
      'ts-jest': {
        compiler: `ttypescript`,
      },
    },

    maxConcurrency: 5,

    // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
    maxWorkers: `50%`,

    // An array of directory names to be searched recursively up from the requiring module's location
    moduleDirectories: [`./node_modules`],

    // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
    // modulePathIgnorePatterns: [],

    // An array of file extensions your modules use
    moduleFileExtensions: [`js`, `ts`, `tsx`],

    // A map from regular expressions to module names that allow to stub out resources with a single module
    moduleNameMapper: {
      '@core/(.*)': `<rootDir>/src/core/$1`,
      '@github/(.*)': `<rootDir>/src/github/$1`,
      '@tests/(.*)': `<rootDir>/tests/$1`,
      '@utils/(.*)': `<rootDir>/src/utils/$1`,
    },

    // Activates notifications for test results
    notify: true,

    // An enum that specifies notification mode. Requires { notify: true }
    notifyMode: `failure-change`,

    // Run tests from one or more projects
    // projects: undefined,

    // A preset that is used as a base for Jest's configuration
    preset: `ts-jest/presets/js-with-ts`,

    prettierPath: `prettier`,

    // Use this configuration option to add custom reporters to Jest
    reporters: [
      [
        `jest-silent-reporter`,
        {
          showPaths: true,
          showWarnings: true,
          useDots: true,
        },
      ],
    ],

    // Automatically reset mock state between every test
    resetMocks: true,

    // A path to a custom resolver
    // resolver: undefined,

    // Reset the module registry before running each individual test
    resetModules: false,

    // The root directory that Jest should scan for tests and modules within
    // rootDir: undefined,

    // Automatically restore mock state between every test
    restoreMocks: true,

    // Allows you to use a custom runner instead of Jest's default test runner
    // runner: "jest-runner",

    // A list of paths to directories that Jest should use to search for files in
    roots: [`./src`, `./scripts`, `./tests`],

    // The paths to modules that run some code to configure or set up the testing environment before each test
    setupFiles: [`./jest/config.ts`, `./jest/${type}/config.ts`],

    // A list of paths to snapshot serializer modules Jest should use for snapshot testing
    // snapshotSerializers: [],

    // A list of paths to modules that run some code to configure or set up the testing framework before each test
    setupFilesAfterEnv: [`jest-extended/all`],

    // Prevent tests from printing messages through the console
    silent: true,

    // The test environment that will be used for testing
    testEnvironment: `node`,

    // Options that will be passed to the testEnvironment
    // testEnvironmentOptions: {},

    // Adds a location field to test results
    // testLocationInResults: false,

    // The glob patterns Jest uses to detect test files
    testMatch: getTestMatch(type),

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    // testPathIgnorePatterns: [
    //   "\\\\node_modules\\\\"
    // ],

    // The regexp pattern or array of patterns that Jest uses to detect test files
    // testRegex: [],

    // This option allows the use of a custom results processor
    // testResultsProcessor: undefined,

    // This option allows use of a custom test runner
    // testRunner: "jasmine2",

    // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
    // testURL: "http://localhost",

    testTimeout: 5000,

    // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
    timers: `fake`,

    // A map from regular expressions to paths to transformers
    transform: {
      '^.+\\.ts?$': `ts-jest`,
    },

    // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
    transformIgnorePatterns: [`node_modules/(?!terminal-link)/`],

    // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
    // unmockedModulePathPatterns: undefined,

    // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
    // watchPathIgnorePatterns: [],

    // Indicates whether each individual test should be reported during the run
    verbose: true,

    // Whether to use watchman for file crawling
    watchman: true,
  };
};

/**
 * @param {Readonly<string>} type The project type
 * @returns {string[]} A list of test match
 */
function getTestMatch(type) {
  return {
    'integration-issues': [
      `<rootDir>/tests/issues/**/*.spec.ts`,
      `<rootDir>/tests/issues/**/*.spec.tsx`,
      `<rootDir>/tests/issues/**/*.spec.js`,
    ],
    'integration-issues-ci': [
      `<rootDir>/tests/issues/**/*.spec.ts`,
      `<rootDir>/tests/issues/**/*.spec.tsx`,
      `<rootDir>/tests/issues/**/*.spec.js`,
    ],
    'integration-pull-requests': [
      `<rootDir>/tests/pull-requests/**/*.spec.ts`,
      `<rootDir>/tests/pull-requests/**/*.spec.tsx`,
      `<rootDir>/tests/pull-requests/**/*.spec.js`,
    ],
    'integration-pull-requests-ci': [
      `<rootDir>/tests/pull-requests/**/*.spec.ts`,
      `<rootDir>/tests/pull-requests/**/*.spec.tsx`,
      `<rootDir>/tests/pull-requests/**/*.spec.js`,
    ],
    'unit': [`<rootDir>/src/**/*.spec.ts`, `<rootDir>/src/**/*.spec.tsx`, `<rootDir>/src/**/*.spec.js`],
    'unit-ci': [`<rootDir>/src/**/*.spec.ts`, `<rootDir>/src/**/*.spec.tsx`, `<rootDir>/src/**/*.spec.js`],
  }[type];
}

/**
 * @param {Readonly<string>} type The project type
 * @returns {string} The color of the project
 */
function getProjectColor(type) {
  return {
    'integration-issues': `red`,
    'integration-issues-ci': `red`,
    'integration-pull-requests': `blue`,
    'integration-pull-requests-ci': `blue`,
    'unit': `green`,
    'unit-ci': `green`,
  }[type];
}

module.exports = {
  projects: [
    createProject(`integration-issues`),
    createProject(`integration-issues-ci`),
    createProject(`integration-pull-requests`),
    createProject(`integration-pull-requests-ci`),
    createProject(`unit`),
    createProject(`unit-ci`),
  ],
};
