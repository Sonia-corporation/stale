import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IIssuesInputs } from '@core/inputs/interfaces/issues-inputs.interface';
import { IAllInputs } from '@core/inputs/types/all-inputs';
import { IssuesStatisticsService } from '@core/statistics/issues-statistics.service';
import { IIssuesStatistics } from '@core/statistics/types/issues-statistics';
import { GITHUB_API_ADD_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-add-comment-mutation';
import { GITHUB_API_CLOSE_ISSUE_MUTATION } from '@github/api/issues/constants/github-api-close-issue-mutation';
import { GITHUB_API_ISSUES_QUERY } from '@github/api/issues/constants/github-api-issues-query';
import { GITHUB_ISSUES_PER_PAGE } from '@github/api/issues/constants/github-issues-per-page';
import { IGithubApiGetIssues } from '@github/api/issues/interfaces/github-api-get-issues.interface';
import { IGithubApiIssue } from '@github/api/issues/interfaces/github-api-issue.interface';
import { GITHUB_API_ADD_LABEL_MUTATION } from '@github/api/labels/constants/github-api-add-label-mutation';
import { GITHUB_API_ADD_LABELS_MUTATION } from '@github/api/labels/constants/github-api-add-labels-mutation';
import { GITHUB_API_LABEL_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-label-by-name-query';
import { GITHUB_API_LABELS_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-labels-by-name-query';
import { GITHUB_API_REMOVE_LABEL_MUTATION } from '@github/api/labels/constants/github-api-remove-label-mutation';
import { GITHUB_API_REMOVE_LABELS_MUTATION } from '@github/api/labels/constants/github-api-remove-labels-mutation';
import { IGithubApiGetLabel } from '@github/api/labels/interfaces/github-api-get-label.interface';
import { IGithubApiGetLabels } from '@github/api/labels/interfaces/github-api-get-labels.interface';
import { GITHUB_API_PULL_REQUESTS_QUERY } from '@github/api/pull-requests/constants/github-api-pull-requests-query';
import { IGithubApiGetPullRequests } from '@github/api/pull-requests/interfaces/github-api-get-pull-requests.interface';
import { GITHUB_API_DELETE_REFERENCE_MUTATION } from '@github/api/references/constants/github-api-delete-reference-mutation';
import { GITHUB_API_TIMELINE_ITEMS_ISSUE_LABELED_EVENT_QUERY } from '@github/api/timeline-items/constants/github-api-timeline-items-issue-labeled-event-query';
import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
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
export class FakeIssuesProcessor extends AbstractFakeProcessor {
  /**
   * @description
   * A common place to create a standard random issue mock for
   * @param {Readonly<Partial<IGithubApiIssue>>} issue The partial issue to override the generated date
   * @returns {IGithubApiIssue} The issue
   * @private
   */
  private static _getMockedIssue(issue?: Readonly<Partial<IGithubApiIssue>>): IGithubApiIssue {
    return createHydratedMock<IGithubApiIssue>({
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
            project: {
              name: faker.datatype.string(),
            },
          },
        ],
        totalCount: 1,
      },
      updatedAt: faker.date.recent().toISOString(),
      url: faker.internet.url(),
      ...issue,
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
    [GITHUB_API_CLOSE_ISSUE_MUTATION](): Promise<void> {
      return Promise.resolve();
    },
    [GITHUB_API_DELETE_REFERENCE_MUTATION](): Promise<void> {
      return Promise.resolve();
    },
    [GITHUB_API_ISSUES_QUERY]: (): Promise<IGithubApiGetIssues> => {
      let firstBatchIssues: IGithubApiGetIssues;
      let secondBatchIssues: IGithubApiGetIssues | null;

      // @todo adapt to handle the multi-type of requests; here it will mock everything to the same value
      if (this._githubApiIssues.length > GITHUB_ISSUES_PER_PAGE) {
        firstBatchIssues = createHydratedMock<IGithubApiGetIssues>({
          repository: {
            issues: {
              nodes: _.chunk(this._githubApiIssues, GITHUB_ISSUES_PER_PAGE)[0],
              pageInfo: {
                endCursor: this._githubApiIssues.length > 1 ? faker.datatype.uuid() : undefined,
                hasNextPage: true,
              },
              totalCount: this._githubApiIssues.length,
            },
          },
        });
        secondBatchIssues = createHydratedMock<IGithubApiGetIssues>({
          repository: {
            issues: {
              nodes: _.chunk(this._githubApiIssues, GITHUB_ISSUES_PER_PAGE)[1],
              pageInfo: {
                endCursor: this._githubApiIssues.length > 1 ? faker.datatype.uuid() : undefined,
                hasNextPage: false,
              },
              totalCount: this._githubApiIssues.length,
            },
          },
        });
      } else {
        firstBatchIssues = createHydratedMock<IGithubApiGetIssues>({
          repository: {
            issues: {
              nodes: this._githubApiIssues,
              pageInfo: {
                endCursor: this._githubApiIssues.length > 1 ? faker.datatype.uuid() : undefined,
                hasNextPage: this._githubApiIssues.length > GITHUB_ISSUES_PER_PAGE,
              },
              totalCount: this._githubApiIssues.length,
            },
          },
        });
        secondBatchIssues = null;
      }

      if (this._githubApiIssuesFetchCount === 0) {
        this._githubApiIssuesFetchCount += 1;

        return Promise.resolve(firstBatchIssues);
      }

      if (this._githubApiIssuesFetchCount === 1) {
        this._githubApiIssuesFetchCount += 1;

        if (secondBatchIssues === null) {
          throw new Error(`Should not reach this code if your mocks are correct`);
        }

        return Promise.resolve(secondBatchIssues);
      }

      throw new Error(`The support of more than 2 batches is not yet implemented`);
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
    [GITHUB_API_PULL_REQUESTS_QUERY](): Promise<IGithubApiGetPullRequests> {
      const firstBatchPullRequests: IGithubApiGetPullRequests = createHydratedMock<IGithubApiGetPullRequests>({
        repository: {
          pullRequests: {
            nodes: [],
            pageInfo: {
              endCursor: undefined,
              hasNextPage: false,
            },
            totalCount: 0,
          },
        },
      });

      return Promise.resolve(firstBatchPullRequests);
    },
    [GITHUB_API_REMOVE_LABEL_MUTATION](): Promise<void> {
      return Promise.resolve();
    },
    [GITHUB_API_REMOVE_LABELS_MUTATION](): Promise<void> {
      return Promise.resolve();
    },
    [GITHUB_API_TIMELINE_ITEMS_ISSUE_LABELED_EVENT_QUERY](): Promise<IGithubApiTimelineItemsIssueLabeledEvents> {
      return Promise.resolve(
        createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
          repository: {
            issue: {
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

  private _githubApiIssues: IGithubApiIssue[] = [];
  private _githubApiIssuesFetchCount = 0;

  /**
   * @description
   * Create the SUT
   * You can pass the parameters to override the default inputs
   * @param {Readonly<Partial<ICommonInputs & IIssuesInputs>>} inputs The override inputs
   */
  public constructor(inputs?: Readonly<Partial<ICommonInputs & IIssuesInputs>>) {
    super();

    this._inputs = createHydratedMock<IAllInputs>({
      ...TEST_DEFAULT_INPUTS,
      ...inputs,
    });
  }

  /**
   * @description
   * Define the labels to add on the issue when it is stale
   * @param {ReadonlyArray<string>} labels The labels to add
   * @returns {FakeIssuesProcessor} The class
   */
  public setExtraAddedStaleLabels(labels: ReadonlyArray<string>): FakeIssuesProcessor {
    this._inputs = createHydratedMock<IAllInputs>(<IAllInputs>{
      ...this._inputs,
      issueAddLabelsAfterStale: labels,
    });

    return this;
  }

  /**
   * @description
   * Define the labels to remove on the issue when it is stale
   * @param {ReadonlyArray<string>} labels The labels to remove
   * @returns {FakeIssuesProcessor} The class
   */
  public setExtraRemoveStaleLabels(labels: ReadonlyArray<string>): FakeIssuesProcessor {
    this._inputs = createHydratedMock<IAllInputs>(<IAllInputs>{
      ...this._inputs,
      issueRemoveLabelsAfterStale: labels,
    });

    return this;
  }

  /**
   * @description
   * Enable the processing
   * @returns {FakeIssuesProcessor} The class
   */
  public enableProcessing(): FakeIssuesProcessor {
    this._inputs = createHydratedMock<IAllInputs>(<IAllInputs>{
      ...this._inputs,
      issueProcessing: true,
    });

    return this;
  }

  /**
   * @description
   * Disable the processing
   * @returns {FakeIssuesProcessor} The class
   */
  public disableProcessing(): FakeIssuesProcessor {
    this._inputs = createHydratedMock<IAllInputs>(<IAllInputs>{
      ...this._inputs,
      issueProcessing: false,
    });

    return this;
  }

  /**
   * @description
   * Define the labels to add on the issue when it is closed
   * @param {ReadonlyArray<string>} labels The labels to add
   * @returns {FakeIssuesProcessor} The class
   */
  public setExtraCloseLabels(labels: ReadonlyArray<string>): FakeIssuesProcessor {
    this._inputs = createHydratedMock<IAllInputs>(<IAllInputs>{
      ...this._inputs,
      issueAddLabelsAfterClose: labels,
    });

    return this;
  }

  /**
   * @description
   * Add a new issue to the list of issues
   * @param {Readonly<Partial<IGithubApiIssue>>} issue The issue to add
   * @returns {FakeIssuesProcessor} The class
   */
  public addIssue(issue?: Readonly<Partial<IGithubApiIssue>>): FakeIssuesProcessor {
    this._githubApiIssues.push(FakeIssuesProcessor._getMockedIssue(issue));

    return this;
  }

  /**
   * @description
   * Add x new issues to the list of issues
   * Note: the id cannot be passed and will be overridden anyhow to make sure each issue has a unique id
   * @param {Readonly<number>} count The number of issues to add
   * @param {Readonly<Partial<IGithubApiIssue>>} issue The issue to add (same template)
   * @returns {FakeIssuesProcessor} The class
   */
  public addIssues(
    count: Readonly<number>,
    issue?: Readonly<Partial<Exclude<IGithubApiIssue, 'id'>>>
  ): FakeIssuesProcessor {
    _.times(count, (): void => {
      this._githubApiIssues.push(
        FakeIssuesProcessor._getMockedIssue({
          ...issue,
          id: faker.datatype.uuid(),
        })
      );
    });

    return this;
  }

  /**
   * @description
   * Remove all the issues
   * @returns {FakeIssuesProcessor} The class
   */
  public removeAllIssues(): FakeIssuesProcessor {
    this._githubApiIssues = [];

    return this;
  }

  public mockTimelineItemsIssueLabeledEventQuery(
    result: () => Promise<IGithubApiTimelineItemsIssueLabeledEvents>
  ): FakeIssuesProcessor {
    this._apiMapper[GITHUB_API_TIMELINE_ITEMS_ISSUE_LABELED_EVENT_QUERY] = result;

    return this;
  }

  /**
   * @description
   * Shortcut to expect specific statistics values
   * Only fill the count higher than 0 to simplify
   * @param {Readonly<Partial<IIssuesStatistics>>} statistics The statistics count to expect
   */
  public expect(statistics: Readonly<Partial<IIssuesStatistics>> = {}): void {
    expect(IssuesStatisticsService.getInstance().addedIssuesCommentsCount).toBe(
      statistics.addedIssuesCommentsCount ?? 0
    );
    expect(IssuesStatisticsService.getInstance().addedIssuesLabelsCount).toBe(statistics.addedIssuesLabelsCount ?? 0);
    expect(IssuesStatisticsService.getInstance().removedIssuesLabelsCount).toBe(
      statistics.removedIssuesLabelsCount ?? 0
    );
    expect(IssuesStatisticsService.getInstance().alreadyStaleIssuesCount).toBe(statistics.alreadyStaleIssuesCount ?? 0);
    expect(IssuesStatisticsService.getInstance().calledApiIssuesMutationsCount).toBe(
      statistics.calledApiIssuesMutationsCount ?? 0
    );
    expect(IssuesStatisticsService.getInstance().calledApiIssuesQueriesCount).toBe(
      statistics.calledApiIssuesQueriesCount ?? 0
    );
    expect(IssuesStatisticsService.getInstance().closedIssuesCount).toBe(statistics.closedIssuesCount ?? 0);
    expect(IssuesStatisticsService.getInstance().ignoredIssuesCount).toBe(statistics.ignoredIssuesCount ?? 0);
    expect(IssuesStatisticsService.getInstance().processedIssuesCount).toBe(statistics.processedIssuesCount ?? 0);
    expect(IssuesStatisticsService.getInstance().removeStaleIssuesCount).toBe(statistics.removeStaleIssuesCount ?? 0);
    expect(IssuesStatisticsService.getInstance().staleIssuesCount).toBe(statistics.staleIssuesCount ?? 0);
    expect(IssuesStatisticsService.getInstance().unalteredIssuesCount).toBe(statistics.unalteredIssuesCount ?? 0);
  }
}
