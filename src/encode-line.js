const { NotImplementedError } = require('../extensions/index.js');

/**
 * Given a string, return its encoding version.
 *
 * @param {String} str
 * @return {String}
 *
 * @example
 * For aabbbc should return 2a3bc
 *
 */
function encodeLine(str) {
  let encodedLine = '';
  let charCounter = 1;
  let i = 0;
  while (i < str.length) {
    if (str[i + 1] != str[i]) {
      if (charCounter != 1) {
        encodedLine += charCounter;
      }
      encodedLine += str[i];
      charCounter = 1;
      i++;
    } else {
      charCounter++;
      i++;
    }
  }
  return encodedLine;
}
module.exports = {
  encodeLine
};
