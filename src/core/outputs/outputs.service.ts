import { IssuesOutputsService } from '@core/outputs/issues-outputs.service';
import { PullRequestsOutputsService } from '@core/outputs/pull-requests-outputs.service';

export class OutputsService {
  public static setOutputs(): OutputsService {
    IssuesOutputsService.setOutputs();
    PullRequestsOutputsService.setOutputs();

    return OutputsService;
  }
}
