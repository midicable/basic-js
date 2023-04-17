const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement chainMaker object according to task description
 * 
 */
const chainMaker = {
  chain: [],

  getLength() {
    return this.chain.length;
  },
  addLink(value) {
    this.chain.push(`( ${value} )`);
    return this;
  },
  removeLink(position) {
    if (isNaN(position) || 
    !(Number.isInteger(position)) ||
    position < 1 || 
    position > this.chain.length) {
      this.chain = new Array();
      throw new Error("You can't remove incorrect link!");
    } else {
      this.chain.splice(position - 1, 1);
      return this;
    }
  },
  reverseChain() {
    this.chain.reverse();
    return this;
  },
  finishChain() {
    const resultChain = this.chain.join('~~');
    this.chain = new Array();
    return resultChain;
  }
};


module.exports = {
  chainMaker
};
