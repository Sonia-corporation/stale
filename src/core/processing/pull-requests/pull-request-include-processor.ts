import { EInputs } from '@core/inputs/inputs.enum';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { AbstractIncludeProcessor } from '@core/processing/abstract-include-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { IGithubApiProject } from '@github/api/projects/interfaces/github-api-project.interface';
import { GithubApiPullRequestsService } from '@github/api/pull-requests/github-api-pull-requests.service';
import { AnnotationsService } from '@utils/annotations/annotations.service';
import { EAnnotationWarningPullRequest } from '@utils/annotations/enums/annotation-warning-pull-request.enum';
import { getDuplicates } from '@utils/arrays/get-duplicates';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';

/**
 * @description
 * The processor to include a pull request in the processing
 */
export class PullRequestIncludeProcessor extends AbstractIncludeProcessor<PullRequestProcessor> {
  public constructor(pullRequestProcessor: PullRequestProcessor) {
    super(pullRequestProcessor);
  }

  public shouldIncludeAnyWhiteListedProject$$(): boolean {
    this.processor.logger.info(
      `Checking if this pull request should only be processed based on any of the associated projects...`
    );

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    if (_.isEmpty(pullRequestsInputs.pullRequestOnlyAnyProjects)) {
      this.processor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_ONLY_ANY_PROJECTS),
        LoggerFormatService.whiteBright(
          `is empty. This feature is considered as disabled, and so, ignored. Continuing...`
        )
      );

      return true;
    }

    this.processor.logger.info(
      `The input`,
      LoggerService.input(EInputs.PULL_REQUEST_ONLY_ANY_PROJECTS),
      LoggerFormatService.whiteBright(
        `is set. This feature is considered as enabled, and so, may alter the processing. Checking...`
      )
    );
    const projects: IGithubApiProject[] = this.processor.item.projects.nodes;
    const projectsCount: number = projects.length;
    const projectNames: string[] = this._getProjectTitles(projects);

    if (projectsCount === 0) {
      this.processor.logger.info(`Not containing any project. Skipping the processing of this pull request...`);

      return false;
    }

    this.processor.logger.info(
      `Found`,
      LoggerService.value(projectsCount),
      LoggerFormatService.whiteBright(`project${projectsCount > 1 ? `s` : ``} on this pull request`),
      LoggerService.value(projectNames)
    );

    const duplicatedProjectNames: string[] = getDuplicates(projectNames, pullRequestsInputs.pullRequestOnlyAnyProjects);
    const firstDuplicatedProject: string | undefined = _.head(duplicatedProjectNames);

    if (!_.isUndefined(firstDuplicatedProject)) {
      this.processor.logger.info(
        `Containing one of the required project`,
        LoggerFormatService.white(`->`),
        LoggerService.value(firstDuplicatedProject)
      );
      this.processor.logger.info(`Continuing the processing for this pull request...`);

      return true;
    }

    this.processor.logger.debug(`Note: in case of issue, we may need to use a RegExp to ignore sensitivity`);

    // @to do handle the pagination
    const { totalCount } = this.processor.item.projects;

    if (totalCount > GithubApiPullRequestsService.projectsPerPullRequest) {
      this.processor.logger.warning(
        `Found`,
        LoggerService.value(_.toString(totalCount)),
        LoggerFormatService.whiteBright(
          `project${
            totalCount > 1 ? `s` : ``
          } attached on this pull request. The pagination support is not yet implemented and may cause a mismatch!`
        )
      );
      AnnotationsService.warning(EAnnotationWarningPullRequest.TOO_MANY_PROJECTS_PAGINATION_NOT_IMPLEMENTED, {
        file: `pull-request-include-processor.ts`,
        startLine: 90,
        title: `Warning`,
      });
    }

    this.processor.logger.info(
      `Not containing any of the required project. Skipping the processing of this pull request...`
    );

    return false;
  }

  public shouldIncludeAnyWhiteListedMilestone$$(): boolean {
    this.processor.logger.info(
      `Checking if this pull request should only be processed based on any of the associated milestones...`
    );

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    if (_.isEmpty(pullRequestsInputs.pullRequestOnlyAnyMilestones)) {
      this.processor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_ONLY_ANY_MILESTONES),
        LoggerFormatService.whiteBright(
          `is empty. This feature is considered as disabled, and so, ignored. Continuing...`
        )
      );

      return true;
    }

    this.processor.logger.info(
      `The input`,
      LoggerService.input(EInputs.PULL_REQUEST_ONLY_ANY_MILESTONES),
      LoggerFormatService.whiteBright(
        `is set. This feature is considered as enabled, and so, may alter the processing. Checking...`
      )
    );
    const { milestone } = this.processor.item;

    if (_.isNil(milestone)) {
      this.processor.logger.info(`Not containing a milestone. Skipping the processing of this pull request...`);

      return false;
    }

    this.processor.logger.info(
      `Found the milestone`,
      LoggerService.value(milestone.title),
      LoggerFormatService.whiteBright(`on this pull request`)
    );

    const isMilestoneMatched: boolean = _.includes(pullRequestsInputs.pullRequestOnlyAnyMilestones, milestone.title);

    if (isMilestoneMatched) {
      this.processor.logger.info(
        `Containing one of the required milestone`,
        LoggerFormatService.white(`->`),
        LoggerService.value(milestone.title)
      );
      this.processor.logger.info(`Continuing the processing for this pull request...`);

      return true;
    }

    this.processor.logger.info(
      `Not containing any of the required milestone. Skipping the processing of this pull request...`
    );

    return false;
  }

  public shouldIncludeAnyWhiteListedAssignee$$(): boolean {
    this.processor.logger.info(
      `Checking if this pull request should only be processed based on any of the associated assignees...`
    );

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    if (_.isEmpty(pullRequestsInputs.pullRequestOnlyAnyAssignees)) {
      this.processor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_ONLY_ANY_ASSIGNEES),
        LoggerFormatService.whiteBright(
          `is empty. This feature is considered as disabled, and so, ignored. Continuing...`
        )
      );

      return true;
    }

    this.processor.logger.info(
      `The input`,
      LoggerService.input(EInputs.PULL_REQUEST_ONLY_ANY_ASSIGNEES),
      LoggerFormatService.whiteBright(
        `is set. This feature is considered as enabled, and so, may alter the processing. Checking...`
      )
    );
    const assignees: IGithubApiAssignee[] = this.processor.item.assignees.nodes;
    const assigneesCount: number = assignees.length;
    const assigneeNames: string[] = this._getAssigneeNames(assignees);

    if (assigneesCount === 0) {
      this.processor.logger.info(`Not containing any assignee. Skipping the processing of this pull request...`);

      return false;
    }

    this.processor.logger.info(
      `Found`,
      LoggerService.value(assigneesCount),
      LoggerFormatService.whiteBright(`assignee${assigneesCount > 1 ? `s` : ``} on this pull request`),
      LoggerService.value(assigneeNames)
    );

    const duplicatedAssigneeNames: string[] = getDuplicates(
      assigneeNames,
      pullRequestsInputs.pullRequestOnlyAnyAssignees
    );
    const firstDuplicatedAssignee: string | undefined = _.head(duplicatedAssigneeNames);

    if (!_.isUndefined(firstDuplicatedAssignee)) {
      this.processor.logger.info(
        `Containing one of the required assignee`,
        LoggerFormatService.white(`->`),
        LoggerService.value(firstDuplicatedAssignee)
      );
      this.processor.logger.info(`Continuing the processing for this pull request...`);

      return true;
    }

    this.processor.logger.debug(`Note: in case of issue, we may need to use a RegExp to ignore sensitivity`);

    // @todo h andle the pagination
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
        file: `pull-request-include-processor.ts`,
        startLine: 239,
        title: `Warning`,
      });
    }

    this.processor.logger.info(
      `Not containing any of the required assignee. Skipping the processing of this pull request...`
    );

    return false;
  }

  public shouldIncludeAnyAssignee$$(): boolean {
    this.processor.logger.info(
      `Checking if this pull request should only be processed when having at least one associated assignee...`
    );

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    if (!pullRequestsInputs.pullRequestOnlyWithAssignees) {
      this.processor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_ONLY_WITH_ASSIGNEES),
        LoggerFormatService.whiteBright(`is disabled. Continuing...`)
      );

      return true;
    }

    this.processor.logger.info(
      `The input`,
      LoggerService.input(EInputs.PULL_REQUEST_ONLY_WITH_ASSIGNEES),
      LoggerFormatService.whiteBright(`is enabled. Checking...`)
    );
    const assignees: IGithubApiAssignee[] = this.processor.item.assignees.nodes;
    const assigneesCount: number = assignees.length;

    if (assigneesCount === 0) {
      this.processor.logger.info(`Not containing any assignee. Skipping the processing of this pull request...`);

      return false;
    }

    this.processor.logger.info(
      `Found`,
      LoggerService.value(assigneesCount),
      LoggerFormatService.whiteBright(`assignee${assigneesCount > 1 ? `s` : ``} on this pull request`)
    );
    this.processor.logger.info(`Continuing the processing for this pull request...`);

    return true;
  }

  public shouldIncludeAnyMilestone$$(): boolean {
    this.processor.logger.info(
      `Checking if this pull request should only be processed when having at least one associated milestone...`
    );

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    if (!pullRequestsInputs.pullRequestOnlyWithMilestones) {
      this.processor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_ONLY_WITH_MILESTONES),
        LoggerFormatService.whiteBright(`is disabled. Continuing...`)
      );

      return true;
    }

    this.processor.logger.info(
      `The input`,
      LoggerService.input(EInputs.PULL_REQUEST_ONLY_WITH_MILESTONES),
      LoggerFormatService.whiteBright(`is enabled. Checking...`)
    );
    const { milestone } = this.processor.item;

    if (!milestone) {
      this.processor.logger.info(`Not containing any milestone. Skipping the processing of this pull request...`);

      return false;
    }

    this.processor.logger.info(`Found a milestone on this pull request`);
    this.processor.logger.info(`Continuing the processing for this pull request...`);

    return true;
  }

  public shouldIncludeAnyProject$$(): boolean {
    this.processor.logger.info(
      `Checking if this pull request should only be processed when having at least one associated project...`
    );

    const pullRequestsInputs: IPullRequestsInputs = PullRequestsInputsService.getInstance().getInputs();

    if (!pullRequestsInputs.pullRequestOnlyWithProjects) {
      this.processor.logger.info(
        `The input`,
        LoggerService.input(EInputs.PULL_REQUEST_ONLY_WITH_PROJECTS),
        LoggerFormatService.whiteBright(`is disabled. Continuing...`)
      );

      return true;
    }

    this.processor.logger.info(
      `The input`,
      LoggerService.input(EInputs.PULL_REQUEST_ONLY_WITH_PROJECTS),
      LoggerFormatService.whiteBright(`is enabled. Checking...`)
    );
    const projects: IGithubApiProject[] = this.processor.item.projects.nodes;
    const projectsCount: number = projects.length;

    if (projectsCount === 0) {
      this.processor.logger.info(`Not containing any project. Skipping the processing of this pull request...`);

      return false;
    }

    this.processor.logger.info(
      `Found`,
      LoggerService.value(projectsCount),
      LoggerFormatService.whiteBright(`project${projectsCount > 1 ? `s` : ``} on this pull request`)
    );
    this.processor.logger.info(`Continuing the processing for this pull request...`);

    return true;
  }
}
