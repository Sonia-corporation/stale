import { IAnnotationsProperties } from '@utils/annotations/types/annotations-properties';
import * as core from '@actions/core';
import _ from 'lodash';

/**
 * @description
 * Utility to log annotations
 * No ANSI characters should be used
 * Annotations are not compatible to colours logs
 * See the [issue #422](https://github.com/Sonia-corporation/stale/issues/422)
 * Should normally be used through AnnotationsService
 */
export class LoggerAnnotationsService {
  public static notice(...message: ReadonlyArray<string>): LoggerAnnotationsService {
    core.notice(_.join(message, ` `));

    return LoggerAnnotationsService;
  }

  public static warning(
    message: Readonly<string>,
    properties: Readonly<IAnnotationsProperties>
  ): LoggerAnnotationsService {
    core.warning(message, properties);

    return LoggerAnnotationsService;
  }

  public static error(
    message: Readonly<string>,
    properties: Readonly<IAnnotationsProperties>
  ): LoggerAnnotationsService {
    core.error(message, properties);

    return LoggerAnnotationsService;
  }
}
