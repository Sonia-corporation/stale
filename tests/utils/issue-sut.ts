import { IInputs } from '@core/inputs/inputs.interface';
import { StaleService } from '@core/stale.service';
import { IGithubApiIssue } from '@github/api/issues/github-api-issue.interface';
import { IGithubApiIssues } from '@github/api/issues/github-api-issues.interface';
import { GITHUB_ISSUES_PER_PAGE } from '@github/api/issues/issues-per-page';
import * as core from '@actions/core';
import { context } from '@actions/github';
import * as github from '@actions/github';
import { GitHub } from '@actions/github/lib/utils';
import _ from 'lodash';
import { createHydratedMock } from 'ts-auto-mock';

/**
 * @description
 * This is the helper to test in a way which is rather close to the real process
 * Perfect for integration testing
 * The goal is to mock the least among of code to have the real code called
 * So the logs are visible and we have a local way to test a feature
 */
export class IssueSut {
  private readonly _inputs: IInputs;
  private _githubApiIssues: IGithubApiIssue[] = [];

  /**
   * @description
   * Crate the SUT
   * You can pass the parameters to override the default inputs
   * @param {Readonly<Partial<IInputs>>} inputs The override inputs
   */
  public constructor(
    inputs: Readonly<Partial<IInputs>> = {
      dryRun: false,
      githubToken: `dummy-github-token`,
    }
  ) {
    this._inputs = createHydratedMock<IInputs>(inputs);
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
   * @returns {IssueSut} The class
   */
  public addIssue(issue: Readonly<Partial<IGithubApiIssue>> = {}): IssueSut {
    this._githubApiIssues.push(createHydratedMock<IGithubApiIssue>(issue));

    return this;
  }

  /**
   * @description
   * Remove all the issues
   * @returns {IssueSut} The class
   */
  public removeAllIssues(): IssueSut {
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
      owner: `dummy-owner`,
      repo: `dummy-repo`,
    });

    // Mock the GitHub API fetch of issues
    jest.spyOn(github, `getOctokit`).mockImplementation(
      (): InstanceType<typeof GitHub> =>
        createHydratedMock<InstanceType<typeof GitHub>>({
          // @todo adapt to handle the multi-type of requests; here it will mock everything to the same value
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          graphql: jest.fn().mockResolvedValue(
            createHydratedMock<IGithubApiIssues>({
              repository: {
                issues: {
                  nodes: this._githubApiIssues,
                  pageInfo: {
                    hasNextPage: this._githubApiIssues.length > GITHUB_ISSUES_PER_PAGE,
                  },
                  totalCount: this._githubApiIssues.length,
                },
              },
            })
          ),
        })
    );
  }
}
