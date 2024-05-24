/** @format */

'use strict';

const PasswordItems = require('./PasswordItems.test');
const UsersManager = require('../services/UsersManager.test');
const { v4: uuidv4 } = require('uuid');
const validator = require('validator');
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
    this.#password = password;
    this.#master = master;
    this.#passwordItems = [];
    this.#id = uuidv4();
  }

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
    this.#password = password;
  }
  getMaster() {
    return this.#master;
  }
  setMaster(master) {
    this.#master = master;
  }
  getID() {
    return this.#id;
  }
  getPasswordItems() {
    return this.#passwordItems;
  }
  //!
  printPasswordItems() {
    this.#passwordItems.forEach(passwordItem => {
      console.log(passwordItem);
    });
  }
  addPasswordItem(passwordItem) {
    this.#passwordItems = [...this.#passwordItems, passwordItem];
  }
  //* da rivedere
  removePasswordItem(passwordItem) {
    const index = this.#passwordItems.indexOf(passwordItem);
    if (index !== -1) {
      this.#passwordItems.splice(index, 1);
    }
  }
}

module.exports = User;
