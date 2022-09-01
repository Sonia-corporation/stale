import { StaleService } from '@core/stale.service';
import { GithubSchemasService } from '@github/github-schemas.service';

/**
 * @description
 * Start the main logic of this action
 */
async function initialize(): Promise<void> {
  try {
    GithubSchemasService.initialize();
    await StaleService.initialize();
  } catch (e) {
    // Nothing to do here
  }
}

void initialize();
