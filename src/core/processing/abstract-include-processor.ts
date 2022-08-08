import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { IGithubApiProjectCard } from '@github/api/projects/interfaces/github-api-project-card.interface';
import { AbstractProcessor } from '@utils/processors/abstract-processor';
import _ from 'lodash';

export abstract class AbstractIncludeProcessor<
  TProcessor extends IssueProcessor | PullRequestProcessor
> extends AbstractProcessor<TProcessor> {
  protected constructor(processor: Readonly<TProcessor>) {
    super(processor);
  }

  /**
   * @description
   * If you need specific conditions, call with super and add them
   * @returns {boolean} Returns true when the processed item should be included in the processing
   */
  public shouldInclude(): boolean {
    this.processor.logger.info(`Checking if this ${this.type} should be included in the processing...`);

    return (
      this.shouldIncludeAnyWhiteListedProjectCard$$() &&
      this.shouldIncludeAnyWhiteListedMilestone$$() &&
      this.shouldIncludeAnyWhiteListedAssignee$$() &&
      this.shouldIncludeAnyAssignee$$()
    );
  }

  protected _getProjectNames(projectCards: ReadonlyArray<IGithubApiProjectCard>): string[] {
    return _.map(projectCards, (projectCard: Readonly<IGithubApiProjectCard>): string => projectCard.project.name);
  }

  protected _getAssigneeNames(assignees: ReadonlyArray<IGithubApiAssignee>): string[] {
    return _.map(assignees, (assignee: Readonly<IGithubApiAssignee>): string => assignee.login);
  }

  public abstract shouldIncludeAnyWhiteListedProjectCard$$(): boolean;

  public abstract shouldIncludeAnyWhiteListedMilestone$$(): boolean;

  public abstract shouldIncludeAnyWhiteListedAssignee$$(): boolean;

  public abstract shouldIncludeAnyAssignee$$(): boolean;
}
