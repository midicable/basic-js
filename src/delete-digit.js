const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given some integer, find the maximal number you can obtain
 * by deleting exactly one digit of the given number.
 *
 * @param {Number} n
 * @return {Number}
 *
 * @example
 * For n = 152, the output should be 52
 *
 */
function deleteDigit(n) {
  let maxNum = 0;
  let testNum = 0;
  const nDigits = new Array();
  let testNumDigits = new Array();
  while (n > 0) {
    nDigits.unshift(String(n % 10));
    n = Math.floor(n / 10);
  }
  for (let i = 0; i < nDigits.length; i++) {
    testNumDigits = nDigits.slice()
    testNumDigits.splice(i, 1);
    testNum = Number(testNumDigits.join(''));
    if (testNum > maxNum) {
      maxNum = testNum;
    }
  }
  return maxNum;
}


module.exports = {
  deleteDigit
};
