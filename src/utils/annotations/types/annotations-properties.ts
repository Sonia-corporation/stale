import { AnnotationProperties } from '@actions/core';

export type IAnnotationsProperties =
  | Required<Pick<AnnotationProperties, 'file' | 'title' | 'startLine'>>
  | Pick<AnnotationProperties, 'endLine'>;
