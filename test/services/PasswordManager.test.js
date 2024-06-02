/** @format */

'use strict';

const PasswordItems = require('../models/PasswordItems.test');
const User = require('../models/User.test');

class PasswordManager {
  ///////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                                   //
  //                              PASSWORD: ADD & DELETE - GESTIONE PASSWORD                           //
  //                                                                                                   //
  ///////////////////////////////////////////////////////////////////////////////////////////////////////

  addPasswordItem(user, email, password, website, description) {
    this.#validateUser(user);
    this.#validateParam(email, password, website, description);

    const newItem = new PasswordItems(email, password, website, description);
    const passwordItems = [...user.getPasswordItems(), newItem];
    user.setPasswordItems(passwordItems);

    return this.#logAndReturn(
      `Password aggiunta alla cassaforte : ✉️ Email : ${newItem.$getEmail()}, 🔒 Password : ${newItem.$getPassword()}, 🌐 Sito Web : ${newItem.$getWebsite()}, 📜 Descrizione : ${newItem.$getDescription()}`,
      newItem.$getId()
    );
  }

  deletePasswordItem(user, id) {
    this.#validateUser(user);

    const paswordItems = user.getPasswordItems();
    const itemDelete = paswordItems.filter((d) => d.$getId() !== id);
    user.setPasswordItems(itemDelete);

    return this.#logAndReturn(`Item rimosso! ✅`, itemDelete);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                                  //
  //                    UPDATE: EMAIL, PASSWORD, WEBSITE & DESCRIPTION                                //
  //                                                                                                  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  updateEmailItem(user, id, newEmail) {
    this.#updatePasswordItem(user, id, newEmail, 'email');
  }

  updatePasswordItem(user, id, newPassword) {
    this.#updatePasswordItem(user, id, newPassword, 'password');
  }

  updateWebSiteItem(user, id, newWebsite) {
    this.#updatePasswordItem(user, id, newWebsite, 'website');
  }

  updateDescriptionItem(user, id, newDescription) {
    this.#updatePasswordItem(user, id, newDescription, 'description');
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                                    //
  //                               PRIVATE METHODS - METODI PRIVATI                                     //
  //                                                                                                    //
  ////////////////////////////////////////////////////////////////////////////////////////////////////////

  #logAndReturn(message, returnValue) {
    console.log(message);
    return returnValue;
  }

  #validateUser(user) {
    if (!user) {
      this.#logAndReturn('Utente non trovato! ⚠️', false);
    }
  }

  #validateParam(email, password, website, description) {
    if (!email || !password || !website || !description) {
      this.#logAndReturn('Parametri mancanti per aggiungere la password. ⚠️', false);
    }
  }

  #updatePasswordItem(user, id, newValue, type) {
    this.#validateUser(user);

    const index = user.getPasswordItems().findIndex((u) => u.$getId() === id);
    if (index === -1) {
      this.#logAndReturn(`Nessun item trovato! ⚠️`, false);
    }

    let spread = [...user.getPasswordItems()];
    let updatedItem = spread[index];

    switch (type) {
      case 'email':
        updatedItem.$setEmail(newValue);
        break;
      case 'password':
        updatedItem.$setPassword(newValue);
        break;
      case 'website':
        updatedItem.$setWebSite(newValue);
        break;
      case 'description':
        updatedItem.$setDescription(newValue);
        break;
      default:
        this.#logAndReturn(`Aggiornamento non valido! ⚠️`, false);
    }

    this.#logAndReturn(`Aggiornamento : ${type} aggiornata! ✅`, updatedItem);
  }
}

module.exports = PasswordManager;
