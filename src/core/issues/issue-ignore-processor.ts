import { InputsService } from '@core/inputs/inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { getDuplicates } from '@utils/arrays/get-duplicates';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';

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

    return this.hasAnyIgnoredLabels$$();
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

  public hasAnyIgnoredLabels$$(): boolean {
    this.issueProcessor.logger.info(`Checking if this issue has one of the ignored labels...`);

    const duplicatedLabels: string[] = getDuplicates(
      this._getLabels(this.issueProcessor.githubIssue.labels.nodes),
      InputsService.getInputs().issueIgnoreAnyLabels
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
          `labels attached on this issue. The pagination support is not yet implemented and may cause a mismatch!`
        )
      );
    }

    this.issueProcessor.logger.info(`Not containing an ignored label. Continuing...`);

    return false;
  }

  private _getLabels(labels: ReadonlyArray<IGithubApiLabel>): string[] {
    return _.map(labels, (label: Readonly<IGithubApiLabel>): string => label.name);
  }
}
