import { InputsService } from './inputs/inputs.service';

export class StaleService {
  public static initialize(): StaleService {
    InputsService.initialize();

    return StaleService;
  }
}
