const CHALK = require(`./chalk`);
const FS = require(`fs-extra`);
const LOGGER = require(`./logger`);
// eslint-disable-next-line @typescript-eslint/naming-convention
const _ = require(`lodash`);
const { getDirectoryName } = require(`./get-directory-name`);
const CONTEXT = `generate-changelog`;
const { execSync } = require(`child_process`);

/**
 * @description
 * Update the content of the documentation changelog with the original changelog
 * @returns {Promise<void>}
 */
async function initialize() {
  LOGGER.debug(CONTEXT, CHALK.text(`Generating the documentation changelog...`));

  navigateToRoot();

  const originalChangelog = await loadOriginalChangelog();
  const documentationChangelog = await loadDocumentationChangelog();

  await mergeOriginalIntoDocumentationChangelog(originalChangelog, documentationChangelog);

  LOGGER.debug(CONTEXT, CHALK.text(`Linting the documentation changelog...`));
  execSync(`npm run lint:other:this -- documentation/docs/12-changelog.md`, {
    stdio: `inherit`,
  });
  LOGGER.success(CONTEXT, CHALK.text(`Documentation changelog linted`));

  navigateToDocumentation();

  LOGGER.debug(CONTEXT, CHALK.text(`Writing headers for the documentation changelog...`));
  execSync(`npm run write-heading-ids:changelog`, {
    stdio: `inherit`,
  });
  LOGGER.success(CONTEXT, CHALK.text(`Headers writing for the documentation changelog done`));

  LOGGER.success(CONTEXT, CHALK.text(`Documentation changelog generated`));
}

/**
 * @description
 * Load the current original changelog
 * @returns {Promise<string>} The content of the original changelog
 */
async function loadOriginalChangelog() {
  LOGGER.debug(CONTEXT, CHALK.text(`Loading the original changelog...`));

  const changelog = await FS.readFile(`CHANGELOG.md`, `utf-8`);

  LOGGER.success(CONTEXT, CHALK.text(`Original changelog loaded`));

  return changelog;
}

/**
 * @description
 * Load the current documentation changelog
 * @returns {Promise<string>} The content of the documentation changelog
 */
async function loadDocumentationChangelog() {
  LOGGER.debug(CONTEXT, CHALK.text(`Loading the documentation changelog...`));

  const changelog = await FS.readFile(`documentation/docs/12-changelog.md`, `utf-8`);

  LOGGER.success(CONTEXT, CHALK.text(`Documentation changelog loaded`));

  return changelog;
}

/**
 * @description
 * Replace the documentation changelog content with the given content
 * @param {Readonly<string>} content The content of the new documentation changelog to use
 * @returns {Promise<void>}
 */
async function updateDocumentationChangelog(content) {
  LOGGER.debug(CONTEXT, CHALK.text(`Updating the documentation changelog...`));

  await FS.writeFile(`documentation/docs/12-changelog.md`, content);

  LOGGER.success(CONTEXT, CHALK.text(`Documentation changelog updated`));
}

/**
 * @description
 * Merge the original changelog into the documentation changelog
 * More specifically, the front matter will be kept and the rest will be erased
 * @param {Readonly<string>} originalChangelog The original changelog
 * @param {Readonly<string>} documentationChangelog The current documentation changelog
 * @returns {Promise<void>}
 */
async function mergeOriginalIntoDocumentationChangelog(originalChangelog, documentationChangelog) {
  LOGGER.debug(CONTEXT, CHALK.text(`Merging the original into the documentation changelog...`));

  documentationChangelog = replaceDocumentationChangelogContent(originalChangelog, documentationChangelog);
  await updateDocumentationChangelog(documentationChangelog);

  LOGGER.success(CONTEXT, CHALK.text(`Original changelog merged into the documentation changelog`));
}

/**
 * @description
 * Extract the front matter from the documentation changelog
 * Then prepend the front matter to the original changelog
 * Then return the whole
 * @param {Readonly<string>} originalChangelog The original changelog
 * @param {Readonly<string>} documentationChangelog The current documentation changelog
 * @returns {string} The updated documentation changelog
 */
function replaceDocumentationChangelogContent(originalChangelog, documentationChangelog) {
  LOGGER.debug(CONTEXT, CHALK.text(`Replacing the content of the documentation changelog...`));

  const frontMatter = getFrontMatter(documentationChangelog);
  let newContent = `${frontMatter}${originalChangelog}`;

  newContent = replaceTitle(newContent);

  LOGGER.success(CONTEXT, CHALK.text(`Documentation changelog content replaced`));

  return newContent;
}

/**
 *  @description
 *  Extract the front matter from the documentation changelog
 * @param {Readonly<string>} documentationChangelog The current documentation changelog
 * @returns {string} The front matter
 */
function getFrontMatter(documentationChangelog) {
  LOGGER.debug(CONTEXT, CHALK.text(`Extracting the front matter from the documentation changelog...`));

  const documentationChangelogPieces = documentationChangelog.split(`---`);
  const frontMatter = `---${documentationChangelogPieces[1]}---\n\n`;

  LOGGER.success(CONTEXT, CHALK.text(`Documentation changelog front matter extracted`));
  console.debug(frontMatter);

  return frontMatter;
}

/**
 * @param {Readonly<string>} content The updated documentation changelog
 * @returns {string} The documentation changelog with a new title
 */
function replaceTitle(content) {
  LOGGER.debug(CONTEXT, CHALK.text(`Replacing the title of the documentation changelog to "Changelog"...`));
  const newContent = _.replace(content, `# Sonia stale action`, `# Changelog`);

  LOGGER.success(CONTEXT, CHALK.text(`Documentation changelog title replaced to "Changelog"`));

  return newContent;
}

/**
 *
 */
function navigateToRoot() {
  LOGGER.debug(CONTEXT, CHALK.text(`Navigating to the root directory...`));
  LOGGER.debug(CONTEXT, CHALK.text(`The current directory is: ${process.cwd()}`));

  if (getDirectoryName(process.cwd()) === `scripts`) {
    process.chdir(`../..`);
    LOGGER.debug(CONTEXT, CHALK.text(`The new directory is: ${process.cwd()}`));
  } else if (getDirectoryName(process.cwd()) === `documentation`) {
    process.chdir(`..`);
    LOGGER.debug(CONTEXT, CHALK.text(`The new directory is: ${process.cwd()}`));
  }

  LOGGER.success(CONTEXT, CHALK.text(`Root directory navigation done`));
}

/**
 *
 */
function navigateToDocumentation() {
  LOGGER.debug(CONTEXT, CHALK.text(`Navigating to the documentation directory...`));
  LOGGER.debug(CONTEXT, CHALK.text(`The current directory is: ${process.cwd()}`));

  process.chdir(`documentation`);
  LOGGER.debug(CONTEXT, CHALK.text(`The new directory is: ${process.cwd()}`));

  LOGGER.success(CONTEXT, CHALK.text(`Documentation directory navigation done`));
}

initialize().catch((error) => {
  LOGGER.error(CONTEXT, CHALK.error(error));

  process.exit(1);
});
