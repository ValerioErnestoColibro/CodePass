/** @format */

'use strict';

const User = require('../models/User.test');
//validator
// cryptojs or bcrypt
class UsersManager {
  constructor() {
    this.users = [];
  }
  signup(username, email, password, master) {
    // da implementare
    const user = new User(username, email, password, master);
    this.users.push(user);
  }
  login(username, password) {
    // da implementare
    const user = this.users.find(u => u.username === username && u.password === password);
    return user || console.log('');
  }
  deleteUser(email) {
    //da cambiare ID impl
    const index = this.users.findIndex(e => e.email === email);
    if (index != -1) {
      this.users.splice(index, 1);
    } else {
      console.log('Utente non trovato!');
    }
  }
  updateEmail(username, password, newEmail) {
    // da implementare
    const user = this.users.find(u => u.username === username && u.password === password);
    if (!user) {
      console.log('Utente non trovato!');
    } else {
      user.email = newEmail;
    }
  }
  updatePassword(username, password, newPassword) {
    // da implementare
    const user = this.users.find(u => u.username === username && u.password === password);
    if (!user) {
      console.log('Utente non trovato!');
    } else {
      user.password = newPassword;
    }
  }
  listUser() {
    // test update email & pass
    this.users.forEach(x => console.log(`${x.email},${x.username},${x.password}`));
  }
}

module.exports = UsersManager;
