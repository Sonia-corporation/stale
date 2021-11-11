import { IssueProcessor } from '@core/issues/issue-processor';
import { DateTime } from 'luxon';

// Days
const STALE_AFTER = 30;

export class IssueStaleProcessor {
  public readonly issueProcessor: IssueProcessor;

  public constructor(issueProcessor: Readonly<IssueProcessor>) {
    this.issueProcessor = issueProcessor;
  }

  public shouldStale(): boolean {
    return this.isStaleByUpdateDate$$();
  }

  public stale(): void {
    // @todo
  }

  public isStaleByUpdateDate$$(): boolean {
    const updatedAt: DateTime = this.issueProcessor.getUpdatedAt();

    return (
      DateTime.now().diff(updatedAt, `days`, {
        conversionAccuracy: `longterm`,
      }).days > STALE_AFTER
    );
  }
}
