import { IssuesOutputsService } from '@core/outputs/issues-outputs.service';
import { OutputsService } from '@core/outputs/outputs.service';
import { PullRequestsOutputsService } from '@core/outputs/pull-requests-outputs.service';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`OutputsService`, (): void => {
  describe(`setOutputs()`, (): void => {
    let issuesOutputsServiceSetOutputsSpy: jest.SpyInstance;
    let pullRequestsOutputsServiceSetOutputsSpy: jest.SpyInstance;

    beforeEach((): void => {
      issuesOutputsServiceSetOutputsSpy = jest.spyOn(IssuesOutputsService, `setOutputs`).mockImplementation();
      pullRequestsOutputsServiceSetOutputsSpy = jest
        .spyOn(PullRequestsOutputsService, `setOutputs`)
        .mockImplementation();
    });

    it(`should set the issues statistics outputs`, (): void => {
      expect.assertions(2);

      OutputsService.setOutputs();

      expect(issuesOutputsServiceSetOutputsSpy).toHaveBeenCalledTimes(1);
      expect(issuesOutputsServiceSetOutputsSpy).toHaveBeenCalledWith();
    });

    it(`should set the pull requests statistics outputs`, (): void => {
      expect.assertions(2);

      OutputsService.setOutputs();

      expect(pullRequestsOutputsServiceSetOutputsSpy).toHaveBeenCalledTimes(1);
      expect(pullRequestsOutputsServiceSetOutputsSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = OutputsService.setOutputs();

      expect(result).toStrictEqual(OutputsService);
    });
  });
});
