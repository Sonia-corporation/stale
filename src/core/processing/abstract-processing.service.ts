import { IGithubApiGetIssues } from '@github/api/issues/interfaces/github-api-get-issues.interface';
import { IGithubApiIssue } from '@github/api/issues/interfaces/github-api-issue.interface';
import { IGithubApiIssuesPagination } from '@github/api/issues/interfaces/github-api-issues-pagination.interface';
import { IGithubApiGetPullRequests } from '@github/api/pull-requests/interfaces/github-api-get-pull-requests.interface';
import { IGithubApiPullRequest } from '@github/api/pull-requests/interfaces/github-api-pull-request.interface';
import { IGithubApiPullRequestsPagination } from '@github/api/pull-requests/interfaces/github-api-pull-requests-pagination.interface';
import { LoggerFormatService } from '@utils/loggers/logger-format.service';
import { LoggerService } from '@utils/loggers/logger.service';
import _ from 'lodash';

export abstract class AbstractProcessingService<TItems extends IGithubApiGetIssues | IGithubApiGetPullRequests> {
  /**
   * @description
   * The type of item
   * Used for the logs
   * @type {"issue" | "pull request"}
   * @protected
   */
  protected abstract readonly _itemType: 'issue' | 'pull request';

  /**
   * @description
   * Start to process the batches for the items
   * @returns {Promise<void>}
   */
  public async process(): Promise<void> {
    if (!this.isProcessingEnabled$$()) {
      return;
    }

    // This is processing recursively all the batches
    const processedItemsCount: number = await this.processBatch();

    LoggerService.info(
      LoggerFormatService.green(`All the ${_.toLower(this._itemType)}s`),
      LoggerFormatService.white(`(${LoggerService.value(processedItemsCount)}${LoggerFormatService.white(`)`)}`),
      LoggerFormatService.green(`were processed`)
    );
  }

  /**
   * @description
   * Process recursively all the batches
   * @param {Readonly<number>} batch The batch index
   * @param {number} processedItemsCount The current sum of all the processed items
   * @param {Readonly<string>} fromPageId The id of the previous page (GitHub)
   * @returns {Promise<number>} The number of processed items (sum of all the batches)
   */
  public async processBatch(
    batch: Readonly<number> = 1,
    processedItemsCount: number = 0,
    fromPageId?: Readonly<string>
  ): Promise<number> {
    LoggerService.info(
      `Fetching the batch of ${_.toLower(this._itemType)}s`,
      `${LoggerFormatService.white(`#`)}${LoggerService.value(_.toString(batch))}${LoggerFormatService.whiteBright(
        `...`
      )}`
    );

    const items: TItems | never = await this._getItems(fromPageId);
    const itemsCount: number = this._getPagination(items).nodes.length;
    let shouldBeProcess: boolean = true;

    LoggerService.info(
      `Found`,
      LoggerService.value(_.toString(itemsCount)),
      LoggerFormatService.whiteBright(`${_.toLower(this._itemType)}${itemsCount > 1 ? `s` : ``} in the batch`),
      `${LoggerFormatService.white(`#`)}${LoggerService.value(_.toString(batch))}`
    );

    for (const item of this._getPagination(items).nodes) {
      shouldBeProcess = this.canProcess$$(item.number);

      // Stop the processing here in the current batch
      if (!shouldBeProcess) {
        break;
      }

      // Expose the item data for debug purpose
      this._logItem(item);

      // Note: we do not wish to have a blazing fast action
      // The goal is to process a single item at a time
      // Hence the "await" ; )
      // eslint-disable-next-line no-await-in-loop
      await this._process(item);

      processedItemsCount++;
      this._increaseProcessedItemsCount();
    }

    LoggerService.info(
      LoggerFormatService.green(`Batch of ${_.toLower(this._itemType)}s`),
      `${LoggerFormatService.white(`#`)}${LoggerService.value(_.toString(batch))}`,
      LoggerFormatService.green(`processed`)
    );

    if (!shouldBeProcess) {
      LoggerService.info(`Stopping the processing of batches sooner than expected to respect the limits`);
    } else {
      if (this._getPagination(items).pageInfo.hasNextPage) {
        LoggerService.info(`Continuing with the next batch of ${_.toLower(this._itemType)}s`);

        processedItemsCount = await this.processBatch(
          ++batch,
          processedItemsCount,
          this._getPagination(items).pageInfo.endCursor
        );
      } else {
        LoggerService.info(
          LoggerFormatService.green(`All the ${_.toLower(this._itemType)}s batches`),
          LoggerFormatService.white(`(${LoggerService.value(batch)}${LoggerFormatService.white(`)`)}`),
          LoggerFormatService.green(`were processed`)
        );
      }
    }

    return processedItemsCount;
  }

  /**
   * @description
   * Check if the item can be processed before starting the processing
   * Based on the limit of API queries calls count
   * Based on the limit of API mutations calls count
   * @param {Readonly<number>} itemNumber The number of the item to process
   * @returns {boolean} Return true if the item can be processed
   * @private
   */
  public canProcess$$(itemNumber: Readonly<number>): boolean {
    LoggerService.info(
      `Checking if the ${_.toLower(this._itemType)}`,
      LoggerService.value(`#${itemNumber}`),
      LoggerFormatService.whiteBright(`can be processed...`)
    );

    const hasReachedQueriesLimit: boolean = this.hasReachedQueriesLimit$$();

    if (hasReachedQueriesLimit) {
      // TODO add the reached count
      LoggerService.info(
        `The limit of ${_.toLower(
          this._itemType
        )}s API queries calls count has been reached. Stopping the processing of ${_.toLower(this._itemType)}s`
      );

      return false;
    }

    // TODO add the reached count versus reached count total
    LoggerService.info(`The limit of API queries calls count is not reached yet, continuing...`);

    const hasReachedMutationsLimit: boolean = this.hasReachedMutationsLimit$$();

    if (hasReachedMutationsLimit) {
      // TODO add the reached count
      LoggerService.info(
        `The limit of ${_.toLower(
          this._itemType
        )}s API mutations calls count has been reached. Stopping the processing of ${_.toLower(this._itemType)}s`
      );

      return false;
    }

    // TODO add the reached count versus reached count total
    LoggerService.info(`The limit of API mutations calls count is not reached yet, continuing...`);

    LoggerService.info(
      `The ${_.toLower(this._itemType)}`,
      LoggerService.value(`#${itemNumber}`),
      LoggerFormatService.whiteBright(`can be processed`)
    );

    return true;
  }

  /**
   * @description
   * Get the pagination (correctly typed)
   * @template TItems
   * @param {TItems} items The items received from the API
   * @returns {IGithubApiIssuesPagination | IGithubApiPullRequestsPagination} The pagination
   * @private
   */
  private _getPagination(items: TItems): IGithubApiIssuesPagination | IGithubApiPullRequestsPagination {
    if (this._isIssueItems(items)) {
      return items.repository.issues;
    }

    return items.repository.pullRequests;
  }

  /**
   * @description
   * Allow to check if the items are issues or pull requests
   * TODO find a better way to check that with pure typings
   * @param {IGithubApiGetIssues | IGithubApiGetPullRequests} _items The items to check
   * @returns {boolean} Return true when the items are issues
   * @private
   */
  private _isIssueItems(_items: IGithubApiGetIssues | IGithubApiGetPullRequests): _items is IGithubApiGetIssues {
    return this._itemType === `issue`;
  }

  private _logItem(item: Readonly<IGithubApiIssue | IGithubApiPullRequest>): void {
    LoggerService.debug(JSON.stringify(item));
  }

  /**
   * @description
   * Check if the limit of API queries calls count is reached
   * @returns {boolean} Return true when the limit of API queries calls count is reached
   */
  public abstract hasReachedQueriesLimit$$(): boolean;

  /**
   * @description
   * Check if the limit of API mutations calls count is reached
   * @returns {boolean} Return true when the limit of API mutations calls count is reached
   */
  public abstract hasReachedMutationsLimit$$(): boolean;

  /**
   * @description
   * Check if the processing is enabled based on the [x-processing] option
   * Should log if needed
   * @returns {boolean} Returns true when the processing is enabled
   */
  public abstract isProcessingEnabled$$(): boolean;

  /**
   * @description
   * Return the list of items to be processed
   * @template TItems
   * @param {Readonly<string | undefined>} fromPageId The id of the previous page (GitHub)
   * @returns {Promise<TItems>}
   * @protected
   */
  protected abstract _getItems(fromPageId: Readonly<string | undefined>): Promise<TItems>;

  /**
   * @description
   * Process the given item
   * @param {Readonly<IGithubApiIssue | IGithubApiPullRequest>} item The item to process
   * @returns {Promise<void>}
   * @protected
   */
  protected abstract _process(item: Readonly<IGithubApiIssue | IGithubApiPullRequest>): Promise<void>;

  /**
   * @description
   * Increase the related statistics about the processed items
   * Call the proper service based on the type of items related to this service
   * @protected
   */
  protected abstract _increaseProcessedItemsCount(): void;
}
