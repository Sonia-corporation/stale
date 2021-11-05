import { StaleService } from './core/stale.service';

/**
 * @description
 * Start the main logic of this action
 */
function initialize(): void {
  StaleService.initialize();
}

void initialize();
