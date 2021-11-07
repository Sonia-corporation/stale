import { IssueProcessor } from '@core/issues/issue-processor';

export class IssueIgnoreProcessor {
  public readonly issueProcessor: IssueProcessor;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
  }

  public shouldIgnore(): boolean {
    this.issueProcessor.logger.info(`Checking if this issue should be ignored...`);

    if (this.isLocked$$()) {
      return true;
    }

    return false;
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
}
