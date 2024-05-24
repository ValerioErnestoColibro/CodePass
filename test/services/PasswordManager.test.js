/** @format */

'use strict';

const PasswordItems = require('../models/PasswordItems.test');
const User = require('../models/User.test');

//* da implementare metodi , verifiche ...
class PasswordManager {
  //* da rivedere
  addPasswordForUser(user, email, password, website, description) {
    if (!user) {
      console.log('Utente non trovato! 🔎');
    } else {
      const passwordItem = new PasswordItems(email, password, website, description);
      user.addPasswordItem(passwordItem);
      console.log(
        `Password aggiunta alla cassaforte : ✉️ Email : ${passwordItem.$getEmail()}, 🔒 Password : ${passwordItem.$getPassword()}, 🌐 Sito Web : ${passwordItem.$getWebsite()}, 📜 Descrizione : ${passwordItem.$getDescription()}`,
      );
      return passwordItem;
    }
  }

  //* da rivedere meotdi e cambiare email con ID
  updateEmailForUser(user, email, newEmail) {
    if (!user) {
      console.log('Utente non trovato! 🔎');
    } else {
      const item = user.getPasswordItems().find(p => p.$getEmail() === email);
      if (!!item) {
        item.$setEmail(newEmail);
        console.log(`Email ${item.$getEmail()} aggiornata ✅`);
      } else {
        console.log(`Item non trovato! ⚠️`);
      }
    }
  }

  //* da rivedere metodi e cambiare email con ID
  updatePasswordForUser(user, email, newPassword) {
    if (!user) {
      console.log('Utente non trovato! 🔎');
    } else {
      const item = user.getPasswordItems().find(p => p.$getEmail() === email);
      if (!!item) {
        item.$setPassword(newPassword);
        console.log(`Password ${item.$getPassword()} aggiornata ✅`);
      } else {
        console.log(`Item non trovato! ⚠️`);
      }
    }
  }

  //* da rivedere metodi e cambiare email con ID
  updateWebSiteForUser(user, email, newWebsite) {
    if (!user) {
      console.log('Utente non trovato! 🔎');
    } else {
      const item = user.getPasswordItems().find(p => p.$getEmail() === email);
      if (!!item) {
        item.$setWebsite(newWebsite);
        console.log(`Sito Web ${item.$getWebsite()} aggiornato ✅`);
      } else {
        console.log(`Item non trovato! ⚠️`);
      }
    }
  }
  updateDescriptionForUser(user, email, newDescription) {
    if (!user) {
      console.log('Utente non trovato! 🔎');
    } else {
      const item = user.getPasswordItems().find(p => p.$getEmail() === email);
      if (!!item) {
        item.$setDescription(newDescription);
        console.log(`Descrizione ${item.$getDescription()} aggiornata ✅`);
      } else {
        console.log(`Item non trovato! ⚠️`);
      }
    }
  }

  //* da rivedere metodi e cambiare email con ID
  deletePasswordForUser(user, email) {
    if (!user) {
      console.log('Utente non trovato! 🔎');
    } else {
      const item = user.getPasswordItems().find(p => p.$getEmail() === email);
      if (!!item) {
        console.log(`Elemento cassaforte ${item.$getId()} eliminato ✅`);
        user.removePasswordItem(item);
      } else {
        console.log(`Item non trovato! ⚠️`);
      }
    }
  }

  //!
  getPasswordForUser(user) {
    if (!user) {
      console.log('Utente non trovato!');
    } else {
      return user.printPasswordItems();
    }
  }
}

module.exports = PasswordManager;
