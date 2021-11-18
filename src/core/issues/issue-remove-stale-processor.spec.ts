import { IInputs } from '@core/inputs/inputs.interface';
import { InputsService } from '@core/inputs/inputs.service';
import { IssueProcessor } from '@core/issues/issue-processor';
import { IssueRemoveStaleProcessor } from '@core/issues/issue-remove-stale-processor';
import { IGithubApiLabel } from '@github/api/labels/interfaces/github-api-label.interface';
import { IGithubApiTimelineItemsIssueLabeledEvent } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-event.interface';
import { IGithubApiTimelineItemsIssueLabeledEvents } from '@github/api/timeline-items/interfaces/github-api-timeline-items-issue-labeled-events.interface';
import { IUuid } from '@utils/types/uuid';
import faker from 'faker';
import { DateTime } from 'luxon';
import { createHydratedMock } from 'ts-auto-mock';

jest.mock(`@utils/loggers/logger.service`);
jest.mock(`@utils/loggers/logger-format.service`);

describe(`IssueRemoveStaleProcessor`, (): void => {
  let issueProcessor: IssueProcessor;

  beforeEach((): void => {
    issueProcessor = createHydratedMock<IssueProcessor>();
  });

  describe(`constructor()`, (): void => {
    it(`should save the given issue processor`, (): void => {
      expect.assertions(1);

      const result = new IssueRemoveStaleProcessor(issueProcessor);

      expect(result.issueProcessor).toStrictEqual(issueProcessor);
    });
  });

  describe(`after creation`, (): void => {
    let issueRemoveStaleProcessor: IssueRemoveStaleProcessor;

    beforeEach((): void => {
      issueProcessor = createHydratedMock<IssueProcessor>();
    });

    describe(`shouldRemoveStale()`, (): void => {
      let githubApiTimelineItemsServiceFetchIssueAddedLabelsSpy: jest.SpyInstance;
      let inputsServiceGetInputsSpy: jest.SpyInstance;
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerErrorSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueProcessor = createHydratedMock<IssueProcessor>({
          githubIssue: {
            number: 888,
          },
        });
        issueRemoveStaleProcessor = new IssueRemoveStaleProcessor(issueProcessor);

        githubApiTimelineItemsServiceFetchIssueAddedLabelsSpy = jest
          .spyOn(issueRemoveStaleProcessor.githubApiTimelineItemsService$$, `fetchIssueAddedLabels`)
          .mockResolvedValue(createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>());
        inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
          createHydratedMock<IInputs>({
            issueStaleLabel: `stale`,
          })
        );
        issueProcessorLoggerInfoSpy = jest.spyOn(issueProcessor.logger, `info`).mockImplementation();
        issueProcessorLoggerErrorSpy = jest.spyOn(issueProcessor.logger, `error`).mockImplementation();
      });

      it(`should fetch all the labels added events on this issue`, async (): Promise<void> => {
        expect.assertions(7);

        await expect(issueRemoveStaleProcessor.shouldRemoveStale()).rejects.toThrow(
          new Error(`Could not find the stale label in the added labels events`)
        );

        expect(githubApiTimelineItemsServiceFetchIssueAddedLabelsSpy).toHaveBeenCalledTimes(1);
        expect(githubApiTimelineItemsServiceFetchIssueAddedLabelsSpy).toHaveBeenCalledWith(888);
        expect(inputsServiceGetInputsSpy).toHaveBeenCalledTimes(1);
        expect(inputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(2);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          1,
          `Checking if the stale state should be removed...`
        );
      });

      describe(`when no event is related to the addition of the stale label`, (): void => {
        beforeEach((): void => {
          githubApiTimelineItemsServiceFetchIssueAddedLabelsSpy.mockResolvedValue(
            createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
              repository: {
                issue: {
                  timelineItems: {
                    nodes: [
                      createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvent>({
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

          await expect(issueRemoveStaleProcessor.shouldRemoveStale()).rejects.toThrow(
            new Error(`Could not find the stale label in the added labels events`)
          );

          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Could not find the stale label in the added labels events`
          );
        });
      });

      describe(`when there is at least one event related to the addition of the stale label`, (): void => {
        beforeEach((): void => {
          githubApiTimelineItemsServiceFetchIssueAddedLabelsSpy.mockResolvedValue(
            createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
              repository: {
                issue: {
                  timelineItems: {
                    nodes: [
                      createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvent>({
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

        describe(`when the last update on the issue is more recent that the addition of the stale label event`, (): void => {
          beforeEach((): void => {
            jest.spyOn(issueProcessor, `getUpdatedAt`).mockReturnValue(DateTime.utc(2020));

            issueRemoveStaleProcessor = new IssueRemoveStaleProcessor(issueProcessor);

            githubApiTimelineItemsServiceFetchIssueAddedLabelsSpy = jest
              .spyOn(issueRemoveStaleProcessor.githubApiTimelineItemsService$$, `fetchIssueAddedLabels`)
              .mockResolvedValue(
                createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
                  repository: {
                    issue: {
                      timelineItems: {
                        nodes: [
                          createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvent>({
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
            inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
              createHydratedMock<IInputs>({
                issueStaleLabel: `stale`,
              })
            );
            issueProcessorLoggerInfoSpy = jest.spyOn(issueProcessor.logger, `info`).mockImplementation();
          });

          it(`should return true`, async (): Promise<void> => {
            expect.assertions(7);

            const result = await issueRemoveStaleProcessor.shouldRemoveStale();

            expect(result).toBeTrue();
            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(6);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `Found`,
              `value-1`,
              `whiteBright-stale label added event on this issue`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The stale label was added the`,
              `date-01/01/2019, 00:00:00`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The issue was updated for the last time the`,
              `date-01/01/2020, 00:00:00`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `The last update on the issue is more recent that the last time it was stale`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(6, `The stale state should be removed`);
          });
        });

        describe(`when the last update on the issue is older or equal to the addition of the stale label event`, (): void => {
          beforeEach((): void => {
            jest.spyOn(issueProcessor, `getUpdatedAt`).mockReturnValue(DateTime.utc(2020));

            issueRemoveStaleProcessor = new IssueRemoveStaleProcessor(issueProcessor);

            githubApiTimelineItemsServiceFetchIssueAddedLabelsSpy = jest
              .spyOn(issueRemoveStaleProcessor.githubApiTimelineItemsService$$, `fetchIssueAddedLabels`)
              .mockResolvedValue(
                createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
                  repository: {
                    issue: {
                      timelineItems: {
                        nodes: [
                          createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvent>({
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
            inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
              createHydratedMock<IInputs>({
                issueStaleLabel: `stale`,
              })
            );
            issueProcessorLoggerInfoSpy = jest.spyOn(issueProcessor.logger, `info`).mockImplementation();
          });

          it(`should return false`, async (): Promise<void> => {
            expect.assertions(7);

            const result = await issueRemoveStaleProcessor.shouldRemoveStale();

            expect(result).toBeFalse();
            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(6);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `Found`,
              `value-1`,
              `whiteBright-stale label added event on this issue`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The stale label was added the`,
              `date-01/01/2021, 00:00:00`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The issue was updated for the last time the`,
              `date-01/01/2020, 00:00:00`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `There was no update since the last time this issue was stale`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(6, `The stale state should not be removed`);
          });
        });
      });

      describe(`when there are multiple events related to the addition of the stale label`, (): void => {
        beforeEach((): void => {
          githubApiTimelineItemsServiceFetchIssueAddedLabelsSpy.mockResolvedValue(
            createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
              repository: {
                issue: {
                  timelineItems: {
                    nodes: [
                      createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvent>({
                        label: {
                          name: `stale`,
                        },
                      }),
                      createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvent>({
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

        describe(`when the last update on the issue is more recent that the addition of all the stale label events`, (): void => {
          beforeEach((): void => {
            jest.spyOn(issueProcessor, `getUpdatedAt`).mockReturnValue(DateTime.utc(2020));

            issueRemoveStaleProcessor = new IssueRemoveStaleProcessor(issueProcessor);

            githubApiTimelineItemsServiceFetchIssueAddedLabelsSpy = jest
              .spyOn(issueRemoveStaleProcessor.githubApiTimelineItemsService$$, `fetchIssueAddedLabels`)
              .mockResolvedValue(
                createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
                  repository: {
                    issue: {
                      timelineItems: {
                        nodes: [
                          createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvent>({
                            createdAt: DateTime.utc(2019).toISO({
                              includeOffset: false,
                            }),
                            label: {
                              name: `stale`,
                            },
                          }),
                          createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvent>({
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
            inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
              createHydratedMock<IInputs>({
                issueStaleLabel: `stale`,
              })
            );
            issueProcessorLoggerInfoSpy = jest.spyOn(issueProcessor.logger, `info`).mockImplementation();
          });

          it(`should return true`, async (): Promise<void> => {
            expect.assertions(7);

            const result = await issueRemoveStaleProcessor.shouldRemoveStale();

            expect(result).toBeTrue();
            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(6);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `Found`,
              `value-2`,
              `whiteBright-stale label added events on this issue`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The stale label was added the`,
              `date-01/01/2019, 00:00:00`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The issue was updated for the last time the`,
              `date-01/01/2020, 00:00:00`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `The last update on the issue is more recent that the last time it was stale`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(6, `The stale state should be removed`);
          });
        });

        describe(`when the last update on the issue is older or equal to the addition of all the stale label events (ascending)`, (): void => {
          beforeEach((): void => {
            jest.spyOn(issueProcessor, `getUpdatedAt`).mockReturnValue(DateTime.utc(2020));

            issueRemoveStaleProcessor = new IssueRemoveStaleProcessor(issueProcessor);

            githubApiTimelineItemsServiceFetchIssueAddedLabelsSpy = jest
              .spyOn(issueRemoveStaleProcessor.githubApiTimelineItemsService$$, `fetchIssueAddedLabels`)
              .mockResolvedValue(
                createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
                  repository: {
                    issue: {
                      timelineItems: {
                        nodes: [
                          createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvent>({
                            createdAt: DateTime.utc(2019).toISO({
                              includeOffset: false,
                            }),
                            label: {
                              name: `stale`,
                            },
                          }),
                          createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvent>({
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
            inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
              createHydratedMock<IInputs>({
                issueStaleLabel: `stale`,
              })
            );
            issueProcessorLoggerInfoSpy = jest.spyOn(issueProcessor.logger, `info`).mockImplementation();
          });

          it(`should return false`, async (): Promise<void> => {
            expect.assertions(7);

            const result = await issueRemoveStaleProcessor.shouldRemoveStale();

            expect(result).toBeFalse();
            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(6);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `Found`,
              `value-2`,
              `whiteBright-stale label added events on this issue`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The stale label was added the`,
              `date-01/01/2021, 00:00:00`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The issue was updated for the last time the`,
              `date-01/01/2020, 00:00:00`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `There was no update since the last time this issue was stale`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(6, `The stale state should not be removed`);
          });
        });

        describe(`when the last update on the issue is older or equal to the addition of all the stale label events (descensing)`, (): void => {
          beforeEach((): void => {
            jest.spyOn(issueProcessor, `getUpdatedAt`).mockReturnValue(DateTime.utc(2020));

            issueRemoveStaleProcessor = new IssueRemoveStaleProcessor(issueProcessor);

            githubApiTimelineItemsServiceFetchIssueAddedLabelsSpy = jest
              .spyOn(issueRemoveStaleProcessor.githubApiTimelineItemsService$$, `fetchIssueAddedLabels`)
              .mockResolvedValue(
                createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvents>({
                  repository: {
                    issue: {
                      timelineItems: {
                        nodes: [
                          createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvent>({
                            createdAt: DateTime.utc(2021).toISO({
                              includeOffset: false,
                            }),
                            label: {
                              name: `stale`,
                            },
                          }),
                          createHydratedMock<IGithubApiTimelineItemsIssueLabeledEvent>({
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
            inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
              createHydratedMock<IInputs>({
                issueStaleLabel: `stale`,
              })
            );
            issueProcessorLoggerInfoSpy = jest.spyOn(issueProcessor.logger, `info`).mockImplementation();
          });

          it(`should return false`, async (): Promise<void> => {
            expect.assertions(7);

            const result = await issueRemoveStaleProcessor.shouldRemoveStale();

            expect(result).toBeFalse();
            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(6);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              2,
              `Found`,
              `value-2`,
              `whiteBright-stale label added events on this issue`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              3,
              `The stale label was added the`,
              `date-01/01/2021, 00:00:00`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              4,
              `The issue was updated for the last time the`,
              `date-01/01/2020, 00:00:00`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `There was no update since the last time this issue was stale`
            );
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(6, `The stale state should not be removed`);
          });
        });
      });
    });

    describe(`removeStale()`, (): void => {
      let issueStaleLabel: string;
      let staleLabelId: IUuid;
      let issueId: IUuid;

      let githubApiLabelsServiceFetchLabelByNameSpy: jest.SpyInstance;
      let inputsServiceGetInputsSpy: jest.SpyInstance;
      let githubApiLabelsServiceRemoveLabelFromIssueSpy: jest.SpyInstance;
      let issueProcessorLoggerInfoSpy: jest.SpyInstance;
      let issueProcessorLoggerNoticeSpy: jest.SpyInstance;
      let issueProcessorLoggerErrorSpy: jest.SpyInstance;

      beforeEach((): void => {
        issueStaleLabel = faker.random.word();
        staleLabelId = faker.datatype.uuid();
        issueId = faker.datatype.uuid();
        issueProcessor = createHydratedMock<IssueProcessor>({
          githubIssue: {
            id: issueId,
          },
        });
        issueRemoveStaleProcessor = new IssueRemoveStaleProcessor(issueProcessor);

        githubApiLabelsServiceFetchLabelByNameSpy = jest
          .spyOn(issueRemoveStaleProcessor.githubApiLabelsService$$, `fetchLabelByName`)
          .mockResolvedValue(
            createHydratedMock<IGithubApiLabel>({
              id: staleLabelId,
            })
          );
        inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
          createHydratedMock<IInputs>({
            dryRun: false,
            issueStaleLabel,
          })
        );
        githubApiLabelsServiceRemoveLabelFromIssueSpy = jest
          .spyOn(issueRemoveStaleProcessor.githubApiLabelsService$$, `removeLabelFromIssue`)
          .mockImplementation();
        issueProcessorLoggerInfoSpy = jest
          .spyOn(issueRemoveStaleProcessor.issueProcessor.logger, `info`)
          .mockImplementation();
        issueProcessorLoggerNoticeSpy = jest
          .spyOn(issueRemoveStaleProcessor.issueProcessor.logger, `notice`)
          .mockImplementation();
        issueProcessorLoggerErrorSpy = jest
          .spyOn(issueRemoveStaleProcessor.issueProcessor.logger, `error`)
          .mockImplementation();
      });

      it(`should fetch the stale label id from the repository`, async (): Promise<void> => {
        expect.assertions(9);

        await issueRemoveStaleProcessor.removeStale();

        expect(githubApiLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledTimes(1);
        expect(githubApiLabelsServiceFetchLabelByNameSpy).toHaveBeenCalledWith(issueStaleLabel);
        expect(inputsServiceGetInputsSpy).toHaveBeenCalledTimes(2);
        expect(inputsServiceGetInputsSpy).toHaveBeenCalledWith();
        expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(1, `Removing the stale state from this issue...`);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
          2,
          `Fetching the stale label`,
          `value-${issueStaleLabel}`,
          `whiteBright-to remove from this issue...`
        );
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(3, `The stale label was fetched`);
        expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(4, `Removing the stale label from this issue...`);
      });

      describe(`when the label could not be found`, (): void => {
        beforeEach((): void => {
          githubApiLabelsServiceFetchLabelByNameSpy.mockResolvedValue(null);
        });

        it(`should log and throw an error`, async (): Promise<void> => {
          expect.assertions(3);

          await expect(issueRemoveStaleProcessor.removeStale()).rejects.toThrow(
            `Could not find the stale label ${issueStaleLabel}`
          );

          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledTimes(1);
          expect(issueProcessorLoggerErrorSpy).toHaveBeenCalledWith(
            `Could not find the stale label`,
            `value-${issueStaleLabel}`
          );
        });
      });

      describe(`when the label could be found`, (): void => {
        beforeEach((): void => {
          githubApiLabelsServiceFetchLabelByNameSpy.mockResolvedValue(
            createHydratedMock<IGithubApiLabel>({
              id: staleLabelId,
            })
          );
        });

        describe(`when the action is not in dry-run mode`, (): void => {
          beforeEach((): void => {
            inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
              createHydratedMock<IInputs>({
                dryRun: false,
                issueStaleLabel,
              })
            );
          });

          it(`should remove the stale label from this issue`, async (): Promise<void> => {
            expect.assertions(6);

            await issueRemoveStaleProcessor.removeStale();

            expect(githubApiLabelsServiceRemoveLabelFromIssueSpy).toHaveBeenCalledTimes(1);
            expect(githubApiLabelsServiceRemoveLabelFromIssueSpy).toHaveBeenCalledWith(issueId, staleLabelId);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(5, `The stale label was removed`);
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`The issue is no longer stale`);
          });
        });

        describe(`when the action is in dry-run mode`, (): void => {
          beforeEach((): void => {
            inputsServiceGetInputsSpy = jest.spyOn(InputsService, `getInputs`).mockReturnValue(
              createHydratedMock<IInputs>({
                dryRun: true,
                issueStaleLabel,
              })
            );
          });

          it(`should not remove the stale label from this issue`, async (): Promise<void> => {
            expect.assertions(5);

            await issueRemoveStaleProcessor.removeStale();

            expect(githubApiLabelsServiceRemoveLabelFromIssueSpy).not.toHaveBeenCalled();
            expect(issueProcessorLoggerInfoSpy).toHaveBeenCalledTimes(5);
            expect(issueProcessorLoggerInfoSpy).toHaveBeenNthCalledWith(
              5,
              `The stale label was not removed due to the dry-run mode`
            );
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledTimes(1);
            expect(issueProcessorLoggerNoticeSpy).toHaveBeenCalledWith(`The issue is no longer stale`);
          });
        });
      });
    });
  });
});
