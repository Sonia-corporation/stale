import { noticeCount } from '@core/outputs/annotations/notice-count';
import * as core from '@actions/core';
import faker from 'faker';

describe(`noticeCount()`, (): void => {
  let name: string;
  let count: number;

  let coreNoticeSpy: jest.SpyInstance;

  beforeEach((): void => {
    name = faker.random.words();

    coreNoticeSpy = jest.spyOn(core, `notice`).mockImplementation();
  });

  describe(`when the count is 0`, (): void => {
    beforeEach((): void => {
      count = 0;
    });

    it(`should not annotate a notice`, (): void => {
      expect.assertions(1);

      noticeCount(name, count);

      expect(coreNoticeSpy).not.toHaveBeenCalled();
    });
  });

  describe(`when the count is 1`, (): void => {
    beforeEach((): void => {
      count = 1;
    });

    it(`should annotate a notice`, (): void => {
      expect.assertions(2);

      noticeCount(name, count);

      expect(coreNoticeSpy).toHaveBeenCalledTimes(1);
      expect(coreNoticeSpy).toHaveBeenCalledWith(`${name}: 1`);
    });
  });
});
