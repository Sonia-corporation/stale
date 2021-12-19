import { EPullRequestsOutputs } from '@core/outputs/enums/pull-requests-outputs.enum';
import { PullRequestsOutputsService } from '@core/outputs/pull-requests-outputs.service';
import { PullRequestsStatisticsService } from '@core/statistics/pull-requests-statistics.service';
import { LoggerService } from '@utils/loggers/logger.service';
import * as core from '@actions/core';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestsOutputsService`, (): void => {
  describe(`setOutputs()`, (): void => {
    let loggerServiceInfoSpy: jest.SpyInstance;
    let coreSetOutputSpy: jest.SpyInstance;

    beforeEach((): void => {
      loggerServiceInfoSpy = jest.spyOn(LoggerService, `info`).mockImplementation();
      coreSetOutputSpy = jest.spyOn(core, `setOutput`).mockImplementation();
    });

    it(`should log about setting the pull requests outputs`, (): void => {
      expect.assertions(2);

      PullRequestsOutputsService.setOutputs();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(1, `Creating the pull requests outputs...`);
    });

    it(`should set the statistics outputs`, (): void => {
      expect.assertions(9);
      PullRequestsStatisticsService.getInstance().processedPullRequestsCount$$ = 1;
      PullRequestsStatisticsService.getInstance().ignoredPullRequestsCount$$ = 1;
      PullRequestsStatisticsService.getInstance().unalteredPullRequestsCount$$ = 1;
      PullRequestsStatisticsService.getInstance().stalePullRequestsCount$$ = 1;
      PullRequestsStatisticsService.getInstance().alreadyStalePullRequestsCount$$ = 1;
      PullRequestsStatisticsService.getInstance().removeStalePullRequestsCount$$ = 1;
      PullRequestsStatisticsService.getInstance().closedPullRequestsCount$$ = 1;
      PullRequestsStatisticsService.getInstance().addedPullRequestsCommentsCount$$ = 1;

      PullRequestsOutputsService.setOutputs();

      expect(coreSetOutputSpy).toHaveBeenCalledTimes(8);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(1, EPullRequestsOutputs.ALREADY_STALE_PULL_REQUESTS_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(2, EPullRequestsOutputs.IGNORED_PULL_REQUESTS_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(3, EPullRequestsOutputs.UNALTERED_PULL_REQUESTS_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(4, EPullRequestsOutputs.STALE_PULL_REQUESTS_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(5, EPullRequestsOutputs.PROCESSED_PULL_REQUESTS_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(6, EPullRequestsOutputs.REMOVE_STALE_PULL_REQUESTS_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(7, EPullRequestsOutputs.CLOSE_PULL_REQUESTS_COUNT, 1);
      expect(coreSetOutputSpy).toHaveBeenNthCalledWith(8, EPullRequestsOutputs.ADDED_PULL_REQUESTS_COMMENTS_COUNT, 1);
    });

    it(`should log about the end of the pull requests output setup`, (): void => {
      expect.assertions(2);

      PullRequestsOutputsService.setOutputs();

      expect(loggerServiceInfoSpy).toHaveBeenCalledTimes(2);
      expect(loggerServiceInfoSpy).toHaveBeenNthCalledWith(2, `Pull requests outputs created`);
    });

    it(`should return the service`, (): void => {
      expect.assertions(1);

      const result = PullRequestsOutputsService.setOutputs();

      expect(result).toStrictEqual(PullRequestsOutputsService);
    });
  });
});
