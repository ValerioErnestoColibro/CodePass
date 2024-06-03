/** @format */

'use strict';

const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
class User {
  #username;
  #email;
  #password;
  #master;
  #passwordItems;
  #id;

  constructor(username, email, password, master) {
    this.#username = username;
    this.#email = email;
    this.#password = bcrypt.hashSync(password, 10);
    this.#master = bcrypt.hashSync(master, 10);
    this.#passwordItems = [];
    this.#id = uuidv4();
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                                   //
  //                            GET & SET - OPERAZIONI DI RECUPERO E IMPOSTAZIONE                     //
  //                                                                                                   //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  getUsername() {
    return this.#username;
  }

  setUsername(username) {
    this.#username = username;
  }

  getEmail() {
    return this.#email;
  }

  setEmail(email) {
    this.#email = email;
  }

  getPassword() {
    return this.#password;
  }

  setPassword(password) {
    this.#password = bcrypt.hashSync(password, 10);
  }

  getMaster() {
    return this.#master;
  }

  setMaster(master) {
    this.#master = bcrypt.hashSync(master, 10);
  }

  getID() {
    return this.#id;
  }

  getPasswordItems() {
    return this.#passwordItems;
  }
  setPasswordItems(passwordItems) {
    this.#passwordItems = passwordItems;
  }

  //? test
  print() {
    return this.#passwordItems.forEach((p) =>
      console.log(
        `✉️ Email: ${p.$getEmail()}, 🔒 Password: ${p.$getPassword()}, 🌐 WebSite: ${p.$getWebsite()}, 📜 Description : ${p.$getDescription()}`
      )
    );
  }
}

module.exports = User;
