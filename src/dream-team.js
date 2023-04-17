const { NotImplementedError } = require('../extensions/index.js');

/**
 * Create name of dream team based on the names of its members
 *  
 * @param {Array} members names of the members 
 * @return {String | Boolean} name of the team or false
 * in case of incorrect members
 *
 * @example
 * 
 * createDreamTeam(['Matt', 'Ann', 'Dmitry', 'Max']) => 'ADMM'
 * createDreamTeam(['Olivia', 1111, 'Lily', 'Oscar', true, null]) => 'LOO'
 *
 */
function createDreamTeam(members) {
  if (!(members instanceof Array)) {
    return false;
  } 
  const teamNameLetters = [];
  for (let name of members) {
    if (typeof name === 'string') {
      teamNameLetters.push(name.trimStart()[0].toUpperCase());
    }
  }
  teamNameLetters.sort();
  if (teamNameLetters.length) {
    return teamNameLetters.join('');
  } else {
    return false;
  }
}

module.exports = {
  createDreamTeam
};
