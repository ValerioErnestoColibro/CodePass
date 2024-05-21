/** @format */

'use strict';

const UsersManager = require('./UsersManager.test');
const PasswordManager = require('./PasswordManager.test');

class CodePass {
  constructor() {
    this.users = new UsersManager();
    this.password = new PasswordManager();
  }
}

module.exports = CodePass;
