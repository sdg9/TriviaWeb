import { isMatch } from '../utils';

describe('levenshtein match', () => {
  it('should allow one different character text of length 2-7', () => {
    expect(isMatch('hi', 'ho')).toBe(true);
    expect(isMatch('1234567', '1234565')).toBe(true);
    expect(isMatch('1234567', '1234555')).toBe(false);
  });
  it('should allow two different character on text >= 8', () => {
    expect(isMatch('supercalafragalisticexpialidotious', '11supercalafragalisticexpialidotious')).toBe(true);
    expect(isMatch('supercalafragalisticexpialidotious', '111supercalafragalisticexpialidotious')).toBe(false);
  });
  it('should not care about case', () => {
    expect(isMatch('hi', 'Ho')).toBe(true);
  });
  it('should require exact on 1 character answers', () => {
    expect(isMatch('a', 'b')).toBe(false);
  });
  it('should require exact on numbers', () => {
    expect(isMatch('1', '2')).toBe(false);
  });
  it('should require exact on numbers', () => {
    expect(isMatch('12', '13')).toBe(false);
  });
  it('should require exact on numbers', () => {
    expect(isMatch('123', '124')).toBe(false);
  });
});
