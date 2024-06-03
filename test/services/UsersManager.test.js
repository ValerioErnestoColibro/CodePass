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
  //                SIGNUP, LOGIN, LOGOUT & DELETE - GESTIONE DELL'UTENTE                              //
  //                                                                                                   //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  //? ID

  signup(username, email, password, master) {
    if (this.#session) {
      return this.#logAndReturn(`Sei già loggato ${this.#session.username}! ⚠️`, null);
    }

    const validateparam = this.#validateSignupParams(username, email, password, master);
    if (validateparam) {
      return this.#logAndReturn(validateparam, null);
    }

    const user = new User(username, email, password, master);
    this.#users = [...this.#users, user];
    return this.#logAndReturn(`Utente ${user.getUsername()} registrato! ✅`, user);
  }

  login(username, password, master) {
    if (this.#session) {
      return this.#logAndReturn(`Sei già loggato ${this.#session.username}! ⚠️`, this.getSession());
    }

    const user = this.#findUserByUsernameAndPassword(username, password, master);
    if (user) {
      this.#session = {
        id: user.getID(),
        username: user.getUsername(),
      };
      return this.#logAndReturn(`Utente ${user.getUsername()} loggato! ✅`, user);
    }

    const error = this.#loginError(username, password, master);
    return this.#logAndReturn(error, null);
  }

  logout() {
    if (this.#session) {
      const username = this.#session.username;
      this.#session = null;
      return this.#logAndReturn(`Utente ${username} disconnesso! ✅`, true);
    } else {
      return this.#logAndReturn(`Prima devi effettuare l'accesso ! ⚠️`, false);
    }
  }

  deleteUser(username, password, master) {
    if (!this.#session) {
      return this.#logAndReturn("Prima devi effettuare l'accesso! ⚠️", false);
    }

    const user = this.#findUserByUsernameAndPassword(username, password, master);
    if (!user) {
      return this.#logAndReturn('Credenziali errate o utente non trovato! ⚠️', false);
    }

    if (this.#session.username !== username) {
      return this.#logAndReturn('Non puoi eliminare un account diverso dal tuo! ⚠️', false);
    }

    this.#users = this.#users.filter((u) => u.getUsername() !== username);
    this.#session = null;
    return this.#logAndReturn(`Utente ${username} eliminato! ✅`, true);
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                                   //
  //                UPDATE: USERNAME, EMAIL, PASSWORD & MASTER - MODIFICA DATI UTENTE                  //
  //                                                                                                   //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  updateUsername(username, password, master, newUsername) {
    if (!this.#session) {
      return this.#logAndReturn("Errore: Nessuna sessione attiva. Prima devi effettuare l'accesso! ⚠️", false);
    }

    if (!this.#validateUserName(newUsername)) {
      return this.#logAndReturn(`Errore: Username ${newUsername} non valido! ⚠️`, false);
    }

    if (this.#findUserByUsername(newUsername)) {
      return this.#logAndReturn('Username già in uso! ⚠️', false);
    }

    const user = this.#findUserByUsernameAndPassword(username, password, master);
    if (!user) {
      return this.#logAndReturn('Credenziali errate o utente non trovato! ⚠️', false);
    }

    const updatedUsername = this.#users.map((u) => {
      if (u.getUsername() === username) {
        return new User(newUsername, u.getEmail(), u.getPassword(), u.getMaster());
      }
      return u;
    });

    const checkUsername = updatedUsername.find((u) => u.getUsername() === newUsername);
    if (checkUsername) {
      this.#session.username = newUsername;
      this.#users = updatedUsername;
      return this.#logAndReturn(
        `Aggiornamento: Username aggiornato da ${username} a ${newUsername}. ✅`,
        checkUsername
      );
    } else {
      return this.#logAndReturn(`Username non aggiornato! ⚠️`, false);
    }
  }

  updateEmail(username, password, master, newEmail) {
    if (!this.#session) {
      return this.#logAndReturn("Nessuna sessione attiva. Prima devi effettuare l'accesso! ⚠️", false);
    }

    const user = this.#findUserByUsername(username, password, master);
    if (!user) {
      return this.#logAndReturn('Credenziali errate o utente non trovato! ⚠️', false);
    }

    if (this.#finUserbyEmail(newEmail)) {
      return this.#logAndReturn('Email già in uso! ⚠️', false);
    }

    const updatedEmail = this.#users.map((u) => {
      if (u.getUsername() === username) {
        if (validator.isEmail(newEmail)) {
          return new User(u.getUsername(), newEmail, password, master);
        }
        return u;
      }
    });

    const checkEmail = updatedEmail.find((e) => e.getEmail() === newEmail);
    if (checkEmail) {
      this.#users = updatedEmail;
      return this.#logAndReturn(`Aggiornamento: Email aggiornata a ${user.getEmail()}. ✅`, checkEmail);
    } else {
      return this.#logAndReturn('Email non aggiornata! ⚠️', false);
    }
  }

  updatePassword(username, password, master, newPassword) {
    if (!this.#session) {
      return this.#logAndReturn("Nessuna sessione attiva. Prima devi effettuare l'accesso! ⚠️", false);
    }

    const user = this.#findUserByUsernameAndPassword(username, password, master);
    if (!user) {
      return this.#logAndReturn('Credenziali errate o utente non trovato! ⚠️', false);
    }

    const updatedPassword = this.#users.map((u) => {
      if (u.getUsername() === username) {
        if (this.#validatePassword(newPassword)) {
          return new User(u.getUsername(), u.getEmail(), newPassword, master);
        } else {
          return this.#logAndReturn(`Password ${newPassword} non valida! ⚠️`, u);
        }
      }
    });

    const checkPassword = updatedPassword.find((p) => this.#matchPassword(newPassword, p.getPassword()));
    if (checkPassword) {
      this.#users = updatedPassword;
      return this.#logAndReturn(`Password dell'utente ${user.getUsername()} aggiornata! ✅`, checkPassword);
    } else {
      return this.#logAndReturn('Password non aggiornata ! ⚠️', false);
    }
  }

  updateMaster(username, password, master, newMaster) {
    if (!this.#session) {
      return this.#logAndReturn("Nessuna sessione attiva. Prima devi effettuare l'accesso! ⚠️", false);
    }

    const user = this.#findUserByUsernameAndPassword(username, password, master);
    if (!user) {
      return this.#logAndReturn('Credenziali errate o utente non trovato! ⚠️', false);
    }

    const updatedMaster = this.#users.map((m) => {
      if (m.getUsername() === username) {
        if (this.#validatePassword(newMaster)) {
          return new User(m.getUsername(), m.getEmail(), password, newMaster);
        } else {
          return this.#logAndReturn(`Master Password ${newMaster} non valida! ⚠️`, m);
        }
      }
    });

    const checkMaster = updatedMaster.find((m) => this.#matchPassword(newMaster, m.getMaster()));
    if (checkMaster) {
      this.#users = updatedMaster;
      return this.#logAndReturn(`Master Password dell'utente ${user.getUsername()} aggiornata! ✅`, checkMaster);
    } else {
      return this.#logAndReturn('Master Password non aggiornata! ⚠️', false);
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                                   //
  //                                    INFO - GESTIONE INFORMAZIONI                                   //
  //                                                                                                  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  //? Test

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

  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                                   //
  //                        VALIDATE & MATCH - FUNZIONI DI VALIDAZIONE E CORRISPONDENZA                //
  //                                                                                                   //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

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
        this.#findUserByMaster(master, u.getMaster())
    );
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                                    //
  //                         VALIDATE & MATCH - FUNZIONI DI VALIDAZIONE E CORRISPONDENZA                //
  //                                                                                                    //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  #logAndReturn(message, returnValue) {
    console.log(message);
    return returnValue;
  }

  #validateSignupParams(username, email, password, master) {
    if (!username || !email || !password || !master) {
      return 'Parametri mancanti! ⚠️';
    }
    if (this.#findUserByUsername(username)) {
      return 'Username già in uso! ⚠️';
    }
    if (this.#finUserbyEmail(email)) {
      return 'Email già in uso! ⚠️';
    }
    if (!this.#validateUserName(username)) {
      return 'Username non valido! ⚠️';
    }
    if (!this.#validateEmail(email)) {
      return 'Email non valida! ⚠️';
    }
    if (!this.#validatePassword(password)) {
      return 'Password non valida! ⚠️';
    }
    if (!this.#validatePassword(master)) {
      return 'Master Password non valida! ⚠️';
    }
    return null;
  }

  #loginError(username, password, master) {
    const user = this.#findUserByUsername(username);
    if (!user) {
      return 'Username non trovato! ⚠️';
    }

    if (!this.#matchPassword(password, user.getPassword())) {
      return 'Password errata! ⚠️';
    }

    if (!this.#matchPassword(master, user.getMaster())) {
      return 'Master password errata! ⚠️';
    }
    return null;
  }
}

module.exports = UsersManager;
