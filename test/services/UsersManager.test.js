/** @format */

'use strict';

const User = require('../models/User.test');
var CryptoJS = require('crypto-js');
const validator = require('validator');

function validateUserName(username) {
  return /^[a-z0-9_]{3,16}$/.test(username);
}
function validatePassword(password) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password);
}

class UsersManager {
  #users;
  #session;
  constructor() {
    this.#users = [];
    this.#session = null;
  }

  #hashWithKey(text, key) {
    return CryptoJS.HmacSHA256(text, key).toString(CryptoJS.enc.Hex);
  }

  signup(username, email, password, master) {
    if (!this.#session) {
      if (this.#users.find(u => u.getUsername() === username)) {
        console.log('Username già in uso! ⚠️');
        return null;
      }
      if (!validateUserName(username)) {
        console.log('Username non valido! ⚠️');
        return null;
      }
      if (!validator.isEmail(email)) {
        console.log('Email non valida! ⚠️');
        return null;
      }
      if (!validatePassword(password)) {
        console.log('Password non valida! ⚠️');
        return null;
      }
      if (!validatePassword(master)) {
        console.log('Master Password non valida! ⚠️');
        return null;
      }
      const hashedPassword = this.#hashWithKey(password, master);
      const user = new User(username, email, hashedPassword, master);
      this.#users = [...this.#users, user];
      console.log(`Utente ${user.getUsername()} registrato! ✅`);
      return user;
    } else {
      console.log(`Sei giá loggato ! ⚠️`);
    }
  }

  login(username, password, master) {
    if (!this.#session) {
      const hashedPassword = this.#hashWithKey(password, master);
      const user = this.#users.find(
        u => u.getUsername() === username && u.getPassword() === hashedPassword && u.getMaster() === master,
      );
      if (!!user) {
        this.#session = { id: user.getID(), username: user.getUsername() };
        console.log(`Utente ${user.getUsername()} loggato! ✅`);
        return user;
      } else {
        console.log(`Utente non trovato! ⚠️`);
        return null;
      }
    } else {
      console.log(`Sei giá loggato ! ⚠️`);
      this.getSession();
    }
  }
  logout() {
    if (!!this.#session) {
      const username = this.#session.username;
      this.#session = null;
      console.log(`Utente ${username} disconnesso! ✅`);
      return true;
    } else {
      console.log(`Prima devi effettuare l'accesso ! ⚠️`);
      return false;
    }
  }

  //* todo da rivedere
  deleteUser(username, password, master) {
    if (!!this.#session) {
      const hashedPassword = this.#hashWithKey(password, master);
      const index = this.#users.findIndex(
        u => u.getUsername() === username && u.getPassword() === hashedPassword && u.getMaster() === master,
      );
      if (index !== -1) {
        this.#users = this.#users.filter(
          u => !(u.getUsername() === username && u.getPassword() === hashedPassword && u.getMaster() === master),
        );
        this.#session = null;
        console.log(`Utente ${username} eliminato! ✅`);
      } else {
        console.log(`Utente ${username} non trovato! ⚠️`);
      }
    } else {
      console.log(`Prima devi effettuare l'accesso ! ⚠️`);
    }
  }
  //* da rivedere metodo
  updateUsername(username, password, master, newUsername) {
    if (!!this.#session) {
      const hashedPassword = this.#hashWithKey(password, master);
      const user = this.#users.find(
        u => u.getUsername() === username && u.getPassword() === hashedPassword && u.getMaster() === master,
      );
      if (!!user) {
        if (validateUserName(newUsername)) {
          user.setUsername(newUsername);
          this.#session = { id: user.getID(), username: user.getUsername() };
          console.log(`Username dell'utente ${user.getUsername()} aggiornato! ✅`);
        } else {
          console.log(`Username ${newUsername} non valido! ⚠️`);
        }
      } else {
        console.log(`Utente ${username} non trovato! ⚠️`);
      }
    } else {
      console.log(`Prima devi effettuare l'accesso ! ⚠️`);
    }
  }

  //* da rivedere metodo
  updateEmail(username, password, master, newEmail) {
    if (!!this.#session) {
      const hashedPassword = this.#hashWithKey(password, master);
      const user = this.#users.find(
        u => u.getUsername() === username && u.getPassword() === hashedPassword && u.getMaster() === master,
      );
      if (!!user) {
        if (validator.isEmail(newEmail)) {
          user.setEmail(newEmail);
          console.log(`Email dell'utente ${user.getUsername()} aggiornata! ✅`);
        } else {
          console.log(`Email ${newEmail} non valida! ⚠️`);
        }
      } else {
        console.log(`Utente ${username} non trovato! ⚠️`);
      }
    } else {
      console.log(`Prima devi effettuare l'accesso ! ⚠️`);
    }
  }

  //* da rivedere metodo
  updatePassword(username, password, master, newPassword) {
    if (!!this.#session) {
      const hashedPassword = this.#hashWithKey(password, master);
      const user = this.#users.find(
        u => u.getUsername() === username && u.getPassword() === hashedPassword && u.getMaster() === master,
      );
      if (!!user) {
        if (validatePassword(newPassword)) {
          const newHashedPassword = this.#hashWithKey(newPassword, master);
          user.setPassword(newHashedPassword);
          console.log(`Password dell'utente ${user.getUsername()} aggiornata! ✅`);
        } else {
          console.log(`Password ${newPassword} non valida! ⚠️`);
        }
      } else {
        console.log(`Utente ${username} non trovato! ⚠️`);
      }
    } else {
      console.log(`Prima devi effettuare l'accesso ! ⚠️`);
    }
  }

  //* da rivedere metodo
  updateMasterPassword(username, password, master, newMaster) {
    if (!!this.#session) {
      const hashedPassword = this.#hashWithKey(password, master);
      const user = this.#users.find(
        u => u.getUsername() === username && u.getPassword() === hashedPassword && u.getMaster() === master,
      );
      if (!!user) {
        if (validatePassword(newMaster)) {
          user.setMaster(newMaster);
          console.log(`Master Password dell'utente ${user.getUsername()} aggiornata! ✅`);
        } else {
          console.log(`Master Password ${newMaster} non valida! ⚠️`);
        }
      } else {
        console.log(`Utente ${username} non trovato! ⚠️`);
      }
    } else {
      console.log(`Prima devi effettuare l'accesso ! ⚠️`);
    }
  }

  getSession() {
    return this.#session;
  }

  //!
  showUser(username) {
    const user = this.#users.find(u => u.getUsername() === username);
    if (user) {
      console.log(
        `👤 Username: ${user.getUsername()}, ✉️ Email: ${user.getEmail()}, 🔒 Password: ${user.getPassword()}, 🔐 MasterPassword: ${user.getMaster()}, 🆔 ID : ${user.getID()},📦 Items : ${user.getPasswordItems()}`,
      );
    } else {
      console.log('Utente non trovato! ⚠️');
    }
  }

  //!
  listUser() {
    this.#users.forEach(user =>
      console.log(
        `👤 Username: ${user.getUsername()}, ✉️ Email: ${user.getEmail()}, 🔒 Password: ${user.getPassword()}, 🔐 MasterPassword: ${user.getMaster()}, 🆔 ID : ${user.getID()},📦 Items : ${user.getPasswordItems()}`,
      ),
    );
  }
}

module.exports = UsersManager;
