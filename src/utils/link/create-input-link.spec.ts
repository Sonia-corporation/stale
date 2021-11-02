import { createInputLink } from './create-input-link';
import * as CreateLinkModule from './create-link';
import { EInputs } from '../../core/inputs/inputs.enum';

describe(`createInputLink()`, (): void => {
  let input: EInputs;

  let createLinkSpy: jest.SpyInstance;

  beforeEach((): void => {
    input = EInputs.GITHUB_TOKEN;

    createLinkSpy = jest.spyOn(CreateLinkModule, `createLink`).mockReturnValue(`fake-input-link`);
  });

  it(`should create and return a link pointing to the README file with the given input as an anchor`, (): void => {
    expect.assertions(3);

    const result = createInputLink(input);

    expect(createLinkSpy).toHaveBeenCalledTimes(1);
    expect(createLinkSpy).toHaveBeenCalledWith(
      `github-token`,
      `https://github.com/@sonia-corporation/stale#github-token`
    );
    expect(result).toStrictEqual(`fake-input-link`);
  });
});
