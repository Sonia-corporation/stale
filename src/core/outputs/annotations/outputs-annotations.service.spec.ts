import { IssuesOutputsAnnotationsService } from '@core/outputs/annotations/issues-outputs-annotations.service';
import { OutputsAnnotationsService } from '@core/outputs/annotations/outputs-annotations.service';
import { PullRequestsOutputsAnnotationsService } from '@core/outputs/annotations/pull-requests-outputs-annotations.service';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`OutputsAnnotationsService`, (): void => {
  describe(`noticeAllOutputs()`, (): void => {
    let issuesOutputsAnnotationsServiceNoticeAllOutputsSpy: jest.SpyInstance;
    let pullRequestsOutputsAnnotationsServiceNoticeAllOutputsSpy: jest.SpyInstance;

    beforeEach((): void => {
      issuesOutputsAnnotationsServiceNoticeAllOutputsSpy = jest
        .spyOn(IssuesOutputsAnnotationsService.getInstance(), `noticeAllOutputs`)
        .mockImplementation();
      pullRequestsOutputsAnnotationsServiceNoticeAllOutputsSpy = jest
        .spyOn(PullRequestsOutputsAnnotationsService.getInstance(), `noticeAllOutputs`)
        .mockImplementation();
    });

    it(`should log the issues outputs annotations`, (): void => {
      expect.assertions(2);

      OutputsAnnotationsService.noticeAllOutputs();

      expect(issuesOutputsAnnotationsServiceNoticeAllOutputsSpy).toHaveBeenCalledTimes(1);
      expect(issuesOutputsAnnotationsServiceNoticeAllOutputsSpy).toHaveBeenCalledWith();
    });

    it(`should log the pull requests outputs annotations`, (): void => {
      expect.assertions(2);

      OutputsAnnotationsService.noticeAllOutputs();

      expect(pullRequestsOutputsAnnotationsServiceNoticeAllOutputsSpy).toHaveBeenCalledTimes(1);
      expect(pullRequestsOutputsAnnotationsServiceNoticeAllOutputsSpy).toHaveBeenCalledWith();
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = OutputsAnnotationsService.noticeAllOutputs();

      expect(result).toStrictEqual(OutputsAnnotationsService);
    });
  });
});
