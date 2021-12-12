import { IssuesOutputsService } from '@core/outputs/issues-outputs.service';
import { OutputsService } from '@core/outputs/outputs.service';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`OutputsService`, (): void => {
  describe(`setOutputs()`, (): void => {
    let issuesOutputsServiceSetOutputsSpy: jest.SpyInstance;

    beforeEach((): void => {
      issuesOutputsServiceSetOutputsSpy = jest.spyOn(IssuesOutputsService, `setOutputs`).mockImplementation();
    });

    it(`should set the issues statistics outputs`, (): void => {
      expect.assertions(2);

      OutputsService.setOutputs();

      expect(issuesOutputsServiceSetOutputsSpy).toHaveBeenCalledTimes(1);
      expect(issuesOutputsServiceSetOutputsSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = OutputsService.setOutputs();

      expect(result).toStrictEqual(OutputsService);
    });
  });
});
