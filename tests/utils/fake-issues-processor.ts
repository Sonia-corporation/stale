import { IInputs } from '@core/inputs/inputs.interface';
import { StaleService } from '@core/stale.service';
import { GITHUB_API_CLOSE_ISSUE_MUTATION } from '@github/api/issues/constants/github-api-close-issue-mutation';
import { GITHUB_API_ISSUES_QUERY } from '@github/api/issues/constants/github-api-issues-query';
import { GITHUB_ISSUES_PER_PAGE } from '@github/api/issues/constants/github-issues-per-page';
import { IGithubApiGetIssues } from '@github/api/issues/interfaces/github-api-get-issues.interface';
import { IGithubApiIssue } from '@github/api/issues/interfaces/github-api-issue.interface';
import { GITHUB_API_ADD_LABEL_MUTATION } from '@github/api/labels/constants/github-api-add-label-mutation';
import { GITHUB_API_LABEL_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-label-by-name-query';
import { GITHUB_API_LABELS_BY_NAME_QUERY } from '@github/api/labels/constants/github-api-labels-by-name-query';
import { GITHUB_API_REMOVE_LABEL_MUTATION } from '@github/api/labels/constants/github-api-remove-label-mutation';
import { IGithubApiGetLabel } from '@github/api/labels/interfaces/github-api-get-label.interface';
import { IGithubApiGetLabels } from '@github/api/labels/interfaces/github-api-get-labels.interface';
import { GITHUB_API_TIMELINE_ITEMS_ISSUE_LABELED_EVENT_QUERY } from '@github/api/timeline-items/constants/github-api-timeline-items-issue-labeled-event-query';
import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
import { TEST_DEFAULT_INPUTS } from '@tests/utils/test-default-inputs';
import * as core from '@actions/core';
import { context } from '@actions/github';
import * as github from '@actions/github';
import { GitHub } from '@actions/github/lib/utils';
import faker from 'faker';
import _ from 'lodash';
import { createHydratedMock } from 'ts-auto-mock';

/**
 * @description
 * This is the helper to test in a way which is rather close to the real process
 * Perfect for integration testing
 * The goal is to mock the least among of code to have the real code called
 * So the logs are visible and we have a local way to test a feature
 */
export class FakeIssuesProcessor {
  /**
   * @description
   * A common place to create a standard random issue mock for
   * @param {Readonly<Partial<IGithubApiIssue>>} issue The partial issue to override the generated date
   * @returns {IGithubApiIssue} The issue
   * @private
   */
  private static _getMockedIssue(issue?: Readonly<Partial<IGithubApiIssue>>): IGithubApiIssue {
    return createHydratedMock<IGithubApiIssue>({
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
      updatedAt: faker.date.recent().toISOString(),
      url: faker.internet.url(),
      ...issue,
    });
  }

  private readonly _inputs: IInputs;
  private _githubApiIssues: IGithubApiIssue[] = [];
  private _githubApiIssuesFetchCount = 0;
  private _apiMapper: Record<string, (data: Readonly<Record<string, unknown>>) => Promise<unknown>> = {
    [GITHUB_API_ADD_LABEL_MUTATION](): Promise<void> {
      return Promise.resolve();
    },
    [GITHUB_API_CLOSE_ISSUE_MUTATION](): Promise<void> {
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
    [GITHUB_API_REMOVE_LABEL_MUTATION](): Promise<void> {
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

  /**
   * @description
   * Crate the SUT
   * You can pass the parameters to override the default inputs
   * @param {Readonly<Partial<IInputs>>} inputs The override inputs
   */
  public constructor(inputs?: Readonly<Partial<IInputs>>) {
    this._inputs = createHydratedMock<IInputs>({
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

    await StaleService.initialize();
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

    // Mock the GitHub API fetch of issues
    jest.spyOn(github, `getOctokit`).mockImplementation(
      (): InstanceType<typeof GitHub> =>
        createHydratedMock<InstanceType<typeof GitHub>>({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          graphql: jest
            .fn()
            .mockImplementation(
              (request: Readonly<string>, data: Readonly<Record<string, unknown>>): Promise<unknown> =>
                this._apiMapper[request](data)
            ),
        })
    );
  }
}
