const { execSync } = require(`child_process`);
const CHALK = require(`./chalk`);
const LOGGER = require(`./logger`);
const { getDirectoryName } = require(`./get-directory-name`);
const CONTEXT = `prepare-release`;

navigateToDocumentation();

execSync(`npm run generate-changelog`, {
  stdio: `inherit`,
});

navigateToRoot();

execSync(`npm run lint:other`, {
  stdio: `inherit`,
});

/**
 *
 */
function navigateToDocumentation() {
  LOGGER.debug(CONTEXT, CHALK.text(`Navigating to the documentation directory...`));
  LOGGER.debug(CONTEXT, CHALK.text(`The current directory is: ${process.cwd()}`));

  if (getDirectoryName(process.cwd()) === `scripts`) {
    process.chdir(`../documentation`);
    LOGGER.debug(CONTEXT, CHALK.text(`The new directory is: ${process.cwd()}`));
  } else {
    process.chdir(`documentation`);
    LOGGER.debug(CONTEXT, CHALK.text(`The new directory is: ${process.cwd()}`));
  }

  LOGGER.success(CONTEXT, CHALK.text(`Documentation directory navigation done`));
}

/**
 *
 */
function navigateToRoot() {
  LOGGER.debug(CONTEXT, CHALK.text(`Navigating to the root directory...`));
  LOGGER.debug(CONTEXT, CHALK.text(`The current directory is: ${process.cwd()}`));

  process.chdir(`..`);
  LOGGER.debug(CONTEXT, CHALK.text(`The new directory is: ${process.cwd()}`));

  LOGGER.success(CONTEXT, CHALK.text(`Root directory navigation done`));
}
