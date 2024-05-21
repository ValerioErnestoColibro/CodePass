/** @format */

'use strict';
const { v4: uuidv4 } = require('uuid');

class PasswordItems {
  constructor(email, password, website, description) {
    this.email = email;
    this.password = password;
    this.website = website;
    this.description = description;
    this.id = uuidv4();
  }
}

module.exports = PasswordItems;
