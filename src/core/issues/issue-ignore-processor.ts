import { EInputs } from '@core/inputs/inputs.enum';
import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';
import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { getDuplicates } from '@utils/arrays/get-duplicates';
import { isDateMoreRecent } from '@utils/dates/is-date-more-recent';
import { iso8601ToDatetime } from '@utils/dates/iso-8601-to-datetime';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';
import { DateTime } from 'luxon';

/**
 * @description
 * The processor to ignore an issue
 */
export class IssueIgnoreProcessor {
  public readonly issueProcessor: IssueProcessor;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
  }

  public shouldIgnore(): boolean {
    this.issueProcessor.logger.info(`Checking if this issue should be ignored...`);

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
    this.issueProcessor.logger.info(`Checking if this issue is locked...`);

    if (this.issueProcessor.githubIssue.locked) {
      this.issueProcessor.logger.info(`Locked`);
      this.issueProcessor.logger.debug(`We do not process locked issues; it is in the name: locked`);

      return true;
    }

    this.issueProcessor.logger.info(`Not locked. Continuing...`);

    return false;
  }

  public hasAllIgnoredAssignees$$(): boolean {
    this.issueProcessor.logger.info(`Checking if all the assignees on this issue should be ignored...`);

    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    if (!issuesInputs.issueIgnoreAllAssignees) {
      this.issueProcessor.logger.info(
        `The input`,
        LoggerService.input(EInputs.ISSUE_IGNORE_ALL_ASSIGNEES),
        LoggerFormatService.whiteBright(`is disabled. Continuing...`)
      );

      return false;
    }

    this.issueProcessor.logger.info(
      `The input`,
      LoggerService.input(EInputs.ISSUE_IGNORE_ALL_ASSIGNEES),
      LoggerFormatService.whiteBright(`is enabled. Checking...`)
    );

    if (this.issueProcessor.githubIssue.assignees.totalCount > 0) {
      this.issueProcessor.logger.info(
        `The issue has`,
        LoggerService.value(this.issueProcessor.githubIssue.assignees.totalCount),
        LoggerFormatService.whiteBright(
          `assignee${this.issueProcessor.githubIssue.assignees.totalCount > 1 ? `s` : ``}`
        )
      );

      return true;
    }

    this.issueProcessor.logger.info(`The issue has no assignee. Continuing...`);

    return false;
  }

  public hasAllIgnoredProjectCards$$(): boolean {
    this.issueProcessor.logger.info(`Checking if all the project cards on this issue should be ignored...`);

    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    if (!issuesInputs.issueIgnoreAllProjectCards) {
      this.issueProcessor.logger.info(
        `The input`,
        LoggerService.input(EInputs.ISSUE_IGNORE_ALL_PROJECT_CARDS),
        LoggerFormatService.whiteBright(`is disabled. Continuing...`)
      );

      return false;
    }

    this.issueProcessor.logger.info(
      `The input`,
      LoggerService.input(EInputs.ISSUE_IGNORE_ALL_PROJECT_CARDS),
      LoggerFormatService.whiteBright(`is enabled. Checking...`)
    );

    if (this.issueProcessor.githubIssue.projectCards.totalCount > 0) {
      this.issueProcessor.logger.info(
        `The issue has`,
        LoggerService.value(this.issueProcessor.githubIssue.projectCards.totalCount),
        LoggerFormatService.whiteBright(
          `project card${this.issueProcessor.githubIssue.projectCards.totalCount > 1 ? `s` : ``}`
        )
      );

      return true;
    }

    this.issueProcessor.logger.info(`The issue has no project card. Continuing...`);

    return false;
  }

  public hasIgnoredCreationDate$$(): boolean {
    this.issueProcessor.logger.info(`Checking if this issue should be ignored based on its creation date...`);
    let issueIgnoreBeforeCreationDate: DateTime;
    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    try {
      issueIgnoreBeforeCreationDate = iso8601ToDatetime(issuesInputs.issueIgnoreBeforeCreationDate);
    } catch (error) {
      this.issueProcessor.logger.info(
        `The input`,
        LoggerService.input(EInputs.ISSUE_IGNORE_BEFORE_CREATION_DATE),
        LoggerFormatService.whiteBright(`is either unset or not convertible to a valid ISO 8601 date. Continuing...`)
      );

      return false;
    }

    const createdAt: DateTime = this.issueProcessor.getCreatedAt();

    this.issueProcessor.logger.info(`The issue was created the`, LoggerService.date(createdAt));
    this.issueProcessor.logger.info(
      `The minimal processing creation date is set to the`,
      LoggerService.date(issueIgnoreBeforeCreationDate)
    );

    if (isDateMoreRecent(createdAt, issueIgnoreBeforeCreationDate)) {
      this.issueProcessor.logger.info(
        `The issue was created after the minimal processing creation date. Continuing...`
      );

      return false;
    }

    this.issueProcessor.logger.info(`The issue was created before the minimal processing creation date`);

    return true;
  }

  public hasAllIgnoredLabels$$(): boolean {
    this.issueProcessor.logger.info(`Checking if all the labels on this issue should be ignored...`);

    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    if (!issuesInputs.issueIgnoreAllLabels) {
      this.issueProcessor.logger.info(
        `The input`,
        LoggerService.input(EInputs.ISSUE_IGNORE_ALL_LABELS),
        LoggerFormatService.whiteBright(`is disabled. Continuing...`)
      );

      return false;
    }

    this.issueProcessor.logger.info(
      `The input`,
      LoggerService.input(EInputs.ISSUE_IGNORE_ALL_LABELS),
      LoggerFormatService.whiteBright(`is enabled. Checking...`)
    );

    const staleLabel: string = issuesInputs.issueStaleLabel;
    const allLabels: string[] = this._getLabels(this.issueProcessor.githubIssue.labels.nodes).filter(
      (label: Readonly<string>): boolean => label !== staleLabel
    );

    if (allLabels.length > 0) {
      this.issueProcessor.logger.info(
        `The issue has`,
        LoggerService.value(allLabels.length),
        LoggerFormatService.whiteBright(`label${allLabels.length > 1 ? `s` : ``}`)
      );

      return true;
    }

    this.issueProcessor.logger.info(`The issue has no label. Continuing...`);

    return false;
  }

  public hasAnyIgnoredLabels$$(): boolean {
    this.issueProcessor.logger.info(`Checking if this issue has one of the ignored labels...`);

    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();
    const duplicatedLabels: string[] = getDuplicates(
      this._getLabels(this.issueProcessor.githubIssue.labels.nodes),
      issuesInputs.issueIgnoreAnyLabels
    );
    const firstDuplicatedLabel: string | undefined = _.head(duplicatedLabels);

    if (!_.isUndefined(firstDuplicatedLabel)) {
      this.issueProcessor.logger.info(
        `Containing one of the ignored labels`,
        LoggerFormatService.white(`->`),
        LoggerService.value(firstDuplicatedLabel)
      );

      return true;
    }

    this.issueProcessor.logger.debug(`Note: in case of issue, we may need to use a RegExp to ignore sensitivity`);

    // @todo handle the pagination
    const { totalCount } = this.issueProcessor.githubIssue.labels;

    if (totalCount > GithubApiIssuesService.labelsPerIssue) {
      this.issueProcessor.logger.warning(
        `Found`,
        LoggerService.value(_.toString(totalCount)),
        LoggerFormatService.whiteBright(
          `label${
            totalCount > 1 ? `s` : ``
          } attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`
        )
      );
    }

    this.issueProcessor.logger.info(`Not containing an ignored label. Continuing...`);

    return false;
  }

  public hasAnyIgnoredAssignees$$(): boolean {
    this.issueProcessor.logger.info(`Checking if this issue has one of the ignored assignees...`);

    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();
    const duplicatedAssignees: string[] = getDuplicates(
      this._getAssignees(this.issueProcessor.githubIssue.assignees.nodes),
      issuesInputs.issueIgnoreAnyAssignees
    );
    const firstDuplicatedAssignee: string | undefined = _.head(duplicatedAssignees);

    if (!_.isUndefined(firstDuplicatedAssignee)) {
      this.issueProcessor.logger.info(
        `Containing one of the ignored assignees`,
        LoggerFormatService.white(`->`),
        LoggerService.value(firstDuplicatedAssignee)
      );

      return true;
    }

    this.issueProcessor.logger.debug(`Note: in case of issue, we may need to use a RegExp to ignore sensitivity`);

    // @todo handle the pagination
    const { totalCount } = this.issueProcessor.githubIssue.assignees;

    if (totalCount > GithubApiIssuesService.assigneesPerIssue) {
      this.issueProcessor.logger.warning(
        `Found`,
        LoggerService.value(_.toString(totalCount)),
        LoggerFormatService.whiteBright(
          `assignee${
            totalCount > 1 ? `s` : ``
          } attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`
        )
      );
    }

    this.issueProcessor.logger.info(`Not containing an ignored assignee. Continuing...`);

    return false;
  }

  private _getLabels(labels: ReadonlyArray<IGithubApiLabel>): string[] {
    return _.map(labels, (label: Readonly<IGithubApiLabel>): string => label.name);
  }

  private _getAssignees(assignees: ReadonlyArray<IGithubApiAssignee>): string[] {
    return _.map(assignees, (assignee: Readonly<IGithubApiAssignee>): string => assignee.login);
  }
}
