import { EInputs } from '@core/inputs/inputs.enum';
import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { AbstractIncludeProcessor } from '@core/processing/abstract-include-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';
import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { IGithubApiProjectCard } from '@github/api/projects/interfaces/github-api-project-card.interface';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationWarningIssue } from '@utils/annotations/enums/annotation-warning-issue.enum';
import { getDuplicates } from '@utils/arrays/get-duplicates';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';

/**
 * @description
 * The processor to include an issue in the processing
 */
export class IssueIncludeProcessor extends AbstractIncludeProcessor<IssueProcessor> {
  public constructor(issueProcessor: IssueProcessor) {
    super(issueProcessor);
  }

  public shouldIncludeAnyWhiteListedProjectCard$$(): boolean {
    this.processor.logger.info(
      `Checking if this issue should only be processed based on any of the associated project cards...`
    );

    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    if (_.isEmpty(issuesInputs.issueOnlyAnyProjectCards)) {
      this.processor.logger.info(
        `The input`,
        LoggerService.input(EInputs.ISSUE_ONLY_ANY_PROJECT_CARDS),
        LoggerFormatService.whiteBright(
          `is empty. This feature is considered as disabled, and so, ignored. Continuing...`
        )
      );

      return true;
    }

    this.processor.logger.info(
      `The input`,
      LoggerService.input(EInputs.ISSUE_ONLY_ANY_PROJECT_CARDS),
      LoggerFormatService.whiteBright(
        `is set. This feature is considered as enabled, and so, may alter the processing. Checking...`
      )
    );
    const projectCards: IGithubApiProjectCard[] = this.processor.item.projectCards.nodes;
    const projectCardsCount: number = projectCards.length;
    const projectNames: string[] = this._getProjectNames(projectCards);

    if (projectCardsCount === 0) {
      this.processor.logger.info(`Not containing any project card. Skipping the processing of this issue...`);

      return false;
    }

    this.processor.logger.info(
      `Found`,
      LoggerService.value(projectCardsCount),
      LoggerFormatService.whiteBright(`project card${projectCardsCount > 1 ? `s` : ``} on this issue`),
      LoggerService.value(projectNames)
    );

    const duplicatedProjectNames: string[] = getDuplicates(projectNames, issuesInputs.issueOnlyAnyProjectCards);
    const firstDuplicatedProjectCard: string | undefined = _.head(duplicatedProjectNames);

    if (!_.isUndefined(firstDuplicatedProjectCard)) {
      this.processor.logger.info(
        `Containing one of the required project card`,
        LoggerFormatService.white(`->`),
        LoggerService.value(firstDuplicatedProjectCard)
      );
      this.processor.logger.info(`Continuing the processing for this issue...`);

      return true;
    }

    this.processor.logger.debug(`Note: in case of issue, we may need to use a RegExp to ignore sensitivity`);

    // @todo handle the pagination
    const { totalCount } = this.processor.item.projectCards;

    if (totalCount > GithubApiIssuesService.projectCardsPerIssue) {
      this.processor.logger.warning(
        `Found`,
        LoggerService.value(_.toString(totalCount)),
        LoggerFormatService.whiteBright(
          `project card${
            totalCount > 1 ? `s` : ``
          } attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`
        )
      );
      AnnotationsService.warning(EAnnotationWarningIssue.TOO_MANY_PROJECT_CARDS_PAGINATION_NOT_IMPLEMENTED, {
        file: `issue-include-processor.ts`,
        startLine: 87,
        title: `Warning`,
      });
    }

    this.processor.logger.info(
      `Not containing any of the required project card. Skipping the processing of this issue...`
    );

    return false;
  }

  public shouldIncludeAnyWhiteListedMilestone$$(): boolean {
    this.processor.logger.info(
      `Checking if this issue should only be processed based on any of the associated milestones...`
    );

    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    if (_.isEmpty(issuesInputs.issueOnlyAnyMilestones)) {
      this.processor.logger.info(
        `The input`,
        LoggerService.input(EInputs.ISSUE_ONLY_ANY_MILESTONES),
        LoggerFormatService.whiteBright(
          `is empty. This feature is considered as disabled, and so, ignored. Continuing...`
        )
      );

      return true;
    }

    this.processor.logger.info(
      `The input`,
      LoggerService.input(EInputs.ISSUE_ONLY_ANY_MILESTONES),
      LoggerFormatService.whiteBright(
        `is set. This feature is considered as enabled, and so, may alter the processing. Checking...`
      )
    );
    const { milestone } = this.processor.item;

    if (_.isNil(milestone)) {
      this.processor.logger.info(`Not containing a milestone. Skipping the processing of this issue...`);

      return false;
    }

    this.processor.logger.info(
      `Found the milestone`,
      LoggerService.value(milestone.title),
      LoggerFormatService.whiteBright(`on this issue`)
    );

    const isMilestoneMatched: boolean = _.includes(issuesInputs.issueOnlyAnyMilestones, milestone.title);

    if (isMilestoneMatched) {
      this.processor.logger.info(
        `Containing one of the required milestone`,
        LoggerFormatService.white(`->`),
        LoggerService.value(milestone.title)
      );
      this.processor.logger.info(`Continuing the processing for this issue...`);

      return true;
    }

    this.processor.logger.info(
      `Not containing any of the required milestone. Skipping the processing of this issue...`
    );

    return false;
  }

  public shouldIncludeAnyWhiteListedAssignee$$(): boolean {
    this.processor.logger.info(
      `Checking if this issue should only be processed based on any of the associated assignees...`
    );

    const issuesInputs: IIssuesInputs = IssuesInputsService.getInstance().getInputs();

    if (_.isEmpty(issuesInputs.issueOnlyAnyAssignees)) {
      this.processor.logger.info(
        `The input`,
        LoggerService.input(EInputs.ISSUE_ONLY_ANY_ASSIGNEES),
        LoggerFormatService.whiteBright(
          `is empty. This feature is considered as disabled, and so, ignored. Continuing...`
        )
      );

      return true;
    }

    this.processor.logger.info(
      `The input`,
      LoggerService.input(EInputs.ISSUE_ONLY_ANY_ASSIGNEES),
      LoggerFormatService.whiteBright(
        `is set. This feature is considered as enabled, and so, may alter the processing. Checking...`
      )
    );
    const assignees: IGithubApiAssignee[] = this.processor.item.assignees.nodes;
    const assigneesCount: number = assignees.length;
    const assigneeNames: string[] = this._getAssigneeNames(assignees);

    if (assigneesCount === 0) {
      this.processor.logger.info(`Not containing any assignee. Skipping the processing of this issue...`);

      return false;
    }

    this.processor.logger.info(
      `Found`,
      LoggerService.value(assigneesCount),
      LoggerFormatService.whiteBright(`assignee${assigneesCount > 1 ? `s` : ``} on this issue`),
      LoggerService.value(assigneeNames)
    );

    const duplicatedAssigneeNames: string[] = getDuplicates(assigneeNames, issuesInputs.issueOnlyAnyAssignees);
    const firstDuplicatedAssignee: string | undefined = _.head(duplicatedAssigneeNames);

    if (!_.isUndefined(firstDuplicatedAssignee)) {
      this.processor.logger.info(
        `Containing one of the required assignee`,
        LoggerFormatService.white(`->`),
        LoggerService.value(firstDuplicatedAssignee)
      );
      this.processor.logger.info(`Continuing the processing for this issue...`);

      return true;
    }

    this.processor.logger.debug(`Note: in case of issue, we may need to use a RegExp to ignore sensitivity`);

    // @todo handle the pagination
    const { totalCount } = this.processor.item.assignees;

    if (totalCount > GithubApiIssuesService.assigneesPerIssue) {
      this.processor.logger.warning(
        `Found`,
        LoggerService.value(_.toString(totalCount)),
        LoggerFormatService.whiteBright(
          `assignee${
            totalCount > 1 ? `s` : ``
          } attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`
        )
      );
      AnnotationsService.warning(EAnnotationWarningIssue.TOO_MANY_ASSIGNEES_PAGINATION_NOT_IMPLEMENTED, {
        file: `issue-include-processor.ts`,
        startLine: 233,
        title: `Warning`,
      });
    }

    this.processor.logger.info(`Not containing any of the required assignee. Skipping the processing of this issue...`);

    return false;
  }
}
