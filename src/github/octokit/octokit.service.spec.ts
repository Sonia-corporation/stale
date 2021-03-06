import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { OctokitService } from '@github/octokit/octokit.service';
import * as github from '@actions/github';
import { GitHub } from '@actions/github/lib/utils';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`OctokitService`, (): void => {
  describe(`initialize()`, (): void => {
    let setOctokitSpy: jest.SpyInstance;

    beforeEach((): void => {
      setOctokitSpy = jest.spyOn(OctokitService, `setOctokit`).mockImplementation();
    });

    it(`should create the GitHub octokit`, (): void => {
      expect.assertions(2);

      OctokitService.initialize();

      expect(setOctokitSpy).toHaveBeenCalledTimes(1);
      expect(setOctokitSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = OctokitService.initialize();

      expect(result).toStrictEqual(OctokitService);
    });
  });

  describe(`setOctokit()`, (): void => {
    let githubInstance: InstanceType<typeof GitHub>;
    let inputs: ICommonInputs;

    let setOctokitSpy: jest.SpyInstance;
    let commonInputsServiceGetInputsSpy: jest.SpyInstance;

    beforeEach((): void => {
      githubInstance = createHydratedMock<InstanceType<typeof GitHub>>({});
      inputs = createHydratedMock<ICommonInputs>({
        githubToken: `dummy github token`,
      });

      setOctokitSpy = jest.spyOn(github, `getOctokit`).mockReturnValue(githubInstance);
      commonInputsServiceGetInputsSpy = jest
        .spyOn(CommonInputsService.getInstance(), `getInputs`)
        .mockReturnValue(inputs);
    });

    it(`should create the GitHub octokit`, (): void => {
      expect.assertions(5);

      OctokitService.setOctokit();

      expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
      expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
      expect(setOctokitSpy).toHaveBeenCalledTimes(1);
      expect(setOctokitSpy).toHaveBeenCalledWith(`dummy github token`);
      expect(OctokitService.octokit$$).toStrictEqual(githubInstance);
    });

    it(`should return the GitHub octokit`, (): void => {
      expect.assertions(1);

      const result = OctokitService.setOctokit();

      expect(result).toStrictEqual(githubInstance);
    });
  });

  describe(`getOctokit()`, (): void => {
    describe(`when the inputs are unset`, (): void => {
      beforeEach((): void => {
        delete OctokitService.octokit$$;
      });

      it(`should throw an error`, (): void => {
        expect.assertions(1);

        expect((): InstanceType<typeof GitHub> => OctokitService.getOctokit()).toThrow(
          new Error(`The octokit is unset`)
        );
      });
    });

    describe(`when the octokit is set`, (): void => {
      let githubInstance: InstanceType<typeof GitHub>;

      beforeEach((): void => {
        githubInstance = createHydratedMock<InstanceType<typeof GitHub>>({});
        OctokitService.octokit$$ = githubInstance;
      });

      it(`should return the octokit`, (): void => {
        expect.assertions(1);

        const result = OctokitService.getOctokit();

        expect(result).toStrictEqual(githubInstance);
      });
    });
  });
});
