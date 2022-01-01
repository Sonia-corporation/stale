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
    const processedItemsCount: number = await this.processBatch();

    LoggerService.info(
      LoggerFormatService.green(`All the ${_.toLower(this._itemType)}s`),
      LoggerFormatService.white(`(${LoggerService.value(processedItemsCount)}${LoggerFormatService.white(`)`)}`),
      LoggerFormatService.green(`were processed`)
    );
  }

  /**
   * @description
   * Process a single batch
   * @param {Readonly<number>} batch The batch index
   * @param {Readonly<string>} fromPageId The id of the previous page (GitHub)
   * @returns {Promise<number>} The number of processed items
   */
  public async processBatch(batch: Readonly<number> = 1, fromPageId?: Readonly<string>): Promise<number> {
    LoggerService.info(
      `Fetching the batch of ${_.toLower(this._itemType)}s`,
      `${LoggerFormatService.white(`#`)}${LoggerService.value(_.toString(batch))}${LoggerFormatService.whiteBright(
        `...`
      )}`
    );

    const items: TItems | never = await this._getItems(fromPageId);
    const itemsCount: number = this._getPagination(items).nodes.length;

    LoggerService.info(
      `Found`,
      LoggerService.value(_.toString(itemsCount)),
      LoggerFormatService.whiteBright(`${_.toLower(this._itemType)}${itemsCount > 1 ? `s` : ``} in the batch`),
      `${LoggerFormatService.white(`#`)}${LoggerService.value(_.toString(batch))}`
    );

    for (const item of this._getPagination(items).nodes) {
      // Note: we do not wish to have a blazing fast action
      // The goal is to process a single item at a time
      // eslint-disable-next-line no-await-in-loop
      await this._process(item);

      this._increaseProcessedItemsCount();
    }

    LoggerService.info(
      LoggerFormatService.green(`Batch of ${_.toLower(this._itemType)}s`),
      `${LoggerFormatService.white(`#`)}${LoggerService.value(_.toString(batch))}`,
      LoggerFormatService.green(`processed`)
    );

    if (this._getPagination(items).pageInfo.hasNextPage) {
      LoggerService.info(`Continuing with the next batch of ${_.toLower(this._itemType)}s`);

      await this.processBatch(++batch, this._getPagination(items).pageInfo.endCursor);
    } else {
      LoggerService.info(
        LoggerFormatService.green(`All the ${_.toLower(this._itemType)}s batches`),
        LoggerFormatService.white(`(${LoggerService.value(batch)}${LoggerFormatService.white(`)`)}`),
        LoggerFormatService.green(`were processed`)
      );
    }

    return this._getPagination(items).totalCount;
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
   *  @todo find a better way to check that with pure typings
   * @param {IGithubApiGetIssues | IGithubApiGetPullRequests} _items The items to check
   * @returns {boolean} Return true when the items are issues
   * @private
   */
  private _isIssueItems(_items: IGithubApiGetIssues | IGithubApiGetPullRequests): _items is IGithubApiGetIssues {
    return this._itemType === `issue`;
  }

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
