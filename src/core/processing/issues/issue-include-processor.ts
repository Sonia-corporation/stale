import { EInputs } from '@core/inputs/inputs.enum';
import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { AbstractIncludeProcessor } from '@core/processing/abstract-include-processor';
import { IssueProcessor } from '@core/processing/issues/issue-processor';
import { GithubApiIssuesService } from '@github/api/issues/github-api-issues.service';
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

    if (this.processor.item.projectCards.nodes.length === 0) {
      this.processor.logger.info(`Not containing any project card. Skipping the processing of this issue...`);

      return false;
    }

    const duplicatedProjectNames: string[] = getDuplicates(
      this._getProjectNames(this.processor.item.projectCards.nodes),
      issuesInputs.issueOnlyAnyProjectCards
    );
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
        startLine: 76,
        title: `Warning`,
      });
    }

    this.processor.logger.info(
      `Not containing any of the required project card. Skipping the processing of this issue...`
    );

    return false;
  }
}
