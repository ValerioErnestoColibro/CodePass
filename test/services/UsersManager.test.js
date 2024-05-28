/** @format */

'use strict';

const User = require('../models/User.test');
const validator = require('validator');
const bcrypt = require('bcrypt');

class UsersManager {
  #users;
  #session;
  constructor() {
    this.#users = [];
    this.#session = null;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                                   //
  //                        VALIDATE & MATCH - FUNZIONI DI VALIDAZIONE E CORRISPONDENZA                //
  //                                                                                                   //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  //? implementare ID

  #validateUserName(username) {
    return /^[a-z0-9_]{3,16}$/.test(username);
  }

  #validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/.test(password);
  }

  #validateEmail(email) {
    return validator.isEmail(email);
  }

  #matchPassword(password, get) {
    return bcrypt.compareSync(password, get);
  }

  #findUserByUsername(username) {
    return this.#users.find((u) => username === u.getUsername());
  }
  #finUserbyEmail(email) {
    return this.#users.find((u) => email === u.getEmail());
  }
  #findUserByPassword(password) {
    return this.#users.find((p) => this.#matchPassword(password, p.getPassword()));
  }
  #findUserByMaster(master) {
    return this.#users.find((p) => this.#matchPassword(master, p.getMaster()));
  }
  #findUserByUsernameAndPassword(username, password, master) {
    return this.#users.find(
      (u) =>
        u.getUsername() === username &&
        this.#findUserByPassword(password, u.getPassword()) &&
        this.#findUserByMaster(master, u.getMaster()) &&
        u.getID() &&
        u.getPasswordItems()
    );
  }

  signup(username, email, password, master) {
    if (this.#session) {
      console.log(`Sei giá loggato ${this.#session.username}! ⚠️`);
      return null;
    }
    if (this.#findUserByUsername(username)) {
      console.log('Username già in uso! ⚠️');
      return null;
    }
    if (this.#finUserbyEmail(email)) {
      console.log('Email già in uso! ⚠️');
      return null;
    }
    if (!this.#validateUserName(username)) {
      console.log('Username non valido! ⚠️');
      return null;
    }

    if (!this.#validateEmail(email)) {
      console.log('Email non valida! ⚠️');
      return null;
    }

    if (!this.#validatePassword(password)) {
      console.log('Password non valida! ⚠️');
      return null;
    }

    if (!this.#validatePassword(master)) {
      console.log('Master Password non valida! ⚠️');
      return null;
    }

    if (!username || !email || !password || !master) {
      console.log('Parametri mancanti! ⚠️');
    }

    const user = new User(username, email, password, master);
    this.#users = [...this.#users, user];
    console.log(`Utente ${user.getUsername()} registrato! ✅`);
    return user;
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                                   //
  //                SIGNUP, LOGIN, LOGOUT & DELETE - GESTIONE DELL'UTENTE                              //
  //                                                                                                   //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  //? Da implementare ID e check immutabilitá

  login(username, password, master) {
    if (this.#session) {
      console.log(`Sei giá loggato ${this.#session.username}! ⚠️`);
      this.getSession();
      return;
    }

    const user = this.#findUserByUsernameAndPassword(username, password, master);

    if (user) {
      this.#session = {
        id: user.getID(),
        username: user.getUsername(),
      };
      console.log(`Utente ${user.getUsername()} loggato! ✅`);
      return user;
    }

    if (!this.#findUserByUsername(username)) {
      console.log('Username non trovato! ⚠️');
    } else if (!this.#findUserByPassword(password)) {
      console.log('Password errata! ⚠️');
    } else if (!this.#findUserByMaster(master)) {
      console.log('Master password errata! ⚠️');
    }

    return null;
  }

  logout() {
    if (this.#session) {
      const username = this.#session.username;
      this.#session = null;
      console.log(`Utente ${username} disconnesso! ✅`);
    } else {
      console.log(`Prima devi effettuare l'accesso ! ⚠️`);
    }
  }

  deleteUser(username, password, master) {
    if (!this.#session) {
      console.log(`Prima devi effettuare l'accesso ! ⚠️`);
    }

    const user = this.#findUserByUsernameAndPassword(username, password, master);

    if (!user) {
      console.log('Credenziali errate o utente non trovato! ⚠️');
    }

    if (this.#session.username !== username) {
      console.log(`Non puoi eliminare un account diverso dal tuo! ⚠️`);
      return;
    }

    this.#users = this.#users.filter((u) => u.getUsername() !== username);
    this.#session = null;
    console.log(`Utente ${username} eliminato! ✅`);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                                   //
  //                UPDATE: USERNAME, EMAIL, PASSWORD & MASTER - MODIFICA DATI UTENTE                  //
  //                                                                                                   //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  //? Da implementare controllo duplicati e ID

  updateUsername(username, password, master, newUsername) {
    if (!this.#session) {
      console.log("Errore: Nessuna sessione attiva. Prima devi effettuare l'accesso! ⚠️");
      return;
    }

    if (!this.#validateUserName(newUsername)) {
      console.log(`Errore: Username ${newUsername} non valido! ⚠️`);
      return;
    }

    const user = this.#findUserByUsernameAndPassword(username, password, master);
    if (!user) {
      console.log('Credenziali errate o utente non trovato! ⚠️');
      return;
    }

    const updatedUsername = this.#users.map((u) => {
      if (u.getUsername() === username) {
        return new User(newUsername, u.getEmail(), password, master);
      }
      return u;
    });

    const checkUsername = updatedUsername.find((u) => u.getUsername() === newUsername);
    if (checkUsername) {
      console.log(`Aggiornamento: Username aggiornato da ${username} a ${newUsername}. ✅`);
      this.#session.username = newUsername;
      this.#users = updatedUsername;
      return checkUsername;
    } else {
      console.log(`Username non aggiornato! ⚠️`);
    }
  }

  updateEmail(username, password, master, newEmail) {
    if (!this.#session) {
      console.log("Nessuna sessione attiva. Prima devi effettuare l'accesso! ⚠️");
      return;
    }

    const user = this.#findUserByUsername(username, password, master);
    if (!user) {
      console.log('Credenziali errate o utente non trovato! ⚠️');
      return;
    }

    const updatedEmail = this.#users.map((u) => {
      if (u.getUsername() === username) {
        if (validator.isEmail(newEmail)) {
          return new User(u.getUsername(), newEmail, password, master);
        } else {
          console.log(`Email ${newEmail} non valida! ⚠️`);
          return u;
        }
      }
      return u;
    });

    const checkEmail = updatedEmail.find((e) => e.getEmail() === newEmail);
    if (checkEmail) {
      console.log(`Aggiornamento: Email aggiornata a ${user.getEmail()}. ✅`);
      this.#users = updatedEmail;
      return checkEmail;
    } else {
      console.log('Email non aggiornata! ⚠️');
    }
  }

  updatePassword(username, password, master, newPassword) {
    if (!this.#session) {
      console.log("Nessuna sessione attiva. Prima devi effettuare l'accesso! ⚠️");
      return;
    }

    const user = this.#findUserByUsernameAndPassword(username, password, master);

    if (!user) {
      console.log('Credenziali errate o utente non trovato! ⚠️');
      return;
    }

    const updatedPassword = this.#users.map((u) => {
      if (u.getUsername() === username) {
        if (this.#validatePassword(newPassword)) {
          return new User(u.getUsername(), u.getEmail(), newPassword, master);
        } else {
          console.log(`Password ${newPassword} non valida! ⚠️`);
          return u;
        }
      }
      return u;
    });

    const checkPassword = updatedPassword.find((p) => this.#matchPassword(newPassword, p.getPassword()));
    if (checkPassword) {
      console.log(`Password dell'utente ${user.getUsername()} aggiornata! ✅`);
      this.#users = updatedPassword;
      return checkPassword;
    } else {
      console.log('Password non aggiornata ! ⚠️');
    }
  }

  updateMaster(username, password, master, newMaster) {
    if (!this.#session) {
      console.log("Nessuna sessione attiva. Prima devi effettuare l'accesso! ⚠️");
      return;
    }

    const user = this.#findUserByUsernameAndPassword(username, password, master);
    if (!user) {
      console.log('Credenziali errate o utente non trovato! ⚠️');
      return;
    }

    const updatedMaster = this.#users.map((m) => {
      if (m.getUsername() === username) {
        if (this.#validatePassword(newMaster)) {
          return new User(m.getUsername(), m.getEmail(), password, newMaster);
        } else {
          console.log(`Master Password ${newMaster} non valida! ⚠️`);
          return m;
        }
      }
      return m;
    });

    const checkMaster = updatedMaster.find((m) => this.#matchPassword(newMaster, m.getMaster()));
    if (checkMaster) {
      console.log(`Master Password dell'utente ${user.getUsername()} aggiornata! ✅`);
      this.#users = updatedMaster;
      return checkMaster;
    } else {
      console.log('Master Password non aggiornata! ⚠️');
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                                   //
  //                                    INFO - GESTIONE INFORMAZIONI                                   //
  //                                                                                                  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  //? funzioni test

  getarray() {
    return this.#users.forEach((u) => console.log(u));
  }

  getSession() {
    return console.log(this.#session);
  }

  showUser(username) {
    const user = this.#users.find((u) => u.getUsername() === username);
    if (user) {
      console.log(
        `👤 Username: ${user.getUsername()}, ✉️ Email: ${user.getEmail()}, 🔒 Password: ${user.getPassword()}, 🔐 MasterPassword: ${user.getMaster()}, 🆔 ID : ${user.getID()},📦 Items : ${user.getPasswordItems()}`
      );
    } else {
      console.log('Utente non trovato! ⚠️');
    }
  }

  listUser() {
    this.#users.forEach((user) =>
      console.log(
        `👤 Username: ${user.getUsername()}, ✉️ Email: ${user.getEmail()}, 🔒 Password: ${user.getPassword()}, 🔐 MasterPassword: ${user.getMaster()}, 🆔 ID : ${user.getID()},📦 Items : ${user.getPasswordItems()}`
      )
    );
  }
}

module.exports = UsersManager;
