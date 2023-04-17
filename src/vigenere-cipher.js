const { NotImplementedError } = require('../extensions/index.js');

/**
 * Implement class VigenereCipheringMachine that allows us to create
 * direct and reverse ciphering machines according to task description
 * 
 * @example
 * 
 * const directMachine = new VigenereCipheringMachine();
 * 
 * const reverseMachine = new VigenereCipheringMachine(false);
 * 
 * directMachine.encrypt('attack at dawn!', 'alphonse') => 'AEIHQX SX DLLU!'
 * 
 * directMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => 'ATTACK AT DAWN!'
 * 
 * reverseMachine.encrypt('attack at dawn!', 'alphonse') => '!ULLD XS XQHIEA'
 * 
 * reverseMachine.decrypt('AEIHQX SX DLLU!', 'alphonse') => '!NWAD TA KCATTA'
 * 
 */

function modulo(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  let q = -(Math.floor(a / b) + 1);
  return -a - b * q;
}

class VigenereCipheringMachine {
  _alphabet            = 'abcdefghijklmnopqrstuvwxyz';
  _alphabetCardinality = 26;
  _isDirect            = true;

  constructor(isDirect) {
    if (isDirect || 
      typeof isDirect == 'undefined') {
      this._isDirect = true;
    } else {
      this._isDirect = false;
    }
  }

  encrypt(message, key) {
    if (typeof message == 'undefined' || typeof key == 'undefined') {
      throw new Error('Incorrect arguments!');
    }

    const symbols = {};
    message = message.toLowerCase();
    key = key.toLowerCase();
    let normalizedMessage = '';
    let encryptedMessage = '';

    for (let i = 0; i < message.length; i++) {
      if (this._alphabet.includes(message[i])) {
        normalizedMessage += message[i];
      } else {
        symbols[i] = message[i];
      }
    }
    
    let encryptedSymbolNumber = undefined;
    for (let i = 0; i < normalizedMessage.length; i++) {
      encryptedSymbolNumber = (this._alphabet.indexOf(normalizedMessage[i]) + 
                              this._alphabet.indexOf(key[i % key.length])) %
                              this._alphabetCardinality;
      encryptedMessage += this._alphabet[encryptedSymbolNumber];
    }

    let encryptedChars = encryptedMessage.split('');
    for (let symbol in symbols) {
      encryptedChars.splice(symbol, 0, symbols[symbol]);
    }
    if (!this._isDirect) {
      encryptedChars.reverse();
    }

    return encryptedChars.join('').toUpperCase();
  }

  decrypt(encryptedMessage, key) {
    if (typeof encryptedMessage == 'undefined' || typeof key == 'undefined') {
      throw new Error('Incorrect arguments!');
    }

    const symbols = {};
    encryptedMessage = encryptedMessage.toLowerCase();
    key = key.toLowerCase();
    let normalizedMessage = '';
    let decryptedMessage = '';

    for (let i = 0; i < encryptedMessage.length; i++) {
      if (this._alphabet.includes(encryptedMessage[i])) {
        normalizedMessage += encryptedMessage[i];
      } else {
        symbols[i] = encryptedMessage[i];
      }
    }
    
    let decryptedSymbolNumber = undefined;
    for (let i = 0; i < normalizedMessage.length; i++) {
      if (this._alphabet.indexOf(normalizedMessage[i]) - this._alphabet.indexOf(key[i % key.length]) >= 0) {
        decryptedSymbolNumber = (this._alphabet.indexOf(normalizedMessage[i]) - 
                                 this._alphabet.indexOf(key[i % key.length])) %
                                 this._alphabetCardinality;
      } else {
        decryptedSymbolNumber = modulo(this._alphabet.indexOf(normalizedMessage[i]) - 
                                       this._alphabet.indexOf(key[i % key.length]),
                                      this._alphabetCardinality);
      }
                              
      decryptedMessage += this._alphabet[decryptedSymbolNumber];
    }

    let decryptedChars = decryptedMessage.split('');
    for (let symbol in symbols) {
      decryptedChars.splice(symbol, 0, symbols[symbol]);
    }
    if (!this._isDirect) {
      decryptedChars.reverse();
    }

    return decryptedChars.join('').toUpperCase();
  }
}

module.exports = {
  VigenereCipheringMachine
};
