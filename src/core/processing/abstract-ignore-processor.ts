import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { IGithubApiAssignee } from '@github/api/labels/interfaces/github-api-assignee.interface';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiProject } from '@github/api/projects/interfaces/github-api-project.interface';
import { AbstractProcessor } from '@utils/processors/abstract-processor';
import _ from 'lodash';

export abstract class AbstractIgnoreProcessor<
  TProcessor extends IssueProcessor | PullRequestProcessor,
> extends AbstractProcessor<TProcessor> {
  protected constructor(processor: Readonly<TProcessor>) {
    super(processor);
  }

  /**
   * @description
   * If you need specific conditions, call with super and add them
   * @returns {boolean} Returns true when the processed item should be ignored
   */
  public shouldIgnore(): boolean {
    this.processor.logger.info(`Checking if this ${this.type} should be ignored...`);

    return (
      this.isLocked$$() ||
      this.hasAllIgnoredLabels$$() ||
      this.hasAnyIgnoredLabels$$() ||
      this.hasAllIgnoredAssignees$$() ||
      this.hasAnyIgnoredAssignees$$() ||
      this.hasAllIgnoredProjects$$() ||
      this.hasAnyIgnoredProjects$$() ||
      this.hasAnyIgnoredMilestones$$() ||
      this.hasAllIgnoredMilestones$$() ||
      this.hasIgnoredCreationDate$$()
    );
  }

  public isLocked$$(): boolean {
    this.processor.logger.info(`Checking if this ${this.type} is locked...`);

    if (this._isLocked()) {
      this.processor.logger.info(`Locked`);
      this.processor.logger.debug(`We do not process locked ${this.type}s; it is in the name: locked`);

      return true;
    }

    this.processor.logger.info(`Not locked. Continuing...`);

    return false;
  }

  protected _getLabels(labels: ReadonlyArray<IGithubApiLabel>): string[] {
    return _.map(labels, (label: Readonly<IGithubApiLabel>): string => label.name);
  }

  protected _getAssignees(assignees: ReadonlyArray<IGithubApiAssignee>): string[] {
    return _.map(assignees, (assignee: Readonly<IGithubApiAssignee>): string => assignee.login);
  }

  protected _getProjectTitles(projects: ReadonlyArray<IGithubApiProject>): string[] {
    return _.map(projects, (project: Readonly<IGithubApiProject>): string => project.title);
  }

  private _isLocked(): boolean {
    return this.processor.item.locked;
  }

  public abstract hasAllIgnoredAssignees$$(): boolean;

  public abstract hasAllIgnoredProjects$$(): boolean;

  public abstract hasIgnoredCreationDate$$(): boolean;

  public abstract hasAllIgnoredLabels$$(): boolean;

  public abstract hasAnyIgnoredLabels$$(): boolean;

  public abstract hasAnyIgnoredAssignees$$(): boolean;

  public abstract hasAnyIgnoredProjects$$(): boolean;

  public abstract hasAnyIgnoredMilestones$$(): boolean;

  public abstract hasAllIgnoredMilestones$$(): boolean;
}
