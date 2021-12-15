import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IIso8601Date } from '@utils/dates/iso-8601';

export interface IGithubApiTimelineItemsPullRequestLabeledEvent {
  readonly createdAt: IIso8601Date;
  readonly label: IGithubApiLabel;
}
