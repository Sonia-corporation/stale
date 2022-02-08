import * as core from '@actions/core';
import _ from 'lodash';

/**
 * @description
 * Utility to log annotations
 * No ANSI characters should be used
 * Annotations are not compatible to colours logs
 * See the [issue #422](https://github.com/Sonia-corporation/stale/issues/422)
 */
export class LoggerAnnotationsService {
  public static notice(...message: ReadonlyArray<string>): LoggerAnnotationsService {
    core.notice(_.join(message, ` `));

    return LoggerAnnotationsService;
  }

  public static warning(...message: ReadonlyArray<string>): LoggerAnnotationsService {
    core.warning(_.join(message, ` `));

    return LoggerAnnotationsService;
  }

  public static error(...message: ReadonlyArray<string>): LoggerAnnotationsService {
    core.error(_.join(message, ` `));

    return LoggerAnnotationsService;
  }
}
