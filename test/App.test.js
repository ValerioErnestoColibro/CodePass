/** @format */

'use strict';

const CodePass = require('./services/CodePass.test');
const app = new CodePass();

const $UserSign = app.users.signup('Username', 'Esempio@email.com', 'Password', 'MasterPassword');
const $UserLog = app.users.login('Username', 'Password');
console.log('Utente 1');
console.log('');
console.log($UserLog);
console.log('');
app.password.addPasswordForUser($UserLog, 'Esempio@email.com', 'Password', 'Website', 'Descrizione');
console.log(app.password.getPasswordForUser($UserLog));
console.log('');
app.password.printPasswordItems($UserLog);
console.log('');
console.log('Utente 2');
console.log('');
const $UserSign2 = app.users.signup('Username2', 'Esempio@email.com', 'Password2', 'MasterPassword2');
const $UserLog2 = app.users.login('Username2', 'Password2');
console.log($UserLog2);
console.log('');
app.password.addPasswordForUser($UserLog2, 'Esempio@email.com1', 'Password1', 'Website1', 'Descrizione1');
app.password.addPasswordForUser($UserLog2, 'Esempio@email.com2', 'Password2', 'Website2', 'Descrizione2');
console.log(app.password.getPasswordForUser($UserLog2));
console.log('');
app.users.listUser();
app.password.printPasswordItems($UserLog2);
// app.users.deleteUser('Esempio@email.com');
app.users.listUser();
app.users.updateEmail('Username2', 'Password2', 'email@nuova.com');
app.users.listUser();
app.users.updatePassword('Username2', 'Password2', 'nuovaPassword');
app.users.listUser();
console.log(' ');
app.password.printPasswordItems($UserLog);
console.log(' ');
app.password.updatePasswordForUser($UserLog, 'Esempio@email.com', 'newPasswordItems');
console.log(' ');
app.password.printPasswordItems($UserLog);
console.log(' ');
app.password.printPasswordItems($UserLog2);
console.log(' ');
app.password.deletePasswordForUser($UserLog2, 'Esempio@email.com2');
console.log(' ');
app.password.printPasswordItems($UserLog2);
console.log(' ');
