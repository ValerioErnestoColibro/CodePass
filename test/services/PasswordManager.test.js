/** @format */

'use strict';

const PasswordItems = require('../models/PasswordItems.test');
//validator
// cryptojs or bcrypt
class PasswordManager {
  addPasswordForUser(user, email, password, website, description) {
    if (!user) {
      console.log('Utente non trovato!');
    } else {
      const item = new PasswordItems(email, password, website, description);
      user.passwordItems.push(item);
    }
  }

  getPasswordForUser(user) {
    if (!user) {
      console.log('Utente non trovato!');
    } else {
      return user.passwordItems;
    }
  }

  updatePasswordForUser(user, id, newPassword) {
    // da cambiare con id email e implementare
    if (!user) {
      console.log('Utente non trovato!');
    } else {
      const item = user.passwordItems.find(i => i.email === id);
      if (!item) {
        console.log('Item non trovato!');
      } else {
        item.password = newPassword;
      }
    }
  }

  deletePasswordForUser(user, id) {
    // da cambiare con id email e implementare
    if (!user) {
      console.log('Utente non trovato!');
    } else {
      const index = user.passwordItems.findIndex(i => i.email === id);
      if (index != -1) {
        user.passwordItems.splice(index, 1);
      } else {
        console.log('Item non trovato!');
      }
    }
  }

  // Test func da rimuovere
  printPasswordItems(user) {
    const passwords = this.getPasswordForUser(user);
    if (passwords.length > 0) {
      passwords.forEach(e =>
        console.log(
          `ID: ${e.id}, Email: ${e.email}, Password: ${e.password}, Website: ${e.website}, Description: ${e.description}`,
        ),
      );
    }
  }
}

module.exports = PasswordManager;
