import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { ICommonInputs } from '@core/inputs/interfaces/common-inputs.interface';
import { IPullRequestsInputs } from '@core/inputs/interfaces/pull-requests-inputs.interface';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';
import { PullRequestProcessor } from '@core/processing/pull-requests/pull-request-processor';
import { PullRequestRemoveStaleProcessor } from '@core/processing/pull-requests/pull-request-remove-stale-processor';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsPullRequestLabeledEvent } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-event.interface';
import { IGithubApiTimelineItemsPullRequestLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-pull-request-labeled-events.interface';
import { IUuid } from '@utils/types/uuid';
import faker from 'faker';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`PullRequestRemoveStaleProcessor`, (): void => {
  let pullRequestProcessor: PullRequestProcessor;

  beforeEach((): void => {
    pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given pull request processor`, (): void => {
      expect.assertions(1);

      const result = new PullRequestRemoveStaleProcessor(pullRequestProcessor);

      expect(result.processor).toStrictEqual(pullRequestProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let pullRequestRemoveStaleProcessor: PullRequestRemoveStaleProcessor;

    beforeEach((): void => {
      pullRequestProcessor = createHydratedMock<PullRequestProcessor>();
    });

    describe(`shouldRemoveStale()`, (): void => {
      let githubApiPullRequestTimelineItemsServiceFetchPullRequestAddedLabelsSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerErrorSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
          githubPullRequest: {
            number: 888,
          },
        });
        pullRequestRemoveStaleProcessor = new PullRequestRemoveStaleProcessor(pullRequestProcessor);

        githubApiPullRequestTimelineItemsServiceFetchPullRequestAddedLabelsSpy = jest
          .spyOn(
            pullRequestRemoveStaleProcessor.githubApiPullRequestTimelineItemsService$$,
            `fetchPullRequestAddedLabels`
          )
          .mockResolvedValue(createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>());
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestStaleLabel: `stale`,
            })
          );
        pullRequestProcessorLoggerInfoSpy = jest.spyOn(pullRequestProcessor.logger, `info`).mockImplementation();
        pullRequestProcessorLoggerErrorSpy = jest.spyOn(pullRequestProcessor.logger, `error`).mockImplementation();
      });

      it(`should fetch all the labels added events on this pull request`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(pullRequestRemoveStaleProcessor.shouldRemoveStale()).rejects.toThrow(
          new Error(`Could not find the stale label in the added labels events`)
        );

        expect(githubApiPullRequestTimelineItemsServiceFetchPullRequestAddedLabelsSpy).toHaveBeenCalledTimes(1);
        expect(githubApiPullRequestTimelineItemsServiceFetchPullRequestAddedLabelsSpy).toHaveBeenCalledWith(888);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if the stale state should be removed...`
        );
      });

      describe(`when no event is related to the addition of the stale label`, (): void => {
        beforeEach((): void => {
          githubApiPullRequestTimelineItemsServiceFetchPullRequestAddedLabelsSpy.mockResolvedValue(
            createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
              repository: {
                pullRequest: {
                  timelineItems: {
                    nodes: [
                      createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvent>({
                        label: {
                          name: `dummy`,
                        },
                      }),
                    ],
                  },
                },
              },
            })
          );
        });

        it(`should throw an error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(pullRequestRemoveStaleProcessor.shouldRemoveStale()).rejects.toThrow(
            new Error(`Could not find the stale label in the added labels events`)
          );

          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Could not find the stale label in the added labels events`
          );
        });
      });

      describe(`when there is at least one event related to the addition of the stale label`, (): void => {
        beforeEach((): void => {
          githubApiPullRequestTimelineItemsServiceFetchPullRequestAddedLabelsSpy.mockResolvedValue(
            createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
              repository: {
                pullRequest: {
                  timelineItems: {
                    nodes: [
                      createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvent>({
                        label: {
                          name: `stale`,
                        },
                      }),
                    ],
                  },
                },
              },
            })
          );
        });

        describe(`when the last update on the pull request is more recent that the addition of the stale label event`, (): void => {
          beforeEach((): void => {
            jest.spyOn(pullRequestProcessor, `getUpdatedAt`).mockReturnValue(DateTime.utc(2020));

            pullRequestRemoveStaleProcessor = new PullRequestRemoveStaleProcessor(pullRequestProcessor);

            githubApiPullRequestTimelineItemsServiceFetchPullRequestAddedLabelsSpy = jest
              .spyOn(
                pullRequestRemoveStaleProcessor.githubApiPullRequestTimelineItemsService$$,
                `fetchPullRequestAddedLabels`
              )
              .mockResolvedValue(
                createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
                  repository: {
                    pullRequest: {
                      timelineItems: {
                        nodes: [
                          createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvent>({
                            createdAt: DateTime.utc(2019).toISO({
                              includeOffset: false,
                            }),
                            label: {
                              name: `stale`,
                            },
                          }),
                        ],
                      },
                    },
                  },
                })
              );
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestStaleLabel: `stale`,
                })
              );
            pullRequestProcessorLoggerInfoSpy = jest.spyOn(pullRequestProcessor.logger, `info`).mockImplementation();
          });

          it(`should return true`, async (): Promise<void> => {
            expect.assertions(7);

            const result = await pullRequestRemoveStaleProcessor.shouldRemoveStale();

            expect(result).toBeTrue();
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(6);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `Found`,
              `value-1`,
              `whiteBright-stale label added event on this pull request`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The stale label was added the`,
              `date-01/01/2019, 00:00:00`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The pull request was updated for the last time the`,
              `date-01/01/2020, 00:00:00`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `The last update on the pull request is more recent that the last time it was stale`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(6, `The stale state should be removed`);
          });
        });

        describe(`when the last update on the pull request is older or equal to the addition of the stale label event`, (): void => {
          beforeEach((): void => {
            jest.spyOn(pullRequestProcessor, `getUpdatedAt`).mockReturnValue(DateTime.utc(2020));

            pullRequestRemoveStaleProcessor = new PullRequestRemoveStaleProcessor(pullRequestProcessor);

            githubApiPullRequestTimelineItemsServiceFetchPullRequestAddedLabelsSpy = jest
              .spyOn(
                pullRequestRemoveStaleProcessor.githubApiPullRequestTimelineItemsService$$,
                `fetchPullRequestAddedLabels`
              )
              .mockResolvedValue(
                createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
                  repository: {
                    pullRequest: {
                      timelineItems: {
                        nodes: [
                          createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvent>({
                            createdAt: DateTime.utc(2021).toISO({
                              includeOffset: false,
                            }),
                            label: {
                              name: `stale`,
                            },
                          }),
                        ],
                      },
                    },
                  },
                })
              );
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestStaleLabel: `stale`,
                })
              );
            pullRequestProcessorLoggerInfoSpy = jest.spyOn(pullRequestProcessor.logger, `info`).mockImplementation();
          });

          it(`should return false`, async (): Promise<void> => {
            expect.assertions(7);

            const result = await pullRequestRemoveStaleProcessor.shouldRemoveStale();

            expect(result).toBeFalse();
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(6);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `Found`,
              `value-1`,
              `whiteBright-stale label added event on this pull request`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The stale label was added the`,
              `date-01/01/2021, 00:00:00`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The pull request was updated for the last time the`,
              `date-01/01/2020, 00:00:00`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `There was no update since the last time this pull request was stale`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              6,
              `The stale state should not be removed`
            );
          });
        });
      });

      describe(`when there are multiple events related to the addition of the stale label`, (): void => {
        beforeEach((): void => {
          githubApiPullRequestTimelineItemsServiceFetchPullRequestAddedLabelsSpy.mockResolvedValue(
            createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
              repository: {
                pullRequest: {
                  timelineItems: {
                    nodes: [
                      createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvent>({
                        label: {
                          name: `stale`,
                        },
                      }),
                      createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvent>({
                        label: {
                          name: `stale`,
                        },
                      }),
                    ],
                  },
                },
              },
            })
          );
        });

        describe(`when the last update on the pull request is more recent that the addition of all the stale label events`, (): void => {
          beforeEach((): void => {
            jest.spyOn(pullRequestProcessor, `getUpdatedAt`).mockReturnValue(DateTime.utc(2020));

            pullRequestRemoveStaleProcessor = new PullRequestRemoveStaleProcessor(pullRequestProcessor);

            githubApiPullRequestTimelineItemsServiceFetchPullRequestAddedLabelsSpy = jest
              .spyOn(
                pullRequestRemoveStaleProcessor.githubApiPullRequestTimelineItemsService$$,
                `fetchPullRequestAddedLabels`
              )
              .mockResolvedValue(
                createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
                  repository: {
                    pullRequest: {
                      timelineItems: {
                        nodes: [
                          createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvent>({
                            createdAt: DateTime.utc(2019).toISO({
                              includeOffset: false,
                            }),
                            label: {
                              name: `stale`,
                            },
                          }),
                          createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvent>({
                            createdAt: DateTime.utc(2019).toISO({
                              includeOffset: false,
                            }),
                            label: {
                              name: `stale`,
                            },
                          }),
                        ],
                      },
                    },
                  },
                })
              );
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestStaleLabel: `stale`,
                })
              );
            pullRequestProcessorLoggerInfoSpy = jest.spyOn(pullRequestProcessor.logger, `info`).mockImplementation();
          });

          it(`should return true`, async (): Promise<void> => {
            expect.assertions(7);

            const result = await pullRequestRemoveStaleProcessor.shouldRemoveStale();

            expect(result).toBeTrue();
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(6);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `Found`,
              `value-2`,
              `whiteBright-stale label added events on this pull request`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The stale label was added the`,
              `date-01/01/2019, 00:00:00`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The pull request was updated for the last time the`,
              `date-01/01/2020, 00:00:00`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `The last update on the pull request is more recent that the last time it was stale`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(6, `The stale state should be removed`);
          });
        });

        describe(`when the last update on the pull request is older or equal to the addition of all the stale label events (ascending)`, (): void => {
          beforeEach((): void => {
            jest.spyOn(pullRequestProcessor, `getUpdatedAt`).mockReturnValue(DateTime.utc(2020));

            pullRequestRemoveStaleProcessor = new PullRequestRemoveStaleProcessor(pullRequestProcessor);

            githubApiPullRequestTimelineItemsServiceFetchPullRequestAddedLabelsSpy = jest
              .spyOn(
                pullRequestRemoveStaleProcessor.githubApiPullRequestTimelineItemsService$$,
                `fetchPullRequestAddedLabels`
              )
              .mockResolvedValue(
                createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
                  repository: {
                    pullRequest: {
                      timelineItems: {
                        nodes: [
                          createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvent>({
                            createdAt: DateTime.utc(2019).toISO({
                              includeOffset: false,
                            }),
                            label: {
                              name: `stale`,
                            },
                          }),
                          createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvent>({
                            createdAt: DateTime.utc(2021).toISO({
                              includeOffset: false,
                            }),
                            label: {
                              name: `stale`,
                            },
                          }),
                        ],
                      },
                    },
                  },
                })
              );
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestStaleLabel: `stale`,
                })
              );
            pullRequestProcessorLoggerInfoSpy = jest.spyOn(pullRequestProcessor.logger, `info`).mockImplementation();
          });

          it(`should return false`, async (): Promise<void> => {
            expect.assertions(7);

            const result = await pullRequestRemoveStaleProcessor.shouldRemoveStale();

            expect(result).toBeFalse();
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(6);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `Found`,
              `value-2`,
              `whiteBright-stale label added events on this pull request`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The stale label was added the`,
              `date-01/01/2021, 00:00:00`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The pull request was updated for the last time the`,
              `date-01/01/2020, 00:00:00`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `There was no update since the last time this pull request was stale`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              6,
              `The stale state should not be removed`
            );
          });
        });

        describe(`when the last update on the pull request is older or equal to the addition of all the stale label events (descensing)`, (): void => {
          beforeEach((): void => {
            jest.spyOn(pullRequestProcessor, `getUpdatedAt`).mockReturnValue(DateTime.utc(2020));

            pullRequestRemoveStaleProcessor = new PullRequestRemoveStaleProcessor(pullRequestProcessor);

            githubApiPullRequestTimelineItemsServiceFetchPullRequestAddedLabelsSpy = jest
              .spyOn(
                pullRequestRemoveStaleProcessor.githubApiPullRequestTimelineItemsService$$,
                `fetchPullRequestAddedLabels`
              )
              .mockResolvedValue(
                createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvents>({
                  repository: {
                    pullRequest: {
                      timelineItems: {
                        nodes: [
                          createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvent>({
                            createdAt: DateTime.utc(2021).toISO({
                              includeOffset: false,
                            }),
                            label: {
                              name: `stale`,
                            },
                          }),
                          createHydratedMock<IGithubApiTimelineItemsPullRequestLabeledEvent>({
                            createdAt: DateTime.utc(2019).toISO({
                              includeOffset: false,
                            }),
                            label: {
                              name: `stale`,
                            },
                          }),
                        ],
                      },
                    },
                  },
                })
              );
            pullRequestsInputsServiceGetInputsSpy = jest
              .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<IPullRequestsInputs>({
                  pullRequestStaleLabel: `stale`,
                })
              );
            pullRequestProcessorLoggerInfoSpy = jest.spyOn(pullRequestProcessor.logger, `info`).mockImplementation();
          });

          it(`should return false`, async (): Promise<void> => {
            expect.assertions(7);

            const result = await pullRequestRemoveStaleProcessor.shouldRemoveStale();

            expect(result).toBeFalse();
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(6);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `Found`,
              `value-2`,
              `whiteBright-stale label added events on this pull request`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The stale label was added the`,
              `date-01/01/2021, 00:00:00`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The pull request was updated for the last time the`,
              `date-01/01/2020, 00:00:00`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `There was no update since the last time this pull request was stale`
            );
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              6,
              `The stale state should not be removed`
            );
          });
        });
      });
    });

    describe(`removeStale()`, (): void => {
      let pullRequestStaleLabel: string;
      let staleLabelId: IUuid;
      let pullRequestId: IUuid;

      let githubApiPullRequestLabelsServiceFetchLabelByNameSpy: jest.SpyInstance;
      let commonInputsServiceGetInputsSpy: jest.SpyInstance;
      let pullRequestsInputsServiceGetInputsSpy: jest.SpyInstance;
      let githubApiPullRequestLabelsServiceRemoveLabelSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerInfoSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerNoticeSpy: jest.SpyInstance;
      let pullRequestProcessorLoggerErrorSpy: jest.SpyInstance;

      beforeEach((): void => {
        pullRequestStaleLabel = faker.random.word();
        staleLabelId = faker.datatype.uuid();
        pullRequestId = faker.datatype.uuid();
        pullRequestProcessor = createHydratedMock<PullRequestProcessor>({
          githubPullRequest: {
            id: pullRequestId,
          },
        });
        pullRequestRemoveStaleProcessor = new PullRequestRemoveStaleProcessor(pullRequestProcessor);

        githubApiPullRequestLabelsServiceFetchLabelByNameSpy = jest
          .spyOn(pullRequestRemoveStaleProcessor.githubApiPullRequestLabelsService$$, `fetchLabelByName`)
          .mockResolvedValue(
            createHydratedMock<IGithubApiLabel>({
              id: staleLabelId,
            })
          );
        commonInputsServiceGetInputsSpy = jest.spyOn(CommonInputsService.getInstance(), `getInputs`).mockReturnValue(
          createHydratedMock<ICommonInputs>({
            dryRun: false,
          })
        );
        pullRequestsInputsServiceGetInputsSpy = jest
          .spyOn(PullRequestsInputsService.getInstance(), `getInputs`)
          .mockReturnValue(
            createHydratedMock<IPullRequestsInputs>({
              pullRequestStaleLabel,
            })
          );
        githubApiPullRequestLabelsServiceRemoveLabelSpy = jest
          .spyOn(pullRequestRemoveStaleProcessor.githubApiPullRequestLabelsService$$, `removeLabel`)
          .mockImplementation();
        pullRequestProcessorLoggerInfoSpy = jest
          .spyOn(pullRequestRemoveStaleProcessor.processor.logger, `info`)
          .mockImplementation();
        pullRequestProcessorLoggerNoticeSpy = jest
          .spyOn(pullRequestRemoveStaleProcessor.processor.logger, `notice`)
          .mockImplementation();
        pullRequestProcessorLoggerErrorSpy = jest
          .spyOn(pullRequestRemoveStaleProcessor.processor.logger, `error`)
          .mockImplementation();
      });

      it(`should fetch the stale label id from the repository`, async (): Promise<void> => {
        expect.assertions(11);

        await pullRequestRemoveStaleProcessor.removeStale();

        expect(githubApiPullRequestLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledTimes(1);
        expect(githubApiPullRequestLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledWith(pullRequestStaleLabel);
        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(commonInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(pullRequestsInputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Removing the stale state from this pull request...`
        );
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          2,
          `Fetching the stale label`,
          `value-${pullRequestStaleLabel}`,
          `whiteBright-to remove from this pull request...`
        );
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `The stale label was fetched`);
        expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          4,
          `Removing the stale label from this pull request...`
        );
      });

      describe(`when the label could not be found`, (): void => {
        beforeEach((): void => {
          githubApiPullRequestLabelsServiceFetchLabelByNameSpy.mockResolvedValue(null);
        });

        it(`should log and throw an error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(pullRequestRemoveStaleProcessor.removeStale()).rejects.toThrow(
            `Could not find the stale label ${pullRequestStaleLabel}`
          );

          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(pullRequestProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Could not find the stale label`,
            `value-${pullRequestStaleLabel}`
          );
        });
      });

      describe(`when the label could be found`, (): void => {
        beforeEach((): void => {
          githubApiPullRequestLabelsServiceFetchLabelByNameSpy.mockResolvedValue(
            createHydratedMock<IGithubApiLabel>({
              id: staleLabelId,
            })
          );
        });

        describe(`when the action is not in dry-run mode`, (): void => {
          beforeEach((): void => {
            commonInputsServiceGetInputsSpy = jest
              .spyOn(CommonInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<ICommonInputs>({
                  dryRun: false,
                })
              );
          });

          it(`should remove the stale label from this pull request`, async (): Promise<void> => {
            expect.assertions(6);

            await pullRequestRemoveStaleProcessor.removeStale();

            expect(githubApiPullRequestLabelsServiceRemoveLabelSpy).toHaveBeenCalledTimes(1);
            expect(githubApiPullRequestLabelsServiceRemoveLabelSpy).toHaveBeenCalledWith(pullRequestId, staleLabelId);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(5, `The stale label was removed`);
            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`The pull request is no longer stale`);
          });
        });

        describe(`when the action is in dry-run mode`, (): void => {
          beforeEach((): void => {
            commonInputsServiceGetInputsSpy = jest
              .spyOn(CommonInputsService.getInstance(), `getInputs`)
              .mockReturnValue(
                createHydratedMock<ICommonInputs>({
                  dryRun: true,
                })
              );
          });

          it(`should not remove the stale label from this pull request`, async (): Promise<void> => {
            expect.assertions(5);

            await pullRequestRemoveStaleProcessor.removeStale();

            expect(githubApiPullRequestLabelsServiceRemoveLabelSpy).not.toHaveBeenCalled();
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
            expect(pullRequestProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `The stale label was not removed due to the dry-run mode`
            );
            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(pullRequestProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`The pull request is no longer stale`);
          });
        });
      });
    });
  });
});
