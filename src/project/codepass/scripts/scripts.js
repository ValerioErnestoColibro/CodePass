/** @format */

'use strict';

const CryptoJS = require('crypto-js');

const key = 'segretissima';
const plaintext = 'Il mio messaggio segreto';

const ciphertext = CryptoJS.AES.encrypt(plaintext, key).toString();
console.log('Testo cifrato:', ciphertext);

const bytes = CryptoJS.AES.decrypt(ciphertext, key);
const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
console.log('Testo decifrato:', decryptedText);
