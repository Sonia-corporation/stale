import { IGithubApiIssueNumber } from '@github/api/issues/github-api-issue-number';
import { IGithubApiLabelsPagination } from '@github/api/labels/interfaces/github-api-labels-pagination.interface';
import { IIso8601Date } from '@utils/dates/iso-8601';
import { IUuid } from '@utils/dates/uuid';

export interface IGithubApiIssue {
  readonly createdAt: IIso8601Date;
  readonly id: IUuid;
  readonly labels: IGithubApiLabelsPagination;
  readonly locked: boolean;
  readonly number: IGithubApiIssueNumber;
  readonly updatedAt: IIso8601Date;
  readonly url: string;
}
