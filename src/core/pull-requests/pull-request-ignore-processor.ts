import { EInputs } from '@core/inputs/inputs.enum';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestProcessor } from '@core/pull-requests/pull-request-processor';
import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { GithubApiPullRequestsService } from '@github/api/pull-requests/github-api-pull-requests.service';
import { getDuplicates } from '@utils/arrays/get-duplicates';
import { isDateMoreRecent } from '@utils/dates/is-date-more-recent';
import { iso8601ToDatetime } from '@utils/dates/iso-8601-to-datetime';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';
import { DateTime } from 'luxon';

/**
 * @description
 * The processor to ignore a pull request
 */
export class PullRequestIgnoreProcessor {
  public readonly pullRequestProcessor: PullRequestProcessor;

  public constructor(pullRequestProcessor: Readonly<PullRequestProcessor>) {
    this.pullRequestProcessor = pullRequestProcessor;
  }

  public shouldIgnore(): boolean {
    this.pullRequestProcessor.logger.info(`Checking if this pull request should be ignored...`);

    return (
      this.isLocked$$() ||
      this.hasAllIgnoredLabels$$() ||
      this.hasAnyIgnoredLabels$$() ||
      this.hasAllIgnoredAssignees$$() ||
      this.hasAnyIgnoredAssignees$$() ||
      this.hasAllIgnoredProjectCards$$() ||
      this.hasIgnoredCreationDate$$()
    );
  }

  public isLocked$$(): boolean {
    this.pullRequestProcessor.logger.info(`Checking if this pull request is locked...`);

    if (this.pullRequestProcessor.githubPullRequest.locked) {
      this.pullRequestProcessor.logger.info(`Locked`);
      this.pullRequestProcessor.logger.debug(`We do not process locked pull-requests; it is in the name: locked`);

      return true;
    }

    this.pullRequestProcessor.logger.info(`Not locked. Continuing...`);

    return false;
  }

  public hasAllIgnoredAssignees$$(): boolean {
    this.pullRequestProcessor.logger.info(`Checking if all the assignees on this pull request should be ignored...`);

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInputs();

    if (!pullRequestsInputs.pullRequestIgnoreAllAssignees) {
      this.pullRequestProcessor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_IGNORE_ALL_ASSIGNEES),
        LoggerFormatService.whiteBright(`is disabled. Continuing...`)
      );

      return false;
    }

    this.pullRequestProcessor.logger.info(
      `The input`,
      LoggerService.input(EInputs.PULL_REQUEST_IGNORE_ALL_ASSIGNEES),
      LoggerFormatService.whiteBright(`is enabled. Checking...`)
    );

    if (this.pullRequestProcessor.githubPullRequest.assignees.totalCount > 0) {
      this.pullRequestProcessor.logger.info(
        `The pull request has`,
        LoggerService.value(this.pullRequestProcessor.githubPullRequest.assignees.totalCount),
        LoggerFormatService.whiteBright(
          `assignee${this.pullRequestProcessor.githubPullRequest.assignees.totalCount > 1 ? `s` : ``}`
        )
      );

      return true;
    }

    this.pullRequestProcessor.logger.info(`The pull request has no assignee. Continuing...`);

    return false;
  }

  public hasAllIgnoredProjectCards$$(): boolean {
    this.pullRequestProcessor.logger.info(
      `Checking if all the project cards on this pull request should be ignored...`
    );

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInputs();

    if (!pullRequestsInputs.pullRequestIgnoreAllProjectCards) {
      this.pullRequestProcessor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_IGNORE_ALL_PROJECT_CARDS),
        LoggerFormatService.whiteBright(`is disabled. Continuing...`)
      );

      return false;
    }

    this.pullRequestProcessor.logger.info(
      `The input`,
      LoggerService.input(EInputs.PULL_REQUEST_IGNORE_ALL_PROJECT_CARDS),
      LoggerFormatService.whiteBright(`is enabled. Checking...`)
    );

    if (this.pullRequestProcessor.githubPullRequest.projectCards.totalCount > 0) {
      this.pullRequestProcessor.logger.info(
        `The pull request has`,
        LoggerService.value(this.pullRequestProcessor.githubPullRequest.projectCards.totalCount),
        LoggerFormatService.whiteBright(
          `project card${this.pullRequestProcessor.githubPullRequest.projectCards.totalCount > 1 ? `s` : ``}`
        )
      );

      return true;
    }

    this.pullRequestProcessor.logger.info(`The pull request has no project card. Continuing...`);

    return false;
  }

  public hasIgnoredCreationDate$$(): boolean {
    this.pullRequestProcessor.logger.info(
      `Checking if this pull request should be ignored based on its creation date...`
    );
    let pullRequestIgnoreBeforeCreationDate: DateTime;
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInputs();

    try {
      pullRequestIgnoreBeforeCreationDate = iso8601ToDatetime(pullRequestsInputs.pullRequestIgnoreBeforeCreationDate);
    } catch (error) {
      this.pullRequestProcessor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_IGNORE_BEFORE_CREATION_DATE),
        LoggerFormatService.whiteBright(`is either unset or not convertible to a valid ISO 8601 date. Continuing...`)
      );

      return false;
    }

    const createdAt: DateTime = this.pullRequestProcessor.getCreatedAt();

    this.pullRequestProcessor.logger.info(`The pull request was created the`, LoggerService.date(createdAt));
    this.pullRequestProcessor.logger.info(
      `The minimal processing creation date is set to the`,
      LoggerService.date(pullRequestIgnoreBeforeCreationDate)
    );

    if (isDateMoreRecent(createdAt, pullRequestIgnoreBeforeCreationDate)) {
      this.pullRequestProcessor.logger.info(
        `The pull request was created after the minimal processing creation date. Continuing...`
      );

      return false;
    }

    this.pullRequestProcessor.logger.info(`The pull request was created before the minimal processing creation date`);

    return true;
  }

  public hasAllIgnoredLabels$$(): boolean {
    this.pullRequestProcessor.logger.info(`Checking if all the labels on this pull request should be ignored...`);

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInputs();

    if (!pullRequestsInputs.pullRequestIgnoreAllLabels) {
      this.pullRequestProcessor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_IGNORE_ALL_LABELS),
        LoggerFormatService.whiteBright(`is disabled. Continuing...`)
      );

      return false;
    }

    this.pullRequestProcessor.logger.info(
      `The input`,
      LoggerService.input(EInputs.PULL_REQUEST_IGNORE_ALL_LABELS),
      LoggerFormatService.whiteBright(`is enabled. Checking...`)
    );

    const staleLabel: string = pullRequestsInputs.pullRequestStaleLabel;
    const allLabels: string[] = this._getLabels(this.pullRequestProcessor.githubPullRequest.labels.nodes).filter(
      (label: Readonly<string>): boolean => label !== staleLabel
    );

    if (allLabels.length > 0) {
      this.pullRequestProcessor.logger.info(
        `The pull request has`,
        LoggerService.value(allLabels.length),
        LoggerFormatService.whiteBright(`label${allLabels.length > 1 ? `s` : ``}`)
      );

      return true;
    }

    this.pullRequestProcessor.logger.info(`The pull request has no label. Continuing...`);

    return false;
  }

  public hasAnyIgnoredLabels$$(): boolean {
    this.pullRequestProcessor.logger.info(`Checking if this pull request has one of the ignored labels...`);

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInputs();
    const duplicatedLabels: string[] = getDuplicates(
      this._getLabels(this.pullRequestProcessor.githubPullRequest.labels.nodes),
      pullRequestsInputs.pullRequestIgnoreAnyLabels
    );
    const firstDuplicatedLabel: string | undefined = _.head(duplicatedLabels);

    if (!_.isUndefined(firstDuplicatedLabel)) {
      this.pullRequestProcessor.logger.info(
        `Containing one of the ignored labels`,
        LoggerFormatService.white(`->`),
        LoggerService.value(firstDuplicatedLabel)
      );

      return true;
    }

    this.pullRequestProcessor.logger.debug(
      `Note: in case of pull request, we may need to use a RegExp to ignore sensitivity`
    );

    // @todo handle the pagination
    const { totalCount } = this.pullRequestProcessor.githubPullRequest.labels;

    if (totalCount > GithubApiPullRequestsService.labelsPerPullRequest) {
      this.pullRequestProcessor.logger.warning(
        `Found`,
        LoggerService.value(_.toString(totalCount)),
        LoggerFormatService.whiteBright(
          `label${
            totalCount > 1 ? `s` : ``
          } attached on this pull request. The pagination support is not yet implemented and may cause a mismatch!`
        )
      );
    }

    this.pullRequestProcessor.logger.info(`Not containing an ignored label. Continuing...`);

    return false;
  }

  public hasAnyIgnoredAssignees$$(): boolean {
    this.pullRequestProcessor.logger.info(`Checking if this pull request has one of the ignored assignees...`);

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInputs();
    const duplicatedAssignees: string[] = getDuplicates(
      this._getAssignees(this.pullRequestProcessor.githubPullRequest.assignees.nodes),
      pullRequestsInputs.pullRequestIgnoreAnyAssignees
    );
    const firstDuplicatedAssignee: string | undefined = _.head(duplicatedAssignees);

    if (!_.isUndefined(firstDuplicatedAssignee)) {
      this.pullRequestProcessor.logger.info(
        `Containing one of the ignored assignees`,
        LoggerFormatService.white(`->`),
        LoggerService.value(firstDuplicatedAssignee)
      );

      return true;
    }

    this.pullRequestProcessor.logger.debug(
      `Note: in case of pull request, we may need to use a RegExp to ignore sensitivity`
    );

    // @todo handle the pagination
    const { totalCount } = this.pullRequestProcessor.githubPullRequest.assignees;

    if (totalCount > GithubApiPullRequestsService.assigneesPerPullRequest) {
      this.pullRequestProcessor.logger.warning(
        `Found`,
        LoggerService.value(_.toString(totalCount)),
        LoggerFormatService.whiteBright(
          `assignee${
            totalCount > 1 ? `s` : ``
          } attached on this pull request. The pagination support is not yet implemented and may cause a mismatch!`
        )
      );
    }

    this.pullRequestProcessor.logger.info(`Not containing an ignored assignee. Continuing...`);

    return false;
  }

  private _getLabels(labels: ReadonlyArray<IGithubApiLabel>): string[] {
    return _.map(labels, (label: Readonly<IGithubApiLabel>): string => label.name);
  }

  private _getAssignees(assignees: ReadonlyArray<IGithubApiAssignee>): string[] {
    return _.map(assignees, (assignee: Readonly<IGithubApiAssignee>): string => assignee.login);
  }
}
