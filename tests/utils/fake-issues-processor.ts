import { IInputs } from '@core/inputs/inputs.interface';
import { StaleService } from '@core/stale.service';
import { IGithubApiIssue } from '@github/api/issues/github-api-issue.interface';
import { IGithubApiIssues } from '@github/api/issues/github-api-issues.interface';
import { GITHUB_ISSUES_PER_PAGE } from '@github/api/issues/github-issues-per-page';
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
      locked: faker.datatype.boolean(),
      number: faker.datatype.number(),
      updatedAt: faker.date.recent().toISOString(),
      url: faker.internet.url(),
      ...issue,
    });
  }

  private readonly _inputs: IInputs;
  private _githubApiIssues: IGithubApiIssue[] = [];

  /**
   * @description
   * Crate the SUT
   * You can pass the parameters to override the default inputs
   * @param {Readonly<Partial<IInputs>>} inputs The override inputs
   */
  public constructor(inputs?: Readonly<Partial<IInputs>>) {
    this._inputs = createHydratedMock<IInputs>({
      dryRun: false,
      githubToken: faker.datatype.uuid(),
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
   * Add some new locked issues to the list of issues
   * @param {Readonly<number>} count The number of issues to add
   * @returns {FakeIssuesProcessor} The class
   */
  public addXLockedIssues(count: Readonly<number>): FakeIssuesProcessor {
    _.times(count, (): void => {
      this._githubApiIssues.push(
        FakeIssuesProcessor._getMockedIssue({
          locked: true,
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
        (name: string): string =>
          _.find(this._inputs, (_value, key: string): boolean => key === _.camelCase(name)) as string
      );
    jest
      .spyOn(core, `getBooleanInput`)
      .mockImplementation(
        (name: string): boolean =>
          _.find(this._inputs, (_value, key: string): boolean => key === _.camelCase(name)) as boolean
      );

    // Useful for the calls to the GitHub API
    jest.spyOn(context, `repo`, `get`).mockReturnValue({
      owner: faker.random.word(),
      repo: faker.random.word(),
    });

    // Mock the GitHub API fetch of issues
    jest.spyOn(github, `getOctokit`).mockImplementation((): InstanceType<typeof GitHub> => {
      let firstBatchIssues: IGithubApiIssues;
      let secondBatchIssues: IGithubApiIssues;

      if (this._githubApiIssues.length > GITHUB_ISSUES_PER_PAGE) {
        firstBatchIssues = createHydratedMock<IGithubApiIssues>({
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
        secondBatchIssues = createHydratedMock<IGithubApiIssues>({
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

        return createHydratedMock<InstanceType<typeof GitHub>>({
          // @todo adapt to handle the multi-type of requests; here it will mock everything to the same value
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          graphql: jest
            .fn()
            .mockImplementation((): never => {
              // @todo support an infinity of batches (dunno how to have X mockResolvedValueOnce calls)
              throw new Error(`The support of more than 2 batches is not yet implemented`);
            })
            .mockResolvedValueOnce(firstBatchIssues)
            .mockResolvedValueOnce(secondBatchIssues),
        });
      }

      firstBatchIssues = createHydratedMock<IGithubApiIssues>({
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

      return createHydratedMock<InstanceType<typeof GitHub>>({
        // @todo adapt to handle the multi-type of requests; here it will mock everything to the same value
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        graphql: jest
          .fn()
          .mockImplementation((): never => {
            throw new Error(`This code should never be reached else there is a risk of infinite loop`);
          })
          .mockResolvedValueOnce(firstBatchIssues),
      });
    });
  }
}
