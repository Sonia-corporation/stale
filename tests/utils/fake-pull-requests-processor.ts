import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { IAllInputs } from '@core/inputs/types/all-inputs';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { IPullRequestsStatistics } from '@core/statistics/types/pull-requests-statistics';
import { GITHUB_API_ADD_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-add-comment-mutation';
import { GITHUB_API_ISSUES_QUERY } from '@github/api/issues/constants/github-api-issues-query';
import { IGithubApiGetIssues } from '@github/api/issues/interfaces/github-api-get-issues.interface';
import { GITHUB_API_ADD_LABEL_MUTATION } from '@github/api/labels/constants/github-api-add-label-mutation';
import { GITHUB_API_ADD_LABELS_MUTATION } from '@github/api/labels/constants/github-api-add-labels-mutation';
import { GITHUB_API_LABEL_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-label-by-name-query';
import { GITHUB_API_LABELS_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-labels-by-name-query';
import { GITHUB_API_REMOVE_LABEL_MUTATION } from '@github/api/labels/constants/github-api-remove-label-mutation';
import { IGithubApiGetLabel } from '@github/api/labels/interfaces/github-api-get-label.interface';
import { IGithubApiGetLabels } from '@github/api/labels/interfaces/github-api-get-labels.interface';
import { GITHUB_API_CLOSE_PULL_REQUEST_MUTATION } from '@github/api/pull-requests/constants/github-api-close-pull-request-mutation';
import { GITHUB_API_DRAFT_PULL_REQUEST_MUTATION } from '@github/api/pull-requests/constants/github-api-draft-pull-request-mutation';
import { GITHUB_API_PULL_REQUESTS_QUERY } from '@github/api/pull-requests/constants/github-api-pull-requests-query';
import { GITHUB_PULL_REQUESTS_PER_PAGE } from '@github/api/pull-requests/constants/github-pull-requests-per-page';
import { IGithubApiGetPullRequests } from '@github/api/pull-requests/interfaces/github-api-get-pull-requests.interface';
import { IGithubApiPullRequest } from '@github/api/pull-requests/interfaces/github-api-pull-request.interface';
import { GITHUB_API_DELETE_REFERENCE_MUTATION } from '@github/api/references/constants/github-api-delete-reference-mutation';
import { GITHUB_API_TIMELINE_ITEMS_PULL_REQUEST_LABELED_EVENT_QUERY } from '@github/api/timeline-items/constants/github-api-timeline-items-pull-request-labeled-event-query';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { AbstractFakeProcessor } from '@tests/utils/abstract-fake-processor';
import { TEST_DEFAULT_INPUTS } from '@tests/utils/test-default-inputs';
import faker from 'faker';
import _ from 'lodash';
import { createHydratedMock } from 'ts-auto-mock';

/**
 * @description
 * This is the helper to test in a way which is rather close to the real process
 * Perfect for integration testing
 * The goal is to mock the least among of code to have the real code called
 * So the logs are visible, and we have a local way to test a feature
 */
export class FakePullRequestsProcessor extends AbstractFakeProcessor {
  /**
   * @description
   * A common place to create a standard random pull request mock for
   * @param {Readonly<Partial<IGithubApiPullRequest>>} pullRequest The partial pull request to override the generated date
   * @returns {IGithubApiPullRequest} The pull request
   * @private
   */
  private static _getMockedPullRequest(pullRequest?: Readonly<Partial<IGithubApiPullRequest>>): IGithubApiPullRequest {
    return createHydratedMock<IGithubApiPullRequest>({
      assignees: {
        nodes: [
          {
            login: faker.name.firstName(),
          },
        ],
        totalCount: 1,
      },
      createdAt: faker.date.past().toISOString(),
      id: faker.datatype.uuid(),
      labels: {
        nodes: [
          {
            id: faker.datatype.uuid(),
            name: faker.random.word(),
          },
        ],
        totalCount: 1,
      },
      locked: faker.datatype.boolean(),
      number: faker.datatype.number(),
      projectCards: {
        nodes: [
          {
            id: faker.datatype.uuid(),
          },
        ],
        totalCount: 1,
      },
      updatedAt: faker.date.recent().toISOString(),
      url: faker.internet.url(),
      ...pullRequest,
    });
  }

  protected _inputs: IAllInputs;
  protected _apiMapper: Record<string, (data: Readonly<Record<string, unknown>>) => Promise<unknown>> = {
    [GITHUB_API_ADD_COMMENT_MUTATION](): Promise<void> {
      return Promise.resolve();
    },
    [GITHUB_API_ADD_LABEL_MUTATION](): Promise<void> {
      return Promise.resolve();
    },
    [GITHUB_API_ADD_LABELS_MUTATION](): Promise<void> {
      return Promise.resolve();
    },
    [GITHUB_API_CLOSE_PULL_REQUEST_MUTATION](): Promise<void> {
      return Promise.resolve();
    },
    [GITHUB_API_DELETE_REFERENCE_MUTATION](): Promise<void> {
      return Promise.resolve();
    },
    [GITHUB_API_DRAFT_PULL_REQUEST_MUTATION](): Promise<void> {
      return Promise.resolve();
    },
    [GITHUB_API_ISSUES_QUERY](): Promise<IGithubApiGetIssues> {
      const firstBatchIssues: IGithubApiGetIssues = createHydratedMock<IGithubApiGetIssues>({
        repository: {
          issues: {
            nodes: [],
            pageInfo: {
              endCursor: undefined,
              hasNextPage: false,
            },
            totalCount: 0,
          },
        },
      });

      return Promise.resolve(firstBatchIssues);
    },
    [GITHUB_API_LABEL_BY_NAME_QUERY](data: Readonly<Record<string, unknown>>): Promise<IGithubApiGetLabel> {
      if (!_.isString(data.labelName)) {
        throw new Error(`The labelName is not a string`);
      }

      return Promise.resolve(
        createHydratedMock<IGithubApiGetLabel>({
          repository: {
            label: {
              id: faker.datatype.uuid(),
              name: data.labelName,
            },
          },
        })
      );
    },
    [GITHUB_API_LABELS_BY_NAME_QUERY](data: Readonly<Record<string, unknown>>): Promise<IGithubApiGetLabels> {
      if (!_.isString(data.labelName)) {
        throw new Error(`The labelName is not a string`);
      }

      return Promise.resolve(
        createHydratedMock<IGithubApiGetLabels>({
          repository: {
            labels: {
              nodes: [
                {
                  id: faker.datatype.uuid(),
                  name: data.labelName,
                },
              ],
              totalCount: 1,
            },
          },
        })
      );
    },
    [GITHUB_API_PULL_REQUESTS_QUERY]: (): Promise<IGithubApiGetPullRequests> => {
      let firstBatchPullRequests: IGithubApiGetPullRequests;
      let secondBatchPullRequests: IGithubApiGetPullRequests | null;

      // @todo adapt to handle the multi-type of requests; here it will mock everything to the same value
      if (this._githubApiPullRequests.length > GITHUB_PULL_REQUESTS_PER_PAGE) {
        firstBatchPullRequests = createHydratedMock<IGithubApiGetPullRequests>({
          repository: {
            pullRequests: {
              nodes: _.chunk(this._githubApiPullRequests, GITHUB_PULL_REQUESTS_PER_PAGE)[0],
              pageInfo: {
                endCursor: this._githubApiPullRequests.length > 1 ? faker.datatype.uuid() : undefined,
                hasNextPage: true,
              },
              totalCount: this._githubApiPullRequests.length,
            },
          },
        });
        secondBatchPullRequests = createHydratedMock<IGithubApiGetPullRequests>({
          repository: {
            pullRequests: {
              nodes: _.chunk(this._githubApiPullRequests, GITHUB_PULL_REQUESTS_PER_PAGE)[1],
              pageInfo: {
                endCursor: this._githubApiPullRequests.length > 1 ? faker.datatype.uuid() : undefined,
                hasNextPage: false,
              },
              totalCount: this._githubApiPullRequests.length,
            },
          },
        });
      } else {
        firstBatchPullRequests = createHydratedMock<IGithubApiGetPullRequests>({
          repository: {
            pullRequests: {
              nodes: this._githubApiPullRequests,
              pageInfo: {
                endCursor: this._githubApiPullRequests.length > 1 ? faker.datatype.uuid() : undefined,
                hasNextPage: this._githubApiPullRequests.length > GITHUB_PULL_REQUESTS_PER_PAGE,
              },
              totalCount: this._githubApiPullRequests.length,
            },
          },
        });
        secondBatchPullRequests = null;
      }

      if (this._githubApiPullRequestsFetchCount === 0) {
        this._githubApiPullRequestsFetchCount += 1;

        return Promise.resolve(firstBatchPullRequests);
      }

      if (this._githubApiPullRequestsFetchCount === 1) {
        this._githubApiPullRequestsFetchCount += 1;

        if (secondBatchPullRequests === null) {
          throw new Error(`Should not reach this code if your mocks are correct`);
        }

        return Promise.resolve(secondBatchPullRequests);
      }

      throw new Error(`The support of more than 2 batches is not yet implemented`);
    },
    [GITHUB_API_REMOVE_LABEL_MUTATION](): Promise<void> {
      return Promise.resolve();
    },
    [GITHUB_API_TIMELINE_ITEMS_PULL_REQUEST_LABELED_EVENT_QUERY](): Promise<IGithubApiTimelineItemsPullRequestLabeledEvents> {
      return Promise.resolve(
        createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
          repository: {
            pullRequest: {
              timelineItems: {
                filteredCount: 1,
                nodes: [
                  {
                    createdAt: faker.date.recent().toISOString(),
                    label: {
                      id: faker.datatype.uuid(),
                      name: faker.random.word(),
                    },
                  },
                ],
                pageCount: 1,
              },
            },
          },
        })
      );
    },
  };

  private _githubApiPullRequests: IGithubApiPullRequest[] = [];
  private _githubApiPullRequestsFetchCount = 0;

  /**
   * @description
   * Crate the SUT
   * You can pass the parameters to override the default inputs
   * @param {Readonly<Partial<ICommonInputs & IPullRequestsInputs>>} inputs The override inputs
   */
  public constructor(inputs?: Readonly<Partial<ICommonInputs & IPullRequestsInputs>>) {
    super();

    this._inputs = createHydratedMock<IAllInputs>({
      ...TEST_DEFAULT_INPUTS,
      ...inputs,
    });
  }

  /**
   * @description
   * Define the labels to add on the pull request when it is stale
   * @param {ReadonlyArray<string>} labels The labels to add
   * @returns {FakePullRequestsProcessor} The class
   */
  public setExtraStaleLabels(labels: ReadonlyArray<string>): FakePullRequestsProcessor {
    this._inputs = createHydratedMock<IAllInputs>(<IAllInputs>{
      ...this._inputs,
      pullRequestAddLabelsAfterStale: labels,
    });

    return this;
  }

  /**
   * @description
   * Enable the processing
   * @returns {FakePullRequestsProcessor} The class
   */
  public enableProcessing(): FakePullRequestsProcessor {
    this._inputs = createHydratedMock<IAllInputs>(<IAllInputs>{
      ...this._inputs,
      pullRequestProcessing: true,
    });

    return this;
  }

  /**
   * @description
   * Disable the processing
   * @returns {FakePullRequestsProcessor} The class
   */
  public disableProcessing(): FakePullRequestsProcessor {
    this._inputs = createHydratedMock<IAllInputs>(<IAllInputs>{
      ...this._inputs,
      pullRequestProcessing: false,
    });

    return this;
  }

  /**
   * @description
   * Enable the draft processing (draft instead of stale)
   * @returns {FakePullRequestsProcessor} The class
   */
  public enableDraftProcessing(): FakePullRequestsProcessor {
    this._inputs = createHydratedMock<IAllInputs>(<IAllInputs>{
      ...this._inputs,
      pullRequestToDraftInsteadOfStale: true,
    });

    return this;
  }

  /**
   * @description
   * Disable the draft processing (stale instead of draft)
   * @returns {FakePullRequestsProcessor} The class
   */
  public disableDraftProcessing(): FakePullRequestsProcessor {
    this._inputs = createHydratedMock<IAllInputs>(<IAllInputs>{
      ...this._inputs,
      pullRequestToDraftInsteadOfStale: false,
    });

    return this;
  }

  /**
   * @description
   * Define the labels to add on the pull request when it is closed
   * @param {ReadonlyArray<string>} labels The labels to add
   * @returns {FakePullRequestsProcessor} The class
   */
  public setExtraCloseLabels(labels: ReadonlyArray<string>): FakePullRequestsProcessor {
    this._inputs = createHydratedMock<IAllInputs>(<IAllInputs>{
      ...this._inputs,
      pullRequestAddLabelsAfterClose: labels,
    });

    return this;
  }

  /**
   * @description
   * Add a new pull request to the list of pull requests
   * @param {Readonly<Partial<IGithubApiPullRequest>>} pullRequest The pull request to add
   * @returns {FakePullRequestsProcessor} The class
   */
  public addPullRequest(pullRequest?: Readonly<Partial<IGithubApiPullRequest>>): FakePullRequestsProcessor {
    this._githubApiPullRequests.push(FakePullRequestsProcessor._getMockedPullRequest(pullRequest));

    return this;
  }

  /**
   * @description
   * Add x new pull requests to the list of pull requests
   * Note: the id cannot be passed and will be overridden anyhow to make sure each pull request has a unique id
   * @param {Readonly<number>} count The number of pull requests to add
   * @param {Readonly<Partial<IGithubApiPullRequest>>} pullRequest The pull request to add (same template)
   * @returns {FakePullRequestsProcessor} The class
   */
  public addPullRequests(
    count: Readonly<number>,
    pullRequest?: Readonly<Partial<Exclude<IGithubApiPullRequest, 'id'>>>
  ): FakePullRequestsProcessor {
    _.times(count, (): void => {
      this._githubApiPullRequests.push(
        FakePullRequestsProcessor._getMockedPullRequest({
          ...pullRequest,
          id: faker.datatype.uuid(),
        })
      );
    });

    return this;
  }

  /**
   * @description
   * Remove all the pull requests
   * @returns {FakePullRequestsProcessor} The class
   */
  public removeAllPullRequests(): FakePullRequestsProcessor {
    this._githubApiPullRequests = [];

    return this;
  }

  public mockTimelineItemsPullRequestLabeledEventQuery(
    result: () => Promise<IGithubApiTimelineItemsPullRequestLabeledEvents>
  ): FakePullRequestsProcessor {
    this._apiMapper[GITHUB_API_TIMELINE_ITEMS_PULL_REQUEST_LABELED_EVENT_QUERY] = result;

    return this;
  }

  /**
   * @description
   * Shortcut to expect specific statistics values
   * Only fill the count higher than 0 to simplify
   * @param {Readonly<Partial<IPullRequestsStatistics>>} statistics The statistics count to expect
   */
  public expect(statistics: Readonly<Partial<IPullRequestsStatistics>>): void {
    expect(PullRequestsStatisticsService.getInstance().processedPullRequestsCount).toBe(
      statistics.processedPullRequestsCount ?? 0
    );
    expect(PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount).toBe(
      statistics.ignoredPullRequestsCount ?? 0
    );
    expect(PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount).toBe(
      statistics.unalteredPullRequestsCount ?? 0
    );
    expect(PullRequestsStatisticsService.getInstance().stalePullRequestsCount).toBe(
      statistics.stalePullRequestsCount ?? 0
    );
    expect(PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount).toBe(
      statistics.alreadyStalePullRequestsCount ?? 0
    );
    expect(PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount).toBe(
      statistics.removeStalePullRequestsCount ?? 0
    );
    expect(PullRequestsStatisticsService.getInstance().closedPullRequestsCount).toBe(
      statistics.closedPullRequestsCount ?? 0
    );
    expect(PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount).toBe(
      statistics.addedPullRequestsCommentsCount ?? 0
    );
    expect(PullRequestsStatisticsService.getInstance().deletedPullRequestsBranchesCount).toBe(
      statistics.deletedPullRequestsBranchesCount ?? 0
    );
    expect(PullRequestsStatisticsService.getInstance().addedPullRequestsLabelsCount).toBe(
      statistics.addedPullRequestsLabelsCount ?? 0
    );
    expect(PullRequestsStatisticsService.getInstance().draftPullRequestsCount).toBe(
      statistics.draftPullRequestsCount ?? 0
    );
    expect(PullRequestsStatisticsService.getInstance().calledApiPullRequestsMutationsCount).toBe(
      statistics.calledApiPullRequestsMutationsCount ?? 0
    );
    expect(PullRequestsStatisticsService.getInstance().calledApiPullRequestsQueriesCount).toBe(
      statistics.calledApiPullRequestsQueriesCount ?? 0
    );
  }
}
