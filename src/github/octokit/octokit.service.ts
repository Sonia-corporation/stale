import { InputsService } from '@core/inputs/inputs.service';
import * as github from '@actions/github';
import { GitHub } from '@actions/github/lib/utils';

export class OctokitService {
  public static octokit$$: InstanceType<typeof GitHub> | undefined = undefined;

  public static initialize(): OctokitService {
    OctokitService.setOctokit();

    return OctokitService;
  }

  public static setOctokit(): InstanceType<typeof GitHub> {
    OctokitService.octokit$$ = github.getOctokit(InputsService.getInputs().githubToken);

    return OctokitService.octokit$$;
  }

  public static getOctokit(): InstanceType<typeof GitHub> | never {
    if (!OctokitService.octokit$$) {
      throw new Error(`The octokit is unset`);
    }

    return OctokitService.octokit$$;
  }
}
