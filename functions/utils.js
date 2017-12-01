const levenshtein = require('fast-levenshtein');

function compare(actual, expected) {
  return levenshtein.get(actual, expected, { useCollator: true });
}

exports.isMatch = function isMatch(actual, expected) {
  if (isNaN(actual)) {
    if (expected.length > 8) {
      return compare(actual, expected) <= 2;
    } else if (expected.length > 3) {
      return compare(actual, expected) <= 1;
    }
  }
  return compare(actual, expected) === 0;
};
