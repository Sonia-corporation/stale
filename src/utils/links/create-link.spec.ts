import { createLink } from '@utils/links/create-link';
import faker from 'faker';
import * as TerminalLinkModule from 'terminal-link';

describe(`createLink()`, (): void => {
  let name: string;
  let link: string;

  let terminalLinkSpy: jest.SpyInstance;

  beforeEach((): void => {
    name = faker.random.word();
    link = faker.internet.url();

    terminalLinkSpy = jest.spyOn(TerminalLinkModule, `default`);
  });

  it(`should create a link formatted for a terminal and return it (unit)`, (): void => {
    expect.assertions(3);
    terminalLinkSpy.mockReturnValue(`dummy-link`);

    const result = createLink(name, link);

    expect(terminalLinkSpy).toHaveBeenCalledTimes(1);
    expect(terminalLinkSpy).toHaveBeenCalledWith(name, link);
    expect(result).toStrictEqual(`dummy-link`);
  });

  it(`should create a link formatted for a terminal and return it (functional)`, (): void => {
    expect.assertions(3);
    link = `https://github.com/Sonia-corporation/stale/issues/1`;

    const result = createLink(name, link);

    expect(terminalLinkSpy).toHaveBeenCalledTimes(1);
    expect(terminalLinkSpy).toHaveBeenCalledWith(name, link);
    // eslint-disable-next-line no-irregular-whitespace
    expect(result).toStrictEqual(`${name} (​https://github.com/Sonia-corporation/stale/issues/1​)`);
  });
});
