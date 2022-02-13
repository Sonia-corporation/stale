import { AbstractOutputsAnnotationsService } from '@core/outputs/annotations/abstract-outputs-annotations.service';
import { noticeCount } from '@core/outputs/annotations/notice-count';
import { EIssuesOutputs } from '@core/outputs/enums/issues-outputs.enum';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { getEnumKeys } from '@utils/enums/get-enum-keys';
import _ from 'lodash';

const MAP: { [key in keyof typeof EIssuesOutputs]: () => void } = {
  ADDED_ISSUES_COMMENTS_COUNT(): void {
    noticeCount(`Added issues comments`, IssuesStatisticsService.getInstance().addedIssuesCommentsCount);
  },
  ADDED_ISSUES_LABELS_COUNT(): void {
    noticeCount(`Added issues labels`, IssuesStatisticsService.getInstance().addedIssuesLabelsCount);
  },
  ALREADY_STALE_ISSUES_COUNT(): void {
    noticeCount(`Already stale issues`, IssuesStatisticsService.getInstance().alreadyStaleIssuesCount);
  },
  CALLED_API_ISSUES_COUNT(): void {
    noticeCount(`Called api issues`, IssuesStatisticsService.getInstance().calledApiIssuesCount);
  },
  CALLED_API_ISSUES_MUTATIONS_COUNT(): void {
    noticeCount(`Called api issues mutations`, IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount);
  },
  CALLED_API_ISSUES_QUERIES_COUNT(): void {
    noticeCount(`Called api issues queries`, IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount);
  },
  CLOSE_ISSUES_COUNT(): void {
    noticeCount(`Close issues`, IssuesStatisticsService.getInstance().closedIssuesCount);
  },
  IGNORED_ISSUES_COUNT(): void {
    noticeCount(`Ignored issues`, IssuesStatisticsService.getInstance().ignoredIssuesCount);
  },
  PROCESSED_ISSUES_COUNT(): void {
    noticeCount(`Processed issues`, IssuesStatisticsService.getInstance().processedIssuesCount);
  },
  REMOVE_STALE_ISSUES_COUNT(): void {
    noticeCount(`Remove stale issues`, IssuesStatisticsService.getInstance().removeStaleIssuesCount);
  },
  STALE_ISSUES_COUNT(): void {
    noticeCount(`Stale issues`, IssuesStatisticsService.getInstance().staleIssuesCount);
  },
  UNALTERED_ISSUES_COUNT(): void {
    noticeCount(`Unaltered issues`, IssuesStatisticsService.getInstance().unalteredIssuesCount);
  },
};

export class IssuesOutputsAnnotationsService extends AbstractOutputsAnnotationsService {
  private static _instance: IssuesOutputsAnnotationsService;

  public static getInstance(): IssuesOutputsAnnotationsService {
    if (_.isNil(IssuesOutputsAnnotationsService._instance)) {
      IssuesOutputsAnnotationsService._instance = new IssuesOutputsAnnotationsService();
    }

    return IssuesOutputsAnnotationsService._instance;
  }

  protected readonly _outputsName: 'issues' = `issues`;

  protected _noticeAllOutputs(): void {
    getEnumKeys(EIssuesOutputs).forEach((key): void => {
      MAP[key]();
    });
  }
}
