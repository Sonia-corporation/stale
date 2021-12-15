import { IAllInputs } from '@core/inputs/types/all-inputs';
import { StaleService } from '@core/stale.service';
import { GITHUB_API_ADD_COMMENT_MUTATION } from '@github/api/comments/constants/github-api-add-comment-mutation';
import { GITHUB_API_ISSUES_QUERY } from '@github/api/issues/constants/github-api-issues-query';
import { IGithubApiGetIssues } from '@github/api/issues/interfaces/github-api-get-issues.interface';
import { GITHUB_API_ADD_LABEL_MUTATION } from '@github/api/labels/constants/github-api-add-label-mutation';
import { GITHUB_API_LABEL_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-label-by-name-query';
import { GITHUB_API_LABELS_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-labels-by-name-query';
import { GITHUB_API_REMOVE_LABEL_MUTATION } from '@github/api/labels/constants/github-api-remove-label-mutation';
import { IGithubApiGetLabel } from '@github/api/labels/interfaces/github-api-get-label.interface';
import { IGithubApiGetLabels } from '@github/api/labels/interfaces/github-api-get-labels.interface';
import { GITHUB_API_CLOSE_PULL_REQUEST_MUTATION } from '@github/api/pull-requests/constants/github-api-close-pull-request-mutation';
import { GITHUB_API_PULL_REQUESTS_QUERY } from '@github/api/pull-requests/constants/github-api-pull-requests-query';
import { GITHUB_PULL_REQUESTS_PER_PAGE } from '@github/api/pull-requests/constants/github-pull-requests-per-page';
import { IGithubApiGetPullRequests } from '@github/api/pull-requests/interfaces/github-api-get-pull-requests.interface';
import { IGithubApiPullRequest } from '@github/api/pull-requests/interfaces/github-api-pull-request.interface';
import { GITHUB_API_TIMELINE_ITEMS_PULL_REQUEST_LABELED_EVENT_QUERY } from '@github/api/timeline-items/constants/github-api-timeline-items-pull-request-labeled-event-query';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { TEST_DEFAULT_INPUTS } from '@tests/utils/test-default-inputs';
import * as core from '@actions/core';
import * as github from '@actions/github';
import { context } from '@actions/github';
import { GitHub } from '@actions/github/lib/utils';
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
export class FakePullRequestsProcessor {
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

  private readonly _inputs: IAllInputs;
  private _githubApiPullRequests: IGithubApiPullRequest[] = [];
  private _githubApiPullRequestsFetchCount = 0;
  private _apiMapper: Record<string, (data: Readonly<Record<string, unknown>>) => Promise<unknown>> = {
    [GITHUB_API_ADD_COMMENT_MUTATION](): Promise<void> {
      return Promise.resolve();
    },
    [GITHUB_API_ADD_LABEL_MUTATION](): Promise<void> {
      return Promise.resolve();
    },
    [GITHUB_API_CLOSE_PULL_REQUEST_MUTATION](): Promise<void> {
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

  /**
   * @description
   * Crate the SUT
   * You can pass the parameters to override the default inputs
   * @param {Readonly<Partial<IAllInputs>>} inputs The override inputs
   */
  public constructor(inputs?: Readonly<Partial<IAllInputs>>) {
    this._inputs = createHydratedMock<IAllInputs>({
      ...TEST_DEFAULT_INPUTS,
      ...inputs,
    });
  }

  /**
   * @description
   * This is the method which start the whole process
   * Call it when you are done with the arrange part
   * @returns {Promise<void>}
   */
  public async process(): Promise<void> {
    this._spy();

    await StaleService.initialize().catch((error: unknown): void => {
      console.error(`Caught error in the tests!`);
      console.error(error);

      throw error;
    });
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
   * All the spies to use to have a working process
   * @private
   */
  private _spy(): void {
    // Useful to set the inputs
    jest
      .spyOn(core, `getInput`)
      .mockImplementation(
        (name: Readonly<string>): string =>
          _.find(this._inputs, (_value, key: Readonly<string>): boolean => key === _.camelCase(name)) as string
      );
    jest
      .spyOn(core, `getBooleanInput`)
      .mockImplementation(
        (name: Readonly<string>): boolean =>
          _.find(this._inputs, (_value, key: Readonly<string>): boolean => key === _.camelCase(name)) as boolean
      );
    jest
      .spyOn(core, `getMultilineInput`)
      .mockImplementation(
        (name: Readonly<string>): string[] =>
          _.find(this._inputs, (_value, key: Readonly<string>): boolean => key === _.camelCase(name)) as string[]
      );

    // Useful for the calls to the GitHub API
    jest.spyOn(context, `repo`, `get`).mockReturnValue({
      owner: faker.random.word(),
      repo: faker.random.word(),
    });

    // Mock the GitHub API fetch of pull requests
    jest.spyOn(github, `getOctokit`).mockImplementation(
      (): InstanceType<typeof GitHub> =>
        createHydratedMock<InstanceType<typeof GitHub>>({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          graphql: jest
            .fn()
            .mockImplementation(
              (request: Readonly<string>, data: Readonly<Record<string, unknown>>): Promise<unknown> => {
                if (!_.has(this._apiMapper, request)) {
                  throw new Error(`Could not find in the API mapper the request "${request}"`);
                }

                return this._apiMapper[request](data);
              }
            ),
        })
    );
  }
}
