import { IGithubApiIssueNumber } from '@github/api/issues/github-api-issue-number';

export interface IGitHubApiIssue {
  readonly createdAt: string;
  readonly locked: boolean;
  readonly number: IGithubApiIssueNumber;
  readonly updatedAt: string;
  readonly url: string;
}
