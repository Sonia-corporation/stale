import { IGithubApiAssigneesPagination } from '@github/api/labels/interfaces/github-api-assignees-pagination.interface';
import { IGithubApiLabelsPagination } from '@github/api/labels/interfaces/github-api-labels-pagination.interface';
import { IGithubApiMilestone } from '@github/api/milestones/interfaces/github-api-milestone.interface';
import { IGithubApiProjectsPagination } from '@github/api/projects/interfaces/github-api-projects-pagination.interface';
import { IGithubApiPullRequestNumber } from '@github/api/pull-requests/github-api-pull-request-number';
import { IGithubApiReference } from '@github/api/references/interfaces/github-api-reference.interface';
import { IIso8601Date } from '@utils/dates/iso-8601';
import { IUuid } from '@utils/types/uuid';

export interface IGithubApiPullRequest {
  readonly assignees: IGithubApiAssigneesPagination;
  readonly createdAt: IIso8601Date;
  readonly headRef: IGithubApiReference;
  readonly id: IUuid;
  readonly isDraft: boolean;
  readonly labels: IGithubApiLabelsPagination;
  readonly locked: boolean;
  readonly milestone?: IGithubApiMilestone;
  readonly number: IGithubApiPullRequestNumber;
  readonly projectsV2: IGithubApiProjectsPagination;
  readonly updatedAt: IIso8601Date;
  readonly url: string;
}
