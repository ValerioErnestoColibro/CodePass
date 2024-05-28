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

  //?? Da implementare metodi immutabili e ID

  addPasswordItem(user, email, password, website, description) {
    if (!user) {
      console.log('Utente non trovato! ⚠️');
    }
    if (!email || !password || !website || !description) {
      console.log('Parametri mancanti per aggiungere la password. ⚠️');
    }

    const newItem = new PasswordItems(email, password, website, description);
    const passwordItems = [...user.getPasswordItems(), newItem];
    user.setPasswordItems(passwordItems);

    console.log(
      `Password aggiunta alla cassaforte : ✉️ Email : ${newItem.$getEmail()}, 🔒 Password : ${newItem.$getPassword()}, 🌐 Sito Web : ${newItem.$getWebsite()}, 📜 Descrizione : ${newItem.$getDescription()}`
    );

    return passwordItems;
  }

  deletePasswordItem(user, email) {
    if (!user) {
      console.log('Utente non trovato! ⚠️');
    }

    const paswordItems = user.getPasswordItems();
    const itemDelete = paswordItems.filter((d) => d.$getEmail() !== email);
    user.setPasswordItems(itemDelete);
    console.log(`Item rimosso! ✅`);
    return itemDelete;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////
  //                                                                                                  //
  //                    UPDATE: EMAIL, PASSWORD, WEBSITE & DESCRIPTION                                //
  //                                                                                                  //
  //////////////////////////////////////////////////////////////////////////////////////////////////////

  //?? PasswordItems immutabile ma User mutabile // Da sistemare ... // Da implementare ID

  updateEmailItem(user, email, newEmail) {
    if (!user) {
      console.log('Utente non trovato! ⚠️');
    }

    const item = user.getPasswordItems().find((p) => p.$getEmail() === email);
    if (!item) {
      console.log(`Nessun item trovato! ⚠️`);
    }

    if (item.$getEmail() === newEmail) {
      console.log(`Email uguale! ⚠️`);
    }
    const passwordItems = user.getPasswordItems();
    const updatedEmailItem = passwordItems.map((e) => {
      if (e.$getEmail() === email) {
        return new PasswordItems(newEmail, e.$getPassword(), e.$getWebsite(), e.$getDescription());
      }
      return e;
    });

    const checkEmail = updatedEmailItem.find((f) => f.$getEmail() === newEmail);
    if (checkEmail) {
      console.log(`Aggiornamento: Email ${email} aggiornata a ${newEmail}. ✅`);
      user.setPasswordItems(updatedEmailItem);
      return checkEmail;
    } else {
      console.log(`Email non aggiornata! ⚠️`);
    }
  }

  updatePasswordItem(user, email, newPassword) {
    if (!user) {
      console.log('Utente non trovato! ⚠️');
    }

    const item = user.getPasswordItems().find((p) => p.$getEmail() === email);
    if (!item) {
      console.log(`Nessun item trovato! ⚠️`);
    }

    if (item.$getPassword() === newPassword) {
      console.log(`Password uguale! ⚠️`);
    }

    const passwordItems = user.getPasswordItems();
    const updatedPasswordItem = passwordItems.map((p) => {
      if (p.$getEmail() === email) {
        return new PasswordItems(p.$getEmail(), newPassword, p.$getWebsite(), p.$getDescription());
      }
      return p;
    });

    const checkPassword = updatedPasswordItem.find((f) => f.$getPassword() === newPassword);
    if (checkPassword) {
      console.log(`Aggiornamento: Password aggiornata. ✅`);
      user.setPasswordItems(updatedPasswordItem);
      return checkPassword;
    } else {
      console.log(`Password non aggiornata! ⚠️`);
    }
  }

  updateWebSiteItem(user, email, newWebsite) {
    if (!user) {
      console.log('Utente non trovato! ⚠️');
    }

    const item = user.getPasswordItems().find((p) => p.$getEmail() === email);
    if (!item) {
      console.log(`Nessun item trovato! ⚠️`);
    }

    if (item.$getWebsite() === newWebsite) {
      console.log(`WebSite uguale! ⚠️`);
    }

    const passwordItems = user.getPasswordItems();
    const updatedWebSiteItem = passwordItems.map((w) => {
      if (w.$getEmail() === email) {
        return new PasswordItems(w.$getEmail(), w.$getPassword(), newWebsite, w.$getDescription());
      }
      return w;
    });

    const checkWebSite = updatedWebSiteItem.find((f) => f.$getWebsite() === newWebsite);
    if (checkWebSite) {
      console.log(`Aggiornamento: Website ${newWebsite} aggiornato. ✅`);
      user.setPasswordItems(updatedWebSiteItem);
      return checkWebSite;
    } else {
      console.log(`WebSite non aggiornato! ⚠️`);
    }
  }

  updateDescriptionItem(user, email, newDescription) {
    if (!user) {
      console.log('Utente non trovato! ⚠️');
    }

    const item = user.getPasswordItems().find((p) => p.$getEmail() === email);
    if (!item) {
      console.log(`Nessun item trovato! ⚠️`);
    }

    if (item.$getDescription() === newDescription) {
      console.log(`Descrizione uguale! ⚠️`);
    }

    const passwordItems = user.getPasswordItems();
    const updatedDescriptionItem = passwordItems.map((d) => {
      if (d.$getEmail() === email) {
        return new PasswordItems(d.$getEmail(), d.$getPassword(), d.$getWebsite(), newDescription);
      }
      return d;
    });

    const checkDescription = updatedDescriptionItem.find((f) => f.$getDescription() === newDescription);
    if (checkDescription) {
      console.log(`Aggiornamento: Descrizione ${newDescription} aggiornata. ✅`);
      user.setPasswordItems(updatedDescriptionItem);
      return checkDescription;
    } else {
      console.log(`Descrizione non aggiornata! ⚠️`);
    }
  }
}

module.exports = PasswordManager;
