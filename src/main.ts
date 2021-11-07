import { StaleService } from '@core/stale.service';

/**
 * @description
 * Start the main logic of this action
 */
async function initialize(): Promise<void> {
  await StaleService.initialize();
}

void initialize();
