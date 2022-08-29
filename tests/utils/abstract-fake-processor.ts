import { IAllInputs } from '@core/inputs/types/all-inputs';
import { StaleService } from '@core/stale.service';
import * as core from '@actions/core';
import * as github from '@actions/github';
import { context } from '@actions/github';
import { GitHub } from '@actions/github/lib/utils';
import faker from 'faker';
import _ from 'lodash';
import { createHydratedMock } from 'ts-auto-mock';

export abstract class AbstractFakeProcessor {
  protected abstract _inputs: IAllInputs;

  protected abstract _apiMapper: Record<string, (data: Readonly<Record<string, unknown>>) => Promise<unknown>>;

  /**
   * @description
   * Enable the dry-run mode to skip some part of the process
   * @returns {AbstractFakeProcessor} The class
   */
  public dryRun(): AbstractFakeProcessor {
    this._inputs = createHydratedMock<IAllInputs>(<IAllInputs>{
      ...this._inputs,
      dryRun: true,
    });

    return this;
  }

  /**
   * @description
   * Disable the dry-run mode to include every part of the process
   * @returns {AbstractFakeProcessor} The class
   */
  public normalRun(): AbstractFakeProcessor {
    this._inputs = createHydratedMock<IAllInputs>(<IAllInputs>{
      ...this._inputs,
      dryRun: false,
    });

    return this;
  }

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

  public abstract expect(statistics: Readonly<Partial<Record<string, number>>>): void;

  public abstract setExtraAddedStaleLabels(labels: ReadonlyArray<string>): AbstractFakeProcessor;

  public abstract enableProcessing(): AbstractFakeProcessor;

  public abstract disableProcessing(): AbstractFakeProcessor;

  public abstract setExtraCloseLabels(labels: ReadonlyArray<string>): AbstractFakeProcessor;
}
