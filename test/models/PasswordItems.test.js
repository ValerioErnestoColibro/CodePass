/** @format */

'use strict';
const { v4: uuidv4 } = require('uuid');

class PasswordItems {
  #email;
  #password;
  #website;
  #description;
  #id;
  constructor(email, password, website, description) {
    this.#email = email;
    this.#password = password;
    this.#website = website;
    this.#description = description;
    this.#id = uuidv4();
  }
  $getEmail() {
    return this.#email;
  }

  $setEmail(email) {
    this.#email = email;
  }

  $getPassword() {
    return this.#password;
  }

  $setPassword(password) {
    this.#password = password;
  }

  $getWebsite() {
    return this.#website;
  }

  $setWebsite(website) {
    this.#website = website;
  }

  $getDescription() {
    return this.#description;
  }

  $setDescription(description) {
    this.#description = description;
  }

  $getId() {
    return this.#id;
  }
}

module.exports = PasswordItems;
