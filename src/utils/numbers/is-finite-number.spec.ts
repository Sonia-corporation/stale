import { isFiniteNumber } from '@utils/numbers/is-finite-number';

describe(`isFiniteNumber()`, (): void => {
  describe.each`
    value        | isFinite
    ${null}      | ${false}
    ${undefined} | ${false}
    ${`dummy`}   | ${false}
    ${-Infinity} | ${false}
    ${Infinity}  | ${false}
    ${NaN}       | ${false}
    ${-1}        | ${true}
    ${0}         | ${true}
    ${1}         | ${true}
    ${888}       | ${true}
    ${`-1`}      | ${false}
    ${`0`}       | ${false}
    ${`1`}       | ${false}
    ${`888`}     | ${false}
  `(`when the given value is "$value"`, ({ value, isFinite }: IMatrix): void => {
    it(`should return ${isFinite}`, (): void => {
      expect.assertions(1);

      const result = isFiniteNumber(value);

      expect(result).toStrictEqual(isFinite);
    });
  });
});

interface IMatrix {
  isFinite: boolean;
  value: string | number | null | undefined;
}
