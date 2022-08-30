# Stale

> _A GitHub action to stale and close automatically your issues and pull requests._

**Quality:**  
![GitHub last commit](https://img.shields.io/github/last-commit/sonia-corporation/stale?style=flat-square)
[![Maintainability](https://api.codeclimate.com/v1/badges/cb424a8e5fc5fe80b750/maintainability?style=flat-square)](https://codeclimate.com/github/Sonia-corporation/stale/maintainability)
[![CodeFactor](https://www.codefactor.io/repository/github/sonia-corporation/stale/badge)](https://www.codefactor.io/repository/github/sonia-corporation/stale)
[![DeepScan grade](https://deepscan.io/api/teams/10568/projects/19009/branches/480513/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=10568&pid=19009&bid=480513)
[![Test Coverage](https://api.codeclimate.com/v1/badges/cb424a8e5fc5fe80b750/test_coverage?style=flat-square)](https://codeclimate.com/github/Sonia-corporation/stale/test_coverage)
[![codecov](https://codecov.io/gh/Sonia-corporation/stale/branch/develop/graph/badge.svg?token=S4MUQF1TIY)](https://codecov.io/gh/Sonia-corporation/stale)
![GitHub issues](https://img.shields.io/github/issues-raw/sonia-corporation/stale?style=flat-square)
![GitHub pull requests](https://img.shields.io/github/issues-pr-raw/sonia-corporation/stale?style=flat-square)
[![Build](https://github.com/Sonia-corporation/stale/actions/workflows/build.yml/badge.svg?branch=develop&style=flat-square)](https://github.com/Sonia-corporation/stale/actions/workflows/build.yml)
[![Release](https://github.com/Sonia-corporation/stale/actions/workflows/release.yml/badge.svg?branch=master&style=flat-square)](https://github.com/Sonia-corporation/stale/actions/workflows/release.yml)
[![Stale](https://github.com/Sonia-corporation/stale/actions/workflows/stale-tester.yml/badge.svg?branch=develop&style=flat-square)](https://github.com/Sonia-corporation/stale/actions/workflows/stale-tester.yml)
![Dependencies](https://img.shields.io/david/sonia-corporation/stale?style=flat-square)
![Dev Dependencies](https://img.shields.io/david/dev/sonia-corporation/stale?style=flat-square)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)
[![sonia: changelog](https://img.shields.io/badge/sonia-changelog-eb7b9c?link=https://github.com/Sonia-corporation/conventional-changelog&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAABuUlEQVQokX2SPWhTURTH/+fk5qsvTRuMFa2JcXLQDlWQ6qKbi3bo4NIhtAURpENFUJwC3SxYSCukg+IHiAh2cncUFItLM4gSNDxr0mo1Mb743v1weiU+nz1wl8vvdw//cy4hpBauPbTSLcf91Rezhm2rXbU60dL9qW4vQ0Hpya1HlWQfn2Mx2B7KpTLrr+vO3n3Urq53L1xfnvnsc9wrlUolJkZs64t+eeJM/tjo6dzBVDr11XNNPTMQK+zaEQDKs+V47khh1eqPH9i0O/OTNydWgwyHiYPcPx5537C8t/UuNbbPr1xaiQYZEby4Pfc0mUFr4VRcHyIA3zSdfEWiBmB+VzFhnLMSlPczbChmi8xYkCMAWLxy77iMaJd0RO5hc+Ow0MWRmAIA1BXjnccfbY8mfGnuzvQaAwAJZccNNziqmhJqqWuw4UNZNugYfkNC2f7Z6fhXxssPhvNJtbY/wWkAMFK7H37jebE8PdnL/TPVq5Wi/UmKi9nxo0xjhUSzkH1Ra9FMkAtdh4CsOh1vWwiGknoz+N3+K84uTW21vjs/PamN66hm+OMhRSDzuPbsrlZ66EdbVsKYP2fUqYQOwTP+AAAAAElFTkSuQmCC&logoWidth=14&style=flat-square)](https://github.com/Sonia-corporation/conventional-changelog)
[![sonia: stale action](https://img.shields.io/badge/sonia-stale%20action-eb7b9c?link=https://github.com/Sonia-corporation/stale&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAABmJLR0QA/wD/AP+gvaeTAAABuUlEQVQokX2SPWhTURTH/+fk5qsvTRuMFa2JcXLQDlWQ6qKbi3bo4NIhtAURpENFUJwC3SxYSCukg+IHiAh2cncUFItLM4gSNDxr0mo1Mb743v1weiU+nz1wl8vvdw//cy4hpBauPbTSLcf91Rezhm2rXbU60dL9qW4vQ0Hpya1HlWQfn2Mx2B7KpTLrr+vO3n3Urq53L1xfnvnsc9wrlUolJkZs64t+eeJM/tjo6dzBVDr11XNNPTMQK+zaEQDKs+V47khh1eqPH9i0O/OTNydWgwyHiYPcPx5537C8t/UuNbbPr1xaiQYZEby4Pfc0mUFr4VRcHyIA3zSdfEWiBmB+VzFhnLMSlPczbChmi8xYkCMAWLxy77iMaJd0RO5hc+Ow0MWRmAIA1BXjnccfbY8mfGnuzvQaAwAJZccNNziqmhJqqWuw4UNZNugYfkNC2f7Z6fhXxssPhvNJtbY/wWkAMFK7H37jebE8PdnL/TPVq5Wi/UmKi9nxo0xjhUSzkH1Ra9FMkAtdh4CsOh1vWwiGknoz+N3+K84uTW21vjs/PamN66hm+OMhRSDzuPbsrlZ66EdbVsKYP2fUqYQOwTP+AAAAAElFTkSuQmCC&logoWidth=14&style=flat-square)](https://github.com/Sonia-corporation/stale)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

**Community:**

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

[![commitizen](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/)
[![PRs](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()

**Statistics:**  
![GitHub release (latest by date)](https://img.shields.io/github/v/release/sonia-corporation/stale?style=flat-square)
![GitHub top language](https://img.shields.io/github/languages/top/sonia-corporation/stale?style=flat-square)
![GitHub repo size](https://img.shields.io/github/repo-size/sonia-corporation/stale?style=flat-square)
![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/sonia-corporation/stale?style=flat-square)
![GitHub](https://img.shields.io/github/license/sonia-corporation/stale?style=flat-square)
[![](https://tokei.rs/b1/github/sonia-corporation/stale?category=files&style=flat-square)](https://github.com/sonia-corporation/stale)
[![](https://tokei.rs/b1/github/sonia-corporation/stale?category=lines&style=flat-square)](https://github.com/sonia-corporation/stale)
[![](https://tokei.rs/b1/github/sonia-corporation/stale?category=code&style=flat-square)](https://github.com/sonia-corporation/stale)
[![](https://tokei.rs/b1/github/sonia-corporation/stale?category=comments&style=flat-square)](https://github.com/sonia-corporation/stale)
[![](https://tokei.rs/b1/github/sonia-corporation/stale?category=blanks&style=flat-square)](https://github.com/sonia-corporation/stale)
[![](https://img.shields.io/npm/v/@sonia-corporation/stale?style=flat-square)](https://www.npmjs.com/package/@sonia-corporation/stale)
[![](https://img.shields.io/npm/dm/@sonia-corporation/stale?color=blue&style=flat-square)](https://www.npmjs.com/package/@sonia-corporation/stale)

## Documentation

To have in-depth documentation and examples, see the [documentation website](https://sonia-stale-action.vercel.app).  
The documentation website is also available as a [GitHub page,](https://sonia-corporation.github.io/stale/) but we deprecated it.

## Default configuration

### Issues

After 30 days (coming from [issue-days-before-stale](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-days-before-stale-input)) without any update on the issue, add a label `stale` (coming from [issue-stale-label](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-stale-label-input)) on the issue to indicate that it is stale.  
If an update occur after being stale, the `stale` label will be removed and the count will be reset back to 30 days.  
Removing the `stale` label manually will also do the trick.  
If the `stale` label on the issue is still here for more than 10 days (coming from [issue-days-before-close](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-days-before-close-input)), the issue will be closed.

### Pull requests

After 30 days (coming from [pull-request-days-before-stale](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-days-before-stale-input)) without any update on the pull request, add a label `stale` (coming from [pull-request-stale-label](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-stale-label-input)) on the pull request to indicate that it is stale.  
If an update occur after being stale, the `stale` label will be removed and the count will be reset back to 30 days.  
Removing the `stale` label manually will also do the trick.  
If the `stale` label on the pull request is still here for more than 10 days (coming from [pull-request-days-before-close](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-days-before-close-input)), the pull request will be closed.

## All the common inputs

All the inputs that are used both for issues and pull requests.

| Input                                                                         | Description                                                                                                                              | Default               |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| [github-token](https://sonia-stale-action.vercel.app/docs/github-token-input) | A GitHub token used to perform the API calls to GitHub through `@actions/github`. Usually `${{ secrets.GITHUB_TOKEN }}`.                 | `${{ github.token }}` |
| [dry-run](https://sonia-stale-action.vercel.app/docs/dry-run-input)           | A mode where any Data Manipulation Language will be skipped. Useful to debug safely and without risking messing up with your repository. | `false`               |

## All the issues inputs

| Input                                                                                                                                 | Description                                                                                                                                     | Default       |
| ------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| **Labels**                                                                                                                            |                                                                                                                                                 |               |
| [issue-stale-label](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-stale-label-input)                                 | The label that will be added to the issue when it is stale.                                                                                     | `stale`       |
| [issue-ignore-all-labels](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-ignore-all-labels-input)                     | Allow to ignore the processing of issues that contains any labels.                                                                              | `false`       |
| [issue-ignore-any-labels](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-ignore-any-labels-input)                     | Allow to ignore the processing of issues that contains one of those labels (multiline).                                                         |               |
| **Assignees**                                                                                                                         |                                                                                                                                                 |               |
| [issue-ignore-all-assignees](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-ignore-all-assignees-input)               | Allow to ignore the processing of issues that contains any assignees.                                                                           | `false`       |
| [issue-ignore-any-assignees](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-ignore-any-assignees-input)               | Allow to ignore the processing of issues that contains one of those assignees (multiline).                                                      |               |
| [issue-only-with-assignees](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-only-wih-assignees-input)                  | Only allow the processing of issues that contains at least one assignee.                                                                        | `false`       |
| [issue-only-any-assignees](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-only-any-assignees-input)                   | Only allow the processing of issues that contains one of those assignees (multiline).                                                           |               |
| **Project cards**                                                                                                                     |                                                                                                                                                 |               |
| [issue-ignore-all-project-cards](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-ignore-all-project-cards-input)       | Allow to ignore the processing of issues that contains any project cards.                                                                       | `false`       |
| [issue-ignore-any-project-cards](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-ignore-any-project-cards-input)       | Allow to ignore the processing of issues that contains one of those project cards (multiline).                                                  |               |
| [issue-only-with-project-cards](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-only-wih-project-cards-input)          | Only allow the processing of issues that contains at least one project card.                                                                    | `false`       |
| [issue-only-any-project-cards](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-only-any-project-cards-input)           | Only allow the processing of issues that contains one of those project cards (multiline).                                                       |               |
| **Milestones**                                                                                                                        |                                                                                                                                                 |               |
| [issue-ignore-all-milestones](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-ignore-all-milestones-input)             | Allow to ignore the processing of issues that contains any milestones.                                                                          | `false`       |
| [issue-ignore-any-milestones](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-ignore-any-milestones-input)             | Allow to ignore the processing of issues that contains one of those milestones (multiline).                                                     |               |
| [issue-only-with-milestones](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-only-wih-milestones-input)                | Only allow the processing of issues that contains at least one milestone.                                                                       | `false`       |
| [issue-only-any-milestones](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-only-any-milestones-input)                 | Only allow the processing of issues that contains one of those milestones (multiline).                                                          |               |
| **Comments**                                                                                                                          |                                                                                                                                                 |               |
| [issue-stale-comment](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-stale-comment-input)                             | The comment that will be sent once the issue is stale (keep empty to not send a comment).                                                       |               |
| [issue-close-comment](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-close-comment-input)                             | The comment that will be sent once the issue is close (keep empty to not send a comment).                                                       |               |
| **Durations**                                                                                                                         |                                                                                                                                                 |               |
| [issue-days-before-stale](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-days-before-stale-input)                     | The number of days until the issue is considered as stale.                                                                                      | `30`          |
| [issue-days-before-close](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-days-before-close-input)                     | The number of days until a stale issue is considered as closed.                                                                                 | `10`          |
| **Limiters**                                                                                                                          |                                                                                                                                                 |               |
| [issue-limit-api-queries-count](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-limit-api-queries-count-input)         | Limit the quantity of API queries calls performed during the processing of issues (`-1` for unlimited).                                         | `-1`          |
| [issue-limit-api-mutations-count](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-limit-api-mutations-count-input)     | Limit the quantity of API mutations calls performed during the processing of issues (`-1` for unlimited).                                       | `-1`          |
| [issue-ignore-before-creation-date](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-ignore-before-creation-date-input) | Allow to ignore the processing of issues that were created before this date ([ISO 8601](https://moment.github.io/luxon/#/parsing?id=iso-8601)). |               |
| **Others**                                                                                                                            |                                                                                                                                                 |               |
| [issue-processing](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-processing-input)                                   | Allow to process the issues.                                                                                                                    | `true`        |
| [issue-close-reason](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-close-reason-input)                               | The reason when closing an issue (`completed` or `not planned`).                                                                                | `not planned` |
| [issue-add-labels-after-stale](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-add-labels-after-stale-input)           | A list of labels added when the processing stale the issue (multiline).                                                                         |               |
| [issue-remove-labels-after-stale](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-remove-labels-after-stale-input)     | A list of labels removed when the processing stale the issue (multiline).                                                                       |               |
| [issue-add-labels-after-close](https://sonia-stale-action.vercel.app/docs/issues/inputs/issue-add-labels-after-close-input)           | A list of labels added when the processing close the issue (multiline).                                                                         |               |

## All the issues outputs

| Output                                                                                                                                  | Description                                                                 |
| --------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| [processed-issues-count](https://sonia-stale-action.vercel.app/docs/issues/outputs/processed-issues-count-output)                       | The number of issues processed.                                             |
| [ignored-issues-count](https://sonia-stale-action.vercel.app/docs/issues/outputs/ignored-issues-count-output)                           | The number of issues ignored.                                               |
| [unaltered-issues-count](https://sonia-stale-action.vercel.app/docs/issues/outputs/unaltered-issues-count-output)                       | The number of issues unaltered (either not good to stale or already stale). |
| [stale-issues-count](https://sonia-stale-action.vercel.app/docs/issues/outputs/stale-issues-count-output)                               | The number of issues stale.                                                 |
| [already-stale-issues-count](https://sonia-stale-action.vercel.app/docs/issues/outputs/already-stale-issues-count-output)               | The number of issues processed which were already stale.                    |
| [remove-stale-issues-count](https://sonia-stale-action.vercel.app/docs/issues/outputs/remove-stale-issues-count-output)                 | The number of issues from where the stale state was removed.                |
| [close-issues-count](https://sonia-stale-action.vercel.app/docs/issues/outputs/close-issues-count-output)                               | The number of issues closed.                                                |
| [added-issues-comments-count](https://sonia-stale-action.vercel.app/docs/issues/outputs/added-issues-comments-count-output)             | The number of added issues comments.                                        |
| [issues-labels-count](https://sonia-stale-action.vercel.app/docs/issues/outputs/issues-labels-count-output)                             | The number of mutated issues labels (added or removed).                     |
| [added-issues-labels-count](https://sonia-stale-action.vercel.app/docs/issues/outputs/added-issues-labels-count-output)                 | The number of added issues labels.                                          |
| [removed-issues-labels-count](https://sonia-stale-action.vercel.app/docs/issues/outputs/removed-issues-labels-count-output)             | The number of removed issues labels.                                        |
| [called-api-issues-count](https://sonia-stale-action.vercel.app/docs/issues/outputs/called-api-issues-count-output)                     | The number of GitHub API calls performed for the issues.                    |
| [called-api-issues-queries-count](https://sonia-stale-action.vercel.app/docs/issues/outputs/called-api-issues-queries-count-output)     | The number of GitHub API queries calls performed for the issues.            |
| [called-api-issues-mutations-count](https://sonia-stale-action.vercel.app/docs/issues/outputs/called-api-issues-mutations-count-output) | The number of GitHub API mutations calls performed for the issues.          |

## All the pull requests inputs

| Input                                                                                                                                                      | Description                                                                                                                                            | Default       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| **Labels**                                                                                                                                                 |                                                                                                                                                        |               |
| [pull-request-stale-label](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-stale-label-input)                                 | The label that will be added to the pull request when it is stale.                                                                                     | `stale`       |
| [pull-request-ignore-all-labels](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-ignore-all-labels-input)                     | Allow to ignore the processing of pull requests that contains any labels.                                                                              | `false`       |
| [pull-request-ignore-any-labels](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-ignore-any-labels-input)                     | Allow to ignore the processing of pull requests that contains one of those labels (multiline).                                                         |               |
| **Assignees**                                                                                                                                              |                                                                                                                                                        |               |
| [pull-request-ignore-all-assignees](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-ignore-all-assignees-input)               | Allow to ignore the processing of pull requests that contains any assignees.                                                                           | `false`       |
| [pull-request-ignore-any-assignees](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-ignore-any-assignees-input)               | Allow to ignore the processing of pull requests that contains one of those assignees (multiline).                                                      |               |
| [pull-request-only-with-assignees](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-only-with-assignees-input)                 | Only allow the processing of pull requests that contains at least one assignee.                                                                        | `false`       |
| [pull-request-only-any-assignees](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-only-any-assignees-input)                   | Only allow the processing of pull requests that contains one of those assignees (multiline).                                                           |               |
| **Project cards**                                                                                                                                          |                                                                                                                                                        |               |
| [pull-request-ignore-all-project-cards](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-ignore-all-project-cards-input)       | Allow to ignore the processing of pull requests that contains any project cards.                                                                       | `false`       |
| [pull-request-ignore-any-project-cards](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-ignore-any-project-cards-input)       | Allow to ignore the processing of pull requests that contains one of those project cards (multiline).                                                  |               |
| [pull-request-only-with-project-cards](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-only-with-project-cards-input)         | Only allow the processing of pull requests that contains at least one project card.                                                                    | `false`       |
| [pull-request-only-any-project-cards](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-only-any-project-cards-input)           | Only allow the processing of pull requests that contains one of those project cards (multiline).                                                       |               |
| **Milestones**                                                                                                                                             |                                                                                                                                                        |               |
| [pull-request-ignore-all-milestones](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-ignore-all-milestones-input)             | Allow to ignore the processing of pull requests that contains any milestones.                                                                          | `false`       |
| [pull-request-ignore-any-milestones](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-ignore-any-milestones-input)             | Allow to ignore the processing of pull requests that contains one of those milestones (multiline).                                                     |               |
| [pull-request-only-with-milestones](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-only-with-milestones-input)               | Only allow the processing of pull requests that contains at least one milestone.                                                                       | `false`       |
| [pull-request-only-any-milestones](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-only-any-milestones-input)                 | Only allow the processing of pull requests that contains one of those milestones (multiline).                                                          |               |
| **Comments**                                                                                                                                               |                                                                                                                                                        |               |
| [pull-request-stale-comment](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-stale-comment-input)                             | The comment that will be sent once the pull request is stale (keep empty to not send a comment).                                                       |               |
| [pull-request-close-comment](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-close-comment-input)                             | The comment that will be sent once the pull request is close (keep empty to not send a comment).                                                       |               |
| **Durations**                                                                                                                                              |                                                                                                                                                        |               |
| [pull-request-days-before-stale](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-days-before-stale-input)                     | The number of days until the pull request is considered as stale.                                                                                      | `30`          |
| [pull-request-days-before-close](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-days-before-close-input)                     | The number of days until a stale pull request is considered as closed.                                                                                 | `10`          |
| **Limiters**                                                                                                                                               |                                                                                                                                                        |               |
| [pull-request-limit-api-queries-count](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-limit-api-queries-count-input)         | Limit the quantity of API queries calls performed during the processing of pull requests (`-1` for unlimited).                                         | `-1`          |
| [pull-request-limit-api-mutations-count](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-limit-api-mutations-count-input)     | Limit the quantity of API mutations calls performed during the processing of pull requests (`-1` for unlimited).                                       | `-1`          |
| [pull-request-ignore-before-creation-date](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-ignore-before-creation-date-input) | Allow to ignore the processing of pull requests that were created before this date ([ISO 8601](https://moment.github.io/luxon/#/parsing?id=iso-8601)). |               |
| [pull-request-ignore-draft](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-ignore-draft-input)                               | Allow to ignore the processing of pull requests that are drafts.                                                                                       | `false`       |
| **Others**                                                                                                                                                 |                                                                                                                                                        |
| [pull-request-processing](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-processing-input)                                   | Allow to process the pull requests.                                                                                                                    | `true`        |
| [pull-request-close-reason](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-close-reason-input)                               | The reason when closing a pull request (`completed`' or `not planned`').                                                                               | `not planned` |
| [pull-request-add-labels-after-stale](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-add-labels-after-stale-input)           | A list of labels added when the processing stale the pull request (multiline).                                                                         |               |
| [pull-request-remove-labels-after-stale](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-remove-labels-after-stale-input)     | A list of labels removed when the processing stale the pull request (multiline).                                                                       |               |
| [pull-request-add-labels-after-close](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-add-labels-after-close-input)           | A list of labels added when the processing close the pull request (multiline).                                                                         |               |
| [pull-request-to-draft-instead-of-stale](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-to-draft-instead-of-stale-input)     | Convert the pull request to a draft pull request instead of handling it as a stale candidate.                                                          | `false`       |
| [pull-request-delete-branch-after-close](https://sonia-stale-action.vercel.app/docs/pull-requests/inputs/pull-request-delete-branch-after-close-input)     | Delete the branch when the processing close the pull request.                                                                                          | `false`       |

## All the pull requests outputs

| Output                                                                                                                                                       | Description                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| [processed-pull-requests-count](https://sonia-stale-action.vercel.app/docs/pull-requests/outputs/processed-pull-requests-count-output)                       | The number of pull requests processed.                                             |
| [ignored-pull-requests-count](https://sonia-stale-action.vercel.app/docs/pull-requests/outputs/ignored-pull-requests-count-output)                           | The number of pull requests ignored.                                               |
| [unaltered-pull-requests-count](https://sonia-stale-action.vercel.app/docs/pull-requests/outputs/unaltered-pull-requests-count-output)                       | The number of pull requests unaltered (either not good to stale or already stale). |
| [stale-pull-requests-count](https://sonia-stale-action.vercel.app/docs/pull-requests/outputs/stale-pull-requests-count-output)                               | The number of pull requests stale.                                                 |
| [already-stale-pull-requests-count](https://sonia-stale-action.vercel.app/docs/pull-requests/outputs/already-stale-pull-requests-count-output)               | The number of pull requests processed which were already stale.                    |
| [remove-stale-pull-requests-count](https://sonia-stale-action.vercel.app/docs/pull-requests/outputs/remove-stale-pull-requests-count-output)                 | The number of pull requests from where the stale state was removed.                |
| [close-pull-requests-count](https://sonia-stale-action.vercel.app/docs/pull-requests/outputs/close-pull-requests-count-output)                               | The number of pull requests closed.                                                |
| [deleted-pull-requests-branches-count](https://sonia-stale-action.vercel.app/docs/pull-requests/outputs/deleted-pull-requests-branches-count-output)         | The number of deleted pull requests branches closed.                               |
| [added-pull-requests-comments-count](https://sonia-stale-action.vercel.app/docs/pull-requests/outputs/added-pull-requests-comments-count-output)             | The number of added pull requests comments.                                        |
| [pull-requests-labels-count](https://sonia-stale-action.vercel.app/docs/pull-requests/outputs/pull-requests-labels-count-output)                             | The number of mutated pull requests labels (added or removed).                     |
| [added-pull-requests-labels-count](https://sonia-stale-action.vercel.app/docs/pull-requests/outputs/added-pull-requests-labels-count-output)                 | The number of added pull requests labels.                                          |
| [removed-pull-requests-labels-count](https://sonia-stale-action.vercel.app/docs/pull-requests/outputs/removed-pull-requests-labels-count-output)             | The number of removed pull requests labels.                                        |
| [draft-pull-requests-count](https://sonia-stale-action.vercel.app/docs/pull-requests/outputs/draft-pull-requests-count-output)                               | The number of pull requests converted to draft.                                    |
| [called-api-pull-requests-count](https://sonia-stale-action.vercel.app/docs/pull-requests/outputs/called-api-pull-requests-count-output)                     | The number of GitHub API calls performed for the pull requests.                    |
| [called-api-pull-requests-queries-count](https://sonia-stale-action.vercel.app/docs/pull-requests/outputs/called-api-pull-requests-queries-count-output)     | The number of GitHub API queries calls performed for the pull requests.            |
| [called-api-pull-requests-mutations-count](https://sonia-stale-action.vercel.app/docs/pull-requests/outputs/called-api-pull-requests-mutations-count-output) | The number of GitHub API mutations calls performed for the pull requests.          |

## Examples

Checkout the [documentation](https://sonia-stale-action.vercel.app/docs/introduction) to have some examples.

## Changelog

See all the changes on the [website](https://sonia-stale-action.vercel.app/docs/changelog).

## Contributing

Check out the [contributing](CONTRIBUTING.md) file before helping us.

## License

This project is licensed under the MIT License - see the [license](LICENSE) for details.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://allcontributors.org"><img src="https://avatars1.githubusercontent.com/u/46410174?v=4?s=80" width="80px;" alt=""/><br /><sub><b>All Contributors</b></sub></a><br /><a href="https://github.com/Sonia-corporation/stale/commits?author=all-contributors" title="Documentation">📖</a> <a href="#tool-all-contributors" title="Tools">🔧</a></td>
    <td align="center"><a href="https://www.codefactor.io"><img src="https://avatars0.githubusercontent.com/u/13309880?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Automated code reviews</b></sub></a><br /><a href="https://github.com/Sonia-corporation/stale/pulls?q=is%3Apr+reviewed-by%3Acode-factor" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/Sonia-corporation/stale/issues?q=author%3Acode-factor" title="Bug reports">🐛</a></td>
    <td align="center"><a href="http://www.geoffreytestelin.com/"><img src="https://avatars2.githubusercontent.com/u/10194542?s=460&v=4?s=80" width="80px;" alt=""/><br /><sub><b>Geoffrey 'C0ZEN' Testelin</b></sub></a><br /><a href="https://github.com/Sonia-corporation/stale/commits?author=C0ZEN" title="Code">💻</a> <a href="#design-C0ZEN" title="Design">🎨</a> <a href="#infra-C0ZEN" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#ideas-C0ZEN" title="Ideas, Planning, & Feedback">🤔</a> <a href="#blog-C0ZEN" title="Blogposts">📝</a> <a href="https://github.com/Sonia-corporation/stale/commits?author=C0ZEN" title="Documentation">📖</a> <a href="#tool-C0ZEN" title="Tools">🔧</a> <a href="#security-C0ZEN" title="Security">🛡️</a> <a href="https://github.com/Sonia-corporation/stale/pulls?q=is%3Apr+reviewed-by%3AC0ZEN" title="Reviewed Pull Requests">👀</a> <a href="#question-C0ZEN" title="Answering Questions">💬</a> <a href="#maintenance-C0ZEN" title="Maintenance">🚧</a> <a href="https://github.com/Sonia-corporation/stale/issues?q=author%3AC0ZEN" title="Bug reports">🐛</a> <a href="#example-C0ZEN" title="Examples">💡</a> <a href="#projectManagement-C0ZEN" title="Project Management">📆</a> <a href="https://github.com/Sonia-corporation/stale/commits?author=C0ZEN" title="Tests">⚠️</a> <a href="#translation-C0ZEN" title="Translation">🌍</a> <a href="#tutorial-C0ZEN" title="Tutorials">✅</a></td>
    <td align="center"><a href="https://orangesquash.org.uk/"><img src="https://avatars.githubusercontent.com/u/321014?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Iain Lane</b></sub></a><br /><a href="https://github.com/Sonia-corporation/stale/issues?q=author%3Aiainlane" title="Bug reports">🐛</a> <a href="#ideas-iainlane" title="Ideas, Planning, & Feedback">🤔</a></td>
    <td align="center"><a href="http://semantic-release.org/"><img src="https://avatars1.githubusercontent.com/u/32174276?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Semantic Release Bot</b></sub></a><br /><a href="https://github.com/Sonia-corporation/stale/commits?author=semantic-release-bot" title="Documentation">📖</a> <a href="#tool-semantic-release-bot" title="Tools">🔧</a> <a href="#security-semantic-release-bot" title="Security">🛡️</a></td>
    <td align="center"><a href="https://github.com/Sonia-corporation-bot"><img src="https://avatars.githubusercontent.com/u/99146817?v=4?s=80" width="80px;" alt=""/><br /><sub><b>Sonia Corporation Bot</b></sub></a><br /><a href="https://github.com/Sonia-corporation/stale/commits?author=Sonia-corporation-bot" title="Documentation">📖</a> <a href="#infra-Sonia-corporation-bot" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#projectManagement-Sonia-corporation-bot" title="Project Management">📆</a> <a href="#security-Sonia-corporation-bot" title="Security">🛡️</a> <a href="#tool-Sonia-corporation-bot" title="Tools">🔧</a></td>
    <td align="center"><a href="https://renovate.whitesourcesoftware.com"><img src="https://avatars0.githubusercontent.com/u/25180681?v=4?s=80" width="80px;" alt=""/><br /><sub><b>WhiteSource Renovate</b></sub></a><br /><a href="#tool-renovate-bot" title="Tools">🔧</a> <a href="#security-renovate-bot" title="Security">🛡️</a></td>
  </tr>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.  
Contributions of any kind are welcome!

## Related project

[Geoffrey 'C0ZEN' Testelin](https://github.com/C0ZEN) was originally a contributor of [@actions/stale](https://github.com/actions/stale) (see the [contributors](https://github.com/actions/stale/graphs/contributors)).  
Due to slower cadence and different opinions over how the project should go forward, he decided to start from scratch on his own.  
The main difference is that this project aims to provide the best stale action as possible based on consumers needs, even if it may be hard to provide such features. #noLimit - we do what we can to have an amazing stale action ;)
