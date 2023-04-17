const { NotImplementedError } = require('../extensions/index.js');

/**
 * In the popular Minesweeper game you have a board with some mines and those cells
 * that don't contain a mine have a number in it that indicates the total number of mines
 * in the neighboring cells. Starting off with some arrangement of mines
 * we want to create a Minesweeper game setup.
 *
 * @param {Array<Array>} matrix
 * @return {Array<Array>}
 *
 * @example
 * matrix = [
 *  [true, false, false],
 *  [false, true, false],
 *  [false, false, false]
 * ]
 *
 * The result should be following:
 * [
 *  [1, 2, 1],
 *  [2, 1, 1],
 *  [1, 1, 1]
 * ]
 */
function minesweeper(matrix) {
  let bombCounter = 0;
  let newMatrix = new Array(matrix.length);
  for (let i = 0; i < matrix.length; i++) {
    newMatrix[i] = new Array(matrix[i].length);
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      newMatrix[i][j] = matrix[i][j];
    }
  }
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i == 0) {
        if (j == 0) {
          bombCounter = [matrix[i][j+1], matrix[i+1][j+1], matrix[i+1][j]].filter(elem => elem).length;
          newMatrix[i][j] = bombCounter;
          continue;
        } else if (j == matrix[i].length - 1) {
          bombCounter = [matrix[i][j-1], matrix[i+1][j-1], matrix[i+1][j]].filter(elem => elem).length;
          newMatrix[i][j] = bombCounter;
          continue;
        } else {
          bombCounter = [matrix[i][j-1], matrix[i+1][j-1], matrix[i+1][j], matrix[i+1][j+1], matrix[i][j+1]].filter(elem => elem).length;
          newMatrix[i][j] = bombCounter;
          continue;
        }
      } else if (i == matrix.length - 1) {
        if (j == 0) {
          bombCounter = [matrix[i-1][j], matrix[i-1][j+1], matrix[i][j+1]].filter(elem => elem).length;
          newMatrix[i][j] = bombCounter;
          continue;
        } else if (j == matrix[i].length - 1) {
          bombCounter = [matrix[i][j-1], matrix[i-1][j-1], matrix[i-1][j]].filter(elem => elem).length;
          newMatrix[i][j] = bombCounter;
          continue;
        } else {
          bombCounter = [matrix[i][j-1], matrix[i-1][j-1], matrix[i-1][j], matrix[i-1][j+1], matrix[i][j+1]].filter(elem => elem).length;
          newMatrix[i][j] = bombCounter;
          continue
        }
      } else {
          bombCounter = [matrix[i-1][j-1], matrix[i-1][j], matrix[i-1][j+1], matrix[i][j+1], 
                         matrix[i+1][j+1], matrix[i+1][j], matrix[i+1][j-1], matrix[i][j-1]].filter(elem => elem).length;
          newMatrix[i][j] = bombCounter;
          continue;
      }
    }
  }
  return newMatrix;
}

module.exports = {
  minesweeper
};
