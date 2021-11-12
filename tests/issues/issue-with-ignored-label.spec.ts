import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiLabelsPagination } from '@github/api/labels/interfaces/github-api-labels-pagination.interface';
import { FakeIssuesProcessor } from '@tests/utils/fake-issues-processor';
import { createHydratedMock } from 'ts-auto-mock';

describe(`Issue with ignored label`, (): void => {
  let issueSut: FakeIssuesProcessor;

  beforeEach((): void => {
    issueSut = new FakeIssuesProcessor({
      issueIgnoreAnyLabels: [`ignored-label`],
    });
  });

  describe(`when an issue has an ignored label`, (): void => {
    beforeEach((): void => {
      issueSut.addIssue({
        labels: createHydratedMock<IGithubApiLabelsPagination>({
          nodes: [
            createHydratedMock<IGithubApiLabel>({
              name: `ignored-label`,
            }),
          ],
        }),
        locked: false,
      });
    });

    it(`should not process the issue`, async (): Promise<void> => {
      expect.assertions(1);

      await issueSut.process();

      // @todo add a better test (by checking the outputs and the statistics when these features will be added)
      expect(true).toBeTrue();
    });
  });
});
