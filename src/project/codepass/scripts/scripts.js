/** @format */

// 'use strict';

// const CryptoJS = require('crypto-js');

// const key = 'segretissima';
// const plaintext = 'Il mio messaggio segreto';

// const ciphertext = CryptoJS.AES.encrypt(plaintext, key).toString();
// console.log('Testo cifrato:', ciphertext);

// const bytes = CryptoJS.AES.decrypt(ciphertext, key);
// const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
// console.log('Testo decifrato:', decryptedText);

/** @format */
'use strict';
const CryptoJS = require('crypto-js');
class User {
  #username;
  #email;
  #password;
  #masterPassword;
  #data;

  constructor(username, email, password, masterPassword) {
    this.#username = username;
    this.#email = email;
    this.#password = password;
    this.#masterPassword = masterPassword;
    this.#data = new Data();
  }

  getUserInfo() {
    return `Username: ${this.#username}, Email: ${this.#email}`;
  }

  addData(email, password, website) {
    const encryptPassword = CryptoJS.AES.encrypt(password, this.#masterPassword).toString();
    this.#data.addData(email, encryptPassword, website);
  }

  getData() {
    return this.#data.getDataInfo();
  }
}

class Data {
  #data;
  #id;

  constructor() {
    this.#data = [];
    this.#id = 0;
  }

  addData(email, password, website) {
    this.#data.push({ email: email, password: password, website: website, id: this.#id });
    this.#id++;
  }

  getDataInfo() {
    if (this.#data.length > 0) {
      this.#data.forEach(x =>
        console.log(`Email: ${x.email}, EncyptPassword: ${x.password}, Website: ${x.website}, ID: ${x.id}`),
      );
    }
  }
}

const persona = new User('mariorossi800', 'mariorossi@gmail.com', 'v#CxdZ4C1^@4ARcpH6#q', 'PS5EyCp$Mwr^JF%wEBE4');
console.log(persona.getUserInfo());
const googleAccount = persona.addData('mariorossi@gmail.com', '12345', 'https://google.com/');
const protonAccount = persona.addData('mariorossi@proton.me', '12345', 'https://proton.me/');
persona.getData();

const $persona = new User('lucia123xz', 'luciabastarda@gmail.com', 'Uu^6N798r%Mx4h9RjM#s', '7c@KXvxYT$dpCr4h24u!');
console.log($persona.getUserInfo());
const instagramAccount = $persona.addData('luciab@gmail.com', '12345', 'https"://instagram.com');
const gitHubAccount = $persona.addData('luciab@gmail.com', '12345', 'https"://github.com');
$persona.getData();