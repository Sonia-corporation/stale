import { IGithubApiIssueNumber } from '@github/api/issues/github-api-issue-number';
import { IGithubApiAssigneesPagination } from '@github/api/labels/interfaces/github-api-assignees-pagination.interface';
import { IGithubApiLabelsPagination } from '@github/api/labels/interfaces/github-api-labels-pagination.interface';
import { IGithubApiMilestone } from '@github/api/milestones/interfaces/github-api-milestone.interface';
import { IGithubApiProjectsPagination } from '@github/api/projects/interfaces/github-api-projects-pagination.interface';
import { IIso8601Date } from '@utils/dates/iso-8601';
import { IUuid } from '@utils/types/uuid';

export interface IGithubApiIssue {
  readonly assignees: IGithubApiAssigneesPagination;
  readonly createdAt: IIso8601Date;
  readonly id: IUuid;
  readonly labels: IGithubApiLabelsPagination;
  readonly locked: boolean;
  readonly milestone?: IGithubApiMilestone;
  readonly number: IGithubApiIssueNumber;
  readonly projects: IGithubApiProjectsPagination;
  readonly updatedAt: IIso8601Date;
  readonly url: string;
}
