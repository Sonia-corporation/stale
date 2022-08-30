import { AbstractOutputsAnnotationsService } from '@core/outputs/annotations/abstract-outputs-annotations.service';
import { noticeCount } from '@core/outputs/annotations/notice-count';
import { EPullRequestsOutputs } from '@core/outputs/enums/pull-requests-outputs.enum';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { getEnumKeys } from '@utils/enums/get-enum-keys';
import _ from 'lodash';

const MAP: { [key in keyof typeof EPullRequestsOutputs]: () => void } = {
  ADDED_PULL_REQUESTS_COMMENTS_COUNT(): void {
    noticeCount(
      `Added pull requests comments`,
      PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount
    );
  },
  ADDED_PULL_REQUESTS_LABELS_COUNT(): void {
    noticeCount(`Added pull requests labels`, PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount);
  },
  ALREADY_STALE_PULL_REQUESTS_COUNT(): void {
    noticeCount(
      `Already stale pull requests`,
      PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount
    );
  },
  CALLED_API_PULL_REQUESTS_COUNT(): void {
    noticeCount(`Called api pull requests`, PullRequestsStatisticsService.getInstance().calledApiPullRequestsCount);
  },
  CALLED_API_PULL_REQUESTS_MUTATIONS_COUNT(): void {
    noticeCount(
      `Called api pull requests mutations`,
      PullRequestsStatisticsService.getInstance().calledApiPullRequestsMutationsCount
    );
  },
  CALLED_API_PULL_REQUESTS_QUERIES_COUNT(): void {
    noticeCount(
      `Called api pull requests queries`,
      PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount
    );
  },
  CLOSE_PULL_REQUESTS_COUNT(): void {
    noticeCount(`Closed pull requests`, PullRequestsStatisticsService.getInstance().closedPullRequestsCount);
  },
  DELETED_PULL_REQUESTS_BRANCHES_COUNT(): void {
    noticeCount(
      `Deleted pull requests branches`,
      PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount
    );
  },
  DRAFT_PULL_REQUESTS_COUNT(): void {
    noticeCount(`Draft pull requests`, PullRequestsStatisticsService.getInstance().draftPullRequestsCount);
  },
  IGNORED_PULL_REQUESTS_COUNT(): void {
    noticeCount(`Ignored pull requests`, PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount);
  },
  PROCESSED_PULL_REQUESTS_COUNT(): void {
    noticeCount(`Processed pull requests`, PullRequestsStatisticsService.getInstance().processedPullRequestsCount);
  },
  PULL_REQUESTS_LABELS_COUNT(): void {
    noticeCount(`Pull requests labels`, PullRequestsStatisticsService.getInstance().pullRequestsLabelsCount);
  },
  REMOVE_STALE_PULL_REQUESTS_COUNT(): void {
    noticeCount(`Remove stale pull requests`, PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount);
  },
  REMOVED_PULL_REQUESTS_LABELS_COUNT(): void {
    noticeCount(
      `Removed pull requests labels`,
      PullRequestsStatisticsService.getInstance().removedPullRequestsLabelsCount
    );
  },
  STALE_PULL_REQUESTS_COUNT(): void {
    noticeCount(`Stale pull requests`, PullRequestsStatisticsService.getInstance().stalePullRequestsCount);
  },
  UNALTERED_PULL_REQUESTS_COUNT(): void {
    noticeCount(`Unaltered pull requests`, PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount);
  },
};

export class PullRequestsOutputsAnnotationsService extends AbstractOutputsAnnotationsService {
  private static _instance: PullRequestsOutputsAnnotationsService;

  public static getInstance(): PullRequestsOutputsAnnotationsService {
    if (_.isNil(PullRequestsOutputsAnnotationsService._instance)) {
      PullRequestsOutputsAnnotationsService._instance = new PullRequestsOutputsAnnotationsService();
    }

    return PullRequestsOutputsAnnotationsService._instance;
  }

  protected readonly _outputsName: 'pull requests' = `pull requests`;

  protected _noticeAllOutputs(): void {
    getEnumKeys(EPullRequestsOutputs).forEach((key): void => {
      MAP[key]();
    });
  }
}
