import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { AbstractProcessor } from '@utils/processors/abstract-processor';

export abstract class AbstractIsStaleProcessor<
  TProcessor extends IssueProcessor | PullRequestProcessor
> extends AbstractProcessor<TProcessor> {
  protected constructor(processor: Readonly<TProcessor>) {
    super(processor);
  }

  public isStale(): boolean {
    this.processor.logger.info(`Checking if the ${this.type} is already stale...`);

    const staleLabel: IGithubApiLabel | undefined = this._getStaleLabel();

    if (staleLabel) {
      this.processor.logger.info(`The stale label is already added on this ${this.type}`);

      return true;
    }

    this.processor.logger.info(`The stale label is not yet on this ${this.type}`);

    return false;
  }

  private _getStaleLabel(): IGithubApiLabel | undefined {
    const staleLabel: string = this._getInputStaleLabel();

    return this._getLabels().find((label: Readonly<IGithubApiLabel>): boolean => label.name === staleLabel);
  }

  protected abstract _getLabels(): IGithubApiLabel[];

  protected abstract _getInputStaleLabel(): string;
}
