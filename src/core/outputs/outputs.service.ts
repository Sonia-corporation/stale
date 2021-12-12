import { IssuesOutputsService } from '@core/outputs/issues-outputs.service';

export class OutputsService {
  public static setOutputs(): OutputsService {
    IssuesOutputsService.setOutputs();

    return OutputsService;
  }
}
