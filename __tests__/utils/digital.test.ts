/* eslint-disable no-undef */
import { addition, division, formatKMUnit, formatNumberBase, multiplication, sub } from '../../src/utils/digital';

describe('测试 app/utils/digital.ts', () => {
  test('formatKMUnit', () => {
    let result = formatKMUnit(10000000);
    expect(result).toBe('10M');

    result = formatKMUnit(123456789);
    expect(result).toBe('123.46M');

    result = formatKMUnit(98765);
    expect(result).toBe('98.77K');

    result = formatKMUnit(34500);
    expect(result).toBe('34.5K');

    result = formatKMUnit(2000);
    expect(result).toBe('2K');

    result = formatKMUnit(100);
    expect(result).toBe('100');

    result = formatKMUnit(0);
    expect(result).toBe('--');

    result = formatKMUnit(-10);
    expect(result).toBe('--');

    result = formatKMUnit('a');
    expect(result).toBe('--');
  });

  test('formatNumberBase', () => {
    let result = formatNumberBase(10000000);
    expect(result).toBe(10000000);

    result = formatNumberBase(12.345);
    expect(result).toBe(12.35);

    result = formatNumberBase(12.345, 1);
    expect(result).toBe(12.3);

    result = formatNumberBase(12.345, 3);
    expect(result).toBe(12.345);

    result = formatNumberBase('a');
    expect(result).toBe(0);
  });

  test('division', () => {
    let result = division(6, 2);
    expect(result).toBe('3');

    result = division(6, 12);
    expect(result).toBe('0.5');

    result = division(6, 1);
    expect(result).toBe('6');

    result = division(6, 6);
    expect(result).toBe('1');

    result = division(1, 6);
    expect(result).toBe('0.16666667');

    result = division(0, 6);
    expect(result).toBe('0');

    result = division(6, 0);
    expect(result).toBe('0');

    result = division(0, 0);
    expect(result).toBe('0');
  });

  test('multiplication', () => {
    let result = multiplication(6, 2);
    expect(result).toBe('12');

    result = multiplication(6, 12);
    expect(result).toBe('72');

    result = multiplication(6, 1);
    expect(result).toBe('6');

    result = multiplication(6, 6);
    expect(result).toBe('36');

    result = multiplication(1, 6);
    expect(result).toBe('6');

    result = multiplication(0, 6);
    expect(result).toBe('0');

    result = multiplication(6, 0);
    expect(result).toBe('0');

    result = multiplication('a', 'b');
    expect(result).toBe('0');
  });

  test('addition', () => {
    let result = addition(6, 2);
    expect(result).toBe('8');

    result = addition(6, 12);
    expect(result).toBe('18');

    result = addition(6, 1);
    expect(result).toBe('7');

    result = addition(6, 6);
    expect(result).toBe('12');

    result = addition(1, 6);
    expect(result).toBe('7');

    result = addition(0, 6);
    expect(result).toBe('6');

    result = addition(6, 0);
    expect(result).toBe('6');

    result = addition('a', 'b');
    expect(result).toBe('0');
  });

  test('sub', () => {
    let result = sub(6, 2);
    expect(result).toBe('4');

    result = sub(6, 12);
    expect(result).toBe('-6');

    result = sub(6, 1);
    expect(result).toBe('5');

    result = sub(6, 6);
    expect(result).toBe('0');

    result = sub(1, 6);
    expect(result).toBe('-5');

    result = sub(0, 6);
    expect(result).toBe('-6');

    result = sub(6, 0);
    expect(result).toBe('6');

    result = sub('a', 'b');
    expect(result).toBe('0');
  });
});
