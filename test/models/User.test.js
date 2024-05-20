/** @format */

'use strict';

const PasswordItems = require('./PasswordItems.test');
const { v4: uuidv4 } = require('uuid');
class User {
  constructor(username, email, password, master) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.master = master;
    this.passwordItems = [];
    this.id = uuidv4();
  }
}

module.exports = User;
