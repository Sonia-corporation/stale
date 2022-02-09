import { IssuesOutputsAnnotationsService } from '@core/outputs/annotations/issues-outputs-annotations.service';
import { PullRequestsOutputsAnnotationsService } from '@core/outputs/annotations/pull-requests-outputs-annotations.service';

export class OutputsAnnotationsService {
  public static noticeAllOutputs(): OutputsAnnotationsService {
    IssuesOutputsAnnotationsService.getInstance().noticeAllOutputs();
    PullRequestsOutputsAnnotationsService.getInstance().noticeAllOutputs();

    return OutputsAnnotationsService;
  }
}
