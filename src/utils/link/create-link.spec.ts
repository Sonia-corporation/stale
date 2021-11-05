import { createLink } from './create-link';
import * as faker from 'faker';
import * as TerminalLinkModule from 'terminal-link';

describe(`createLink()`, (): void => {
  let name: string;
  let link: string;

  let terminalLinkSpy: jest.SpyInstance;

  beforeEach((): void => {
    name = faker.random.word();
    link = faker.internet.url();

    terminalLinkSpy = jest.spyOn(TerminalLinkModule, `default`).mockReturnValue(`dummy-link`);
  });

  it(`should create a link formatted for a terminal and return it`, (): void => {
    expect.assertions(3);

    const result = createLink(name, link);

    expect(terminalLinkSpy).toHaveBeenCalledTimes(1);
    expect(terminalLinkSpy).toHaveBeenCalledWith(name, link);
    expect(result).toStrictEqual(`dummy-link`);
  });
});
