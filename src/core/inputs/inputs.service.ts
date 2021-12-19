import { CommonInputsService } from '@core/inputs/common-inputs.service';
import { IssuesInputsService } from '@core/inputs/issues-inputs.service';
import { PullRequestsInputsService } from '@core/inputs/pull-requests-inputs.service';

export class InputsService {
  public static initialize(): InputsService {
    CommonInputsService.getInstance().initialize();
    IssuesInputsService.getInstance().initialize();
    PullRequestsInputsService.getInstance().initialize();

    return InputsService;
  }

  public static logInputs(): InputsService {
    CommonInputsService.getInstance().logInputs();
    IssuesInputsService.getInstance().logInputs();
    PullRequestsInputsService.getInstance().logInputs();

    return InputsService;
  }
}
