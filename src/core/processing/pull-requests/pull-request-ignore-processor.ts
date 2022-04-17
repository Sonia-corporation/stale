import { EInputs } from '@core/inputs/inputs.enum';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { AbstractIgnoreProcessor } from '@core/processing/abstract-ignore-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { GithubApiPullRequestsService } from '@github/api/pull-requests/github-api-pull-requests.service';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationWarningPullRequest } from '@utils/annotations/enums/annotation-warning-pull-request.enum';
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
export class PullRequestIgnoreProcessor extends AbstractIgnoreProcessor<PullRequestProcessor> {
  public constructor(pullRequestProcessor: PullRequestProcessor) {
    super(pullRequestProcessor);
  }

  public shouldIgnore(): boolean {
    return super.shouldIgnore() || this.isDraft$$();
  }

  public hasAllIgnoredAssignees$$(): boolean {
    this.processor.logger.info(`Checking if all the assignees on this pull request should be ignored...`);

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    if (!pullRequestsInputs.pullRequestIgnoreAllAssignees) {
      this.processor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_IGNORE_ALL_ASSIGNEES),
        LoggerFormatService.whiteBright(`is disabled. Continuing...`)
      );

      return false;
    }

    this.processor.logger.info(
      `The input`,
      LoggerService.input(EInputs.PULL_REQUEST_IGNORE_ALL_ASSIGNEES),
      LoggerFormatService.whiteBright(`is enabled. Checking...`)
    );

    if (this.processor.item.assignees.totalCount > 0) {
      this.processor.logger.info(
        `The pull request has`,
        LoggerService.value(this.processor.item.assignees.totalCount),
        LoggerFormatService.whiteBright(`assignee${this.processor.item.assignees.totalCount > 1 ? `s` : ``}`)
      );

      return true;
    }

    this.processor.logger.info(`The pull request has no assignee. Continuing...`);

    return false;
  }

  public hasAllIgnoredProjectCards$$(): boolean {
    this.processor.logger.info(`Checking if all the project cards on this pull request should be ignored...`);

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    if (!pullRequestsInputs.pullRequestIgnoreAllProjectCards) {
      this.processor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_IGNORE_ALL_PROJECT_CARDS),
        LoggerFormatService.whiteBright(`is disabled. Continuing...`)
      );

      return false;
    }

    this.processor.logger.info(
      `The input`,
      LoggerService.input(EInputs.PULL_REQUEST_IGNORE_ALL_PROJECT_CARDS),
      LoggerFormatService.whiteBright(`is enabled. Checking...`)
    );

    if (this.processor.item.projectCards.totalCount > 0) {
      this.processor.logger.info(
        `The pull request has`,
        LoggerService.value(this.processor.item.projectCards.totalCount),
        LoggerFormatService.whiteBright(`project card${this.processor.item.projectCards.totalCount > 1 ? `s` : ``}`)
      );

      return true;
    }

    this.processor.logger.info(`The pull request has no project card. Continuing...`);

    return false;
  }

  public hasIgnoredCreationDate$$(): boolean {
    this.processor.logger.info(`Checking if this pull request should be ignored based on its creation date...`);
    let pullRequestIgnoreBeforeCreationDate: DateTime;
    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    try {
      pullRequestIgnoreBeforeCreationDate = iso8601ToDatetime(pullRequestsInputs.pullRequestIgnoreBeforeCreationDate);
    } catch (error) {
      this.processor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_IGNORE_BEFORE_CREATION_DATE),
        LoggerFormatService.whiteBright(`is either unset or not convertible to a valid ISO 8601 date. Continuing...`)
      );

      return false;
    }

    const createdAt: DateTime = this.processor.getCreatedAt();

    this.processor.logger.info(`The pull request was created the`, LoggerService.date(createdAt));
    this.processor.logger.info(
      `The minimal processing creation date is set to the`,
      LoggerService.date(pullRequestIgnoreBeforeCreationDate)
    );

    if (isDateMoreRecent(createdAt, pullRequestIgnoreBeforeCreationDate)) {
      this.processor.logger.info(
        `The pull request was created after the minimal processing creation date. Continuing...`
      );

      return false;
    }

    this.processor.logger.info(`The pull request was created before the minimal processing creation date`);

    return true;
  }

  public hasAllIgnoredLabels$$(): boolean {
    this.processor.logger.info(`Checking if all the labels on this pull request should be ignored...`);

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    if (!pullRequestsInputs.pullRequestIgnoreAllLabels) {
      this.processor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_IGNORE_ALL_LABELS),
        LoggerFormatService.whiteBright(`is disabled. Continuing...`)
      );

      return false;
    }

    this.processor.logger.info(
      `The input`,
      LoggerService.input(EInputs.PULL_REQUEST_IGNORE_ALL_LABELS),
      LoggerFormatService.whiteBright(`is enabled. Checking...`)
    );

    const staleLabel: string = pullRequestsInputs.pullRequestStaleLabel;
    const allLabels: string[] = this._getLabels(this.processor.item.labels.nodes).filter(
      (label: Readonly<string>): boolean => label !== staleLabel
    );

    if (allLabels.length > 0) {
      this.processor.logger.info(
        `The pull request has`,
        LoggerService.value(allLabels.length),
        LoggerFormatService.whiteBright(`label${allLabels.length > 1 ? `s` : ``}`)
      );

      return true;
    }

    this.processor.logger.info(`The pull request has no label. Continuing...`);

    return false;
  }

  public hasAnyIgnoredLabels$$(): boolean {
    this.processor.logger.info(`Checking if this pull request has one of the ignored labels...`);

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();
    const duplicatedLabels: string[] = getDuplicates(
      this._getLabels(this.processor.item.labels.nodes),
      pullRequestsInputs.pullRequestIgnoreAnyLabels
    );
    const firstDuplicatedLabel: string | undefined = _.head(duplicatedLabels);

    if (!_.isUndefined(firstDuplicatedLabel)) {
      this.processor.logger.info(
        `Containing one of the ignored labels`,
        LoggerFormatService.white(`->`),
        LoggerService.value(firstDuplicatedLabel)
      );

      return true;
    }

    this.processor.logger.debug(`Note: in case of issue, we may need to use a RegExp to ignore sensitivity`);

    // @todo handle the pagination
    const { totalCount } = this.processor.item.labels;

    if (totalCount > GithubApiPullRequestsService.labelsPerPullRequest) {
      this.processor.logger.warning(
        `Found`,
        LoggerService.value(_.toString(totalCount)),
        LoggerFormatService.whiteBright(
          `label${
            totalCount > 1 ? `s` : ``
          } attached on this pull request. The pagination support is not yet implemented and may cause a mismatch!`
        )
      );
      AnnotationsService.warning(EAnnotationWarningPullRequest.TOO_MANY_LABELS_PAGINATION_NOT_IMPLEMENTED, {
        file: `pull-request-ignore-processor.ts`,
        startLine: 218,
        title: `Warning`,
      });
    }

    this.processor.logger.info(`Not containing an ignored label. Continuing...`);

    return false;
  }

  public hasAnyIgnoredAssignees$$(): boolean {
    this.processor.logger.info(`Checking if this pull request has one of the ignored assignees...`);

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();
    const duplicatedAssignees: string[] = getDuplicates(
      this._getAssignees(this.processor.item.assignees.nodes),
      pullRequestsInputs.pullRequestIgnoreAnyAssignees
    );
    const firstDuplicatedAssignee: string | undefined = _.head(duplicatedAssignees);

    if (!_.isUndefined(firstDuplicatedAssignee)) {
      this.processor.logger.info(
        `Containing one of the ignored assignees`,
        LoggerFormatService.white(`->`),
        LoggerService.value(firstDuplicatedAssignee)
      );

      return true;
    }

    this.processor.logger.debug(`Note: in case of issue, we may need to use a RegExp to ignore sensitivity`);

    // @todo handle the pagination
    const { totalCount } = this.processor.item.assignees;

    if (totalCount > GithubApiPullRequestsService.assigneesPerPullRequest) {
      this.processor.logger.warning(
        `Found`,
        LoggerService.value(_.toString(totalCount)),
        LoggerFormatService.whiteBright(
          `assignee${
            totalCount > 1 ? `s` : ``
          } attached on this pull request. The pagination support is not yet implemented and may cause a mismatch!`
        )
      );
      AnnotationsService.warning(EAnnotationWarningPullRequest.TOO_MANY_ASSIGNEES_PAGINATION_NOT_IMPLEMENTED, {
        file: `pull-request-ignore-processor.ts`,
        startLine: 265,
        title: `Warning`,
      });
    }

    this.processor.logger.info(`Not containing an ignored assignee. Continuing...`);

    return false;
  }

  public hasAnyIgnoredProjectCards$$(): boolean {
    this.processor.logger.info(`Checking if this pull request has one of the ignored project cards...`);

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();
    const duplicatedProjectCards: string[] = getDuplicates(
      this._getProjectCardNames(this.processor.item.projectCards.nodes),
      pullRequestsInputs.pullRequestIgnoreAnyProjectCards
    );
    const firstDuplicatedProjectCard: string | undefined = _.head(duplicatedProjectCards);

    if (!_.isUndefined(firstDuplicatedProjectCard)) {
      this.processor.logger.info(
        `Containing one of the ignored project cards`,
        LoggerFormatService.white(`->`),
        LoggerService.value(firstDuplicatedProjectCard)
      );

      return true;
    }

    this.processor.logger.debug(`Note: in case of issue, we may need to use a RegExp to ignore sensitivity`);

    // @todo handle the pagination
    const { totalCount } = this.processor.item.projectCards;

    if (totalCount > GithubApiPullRequestsService.projectCardsPerPullRequest) {
      this.processor.logger.warning(
        `Found`,
        LoggerService.value(_.toString(totalCount)),
        LoggerFormatService.whiteBright(
          `project card${
            totalCount > 1 ? `s` : ``
          } attached on this pull request. The pagination support is not yet implemented and may cause a mismatch!`
        )
      );
      AnnotationsService.warning(EAnnotationWarningPullRequest.TOO_MANY_PROJECT_CARDS_PAGINATION_NOT_IMPLEMENTED, {
        file: `pull-request-ignore-processor.ts`,
        startLine: 312,
        title: `Warning`,
      });
    }

    this.processor.logger.info(`Not containing an ignored project card. Continuing...`);

    return false;
  }

  public isDraft$$(): boolean {
    this.processor.logger.info(`Checking if this pull request is a draft...`);

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    if (!pullRequestsInputs.pullRequestIgnoreDraft) {
      this.processor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_IGNORE_DRAFT),
        LoggerFormatService.whiteBright(`is disabled. Continuing...`)
      );

      return false;
    }

    this.processor.logger.info(
      `The input`,
      LoggerService.input(EInputs.PULL_REQUEST_IGNORE_DRAFT),
      LoggerFormatService.whiteBright(`is enabled. Checking...`)
    );

    if (this._isDraft()) {
      this.processor.logger.info(`The pull request is a draft`);

      return true;
    }

    this.processor.logger.info(`Not a draft. Continuing...`);

    return false;
  }

  public hasAnyIgnoredMilestones$$(): boolean {
    this.processor.logger.info(`Checking if this pull request has one of the ignored milestones...`);

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();
    const duplicatedMilestones: string[] = getDuplicates(
      _.compact([this.processor.item.milestone?.title]),
      pullRequestsInputs.pullRequestIgnoreAnyMilestones
    );
    const firstDuplicatedMilestone: string | undefined = _.head(duplicatedMilestones);

    if (!_.isUndefined(firstDuplicatedMilestone)) {
      this.processor.logger.info(
        `Containing one of the ignored milestones`,
        LoggerFormatService.white(`->`),
        LoggerService.value(firstDuplicatedMilestone)
      );

      return true;
    }

    this.processor.logger.debug(`Note: in case of issue, we may need to use a RegExp to ignore sensitivity`);
    this.processor.logger.info(`Not containing an ignored milestone. Continuing...`);

    return false;
  }

  public hasAllIgnoredMilestones$$(): boolean {
    this.processor.logger.info(`Checking if all the milestones on this pull request should be ignored...`);

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    if (!pullRequestsInputs.pullRequestIgnoreAllMilestones) {
      this.processor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_IGNORE_ALL_MILESTONES),
        LoggerFormatService.whiteBright(`is disabled. Continuing...`)
      );

      return false;
    }

    this.processor.logger.info(
      `The input`,
      LoggerService.input(EInputs.PULL_REQUEST_IGNORE_ALL_MILESTONES),
      LoggerFormatService.whiteBright(`is enabled. Checking...`)
    );

    if (this.processor.item.milestone) {
      this.processor.logger.info(
        `The pull request has a milestone`,
        LoggerFormatService.white(`->`),
        LoggerService.value(this.processor.item.milestone.title)
      );

      return true;
    }

    this.processor.logger.info(`The pull request has no milestone. Continuing...`);

    return false;
  }

  private _isDraft(): boolean {
    return this.processor.item.isDraft;
  }
}
