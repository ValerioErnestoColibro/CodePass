/** @format */

'use strict';

const CodePass = require('./services/CodePass.test');
const app = new CodePass();

/*
///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                  //
//                        SIGNUP, LOGIN, LOGOUT, DELETE & SESSION ✅                               //
//                                                                                                 //
////////////////////////////////////////////////////////////////////////////////////////////////////
*/

console.log(app.users.getSession());
const $primoUtenteSignUp = app.users.signup('mariorossi', 'mariorossi@gmail.com', 'Mario1234@!', 'Rossi1234@!');
const $primoUtenteLogIn = app.users.login('mariorossi', 'Mario1234@!', 'Rossi1234@!');
console.log(app.users.getSession());
app.users.showUser('mariorossi');
console.log('');
// app.users.logout();
// console.log(app.users.getSession());
// app.users.deleteUser('mariorossi', 'Mario1234@!', 'Rossi1234@!');
// console.log(app.users.getSession());
// app.users.showUser('mariorossi');
// app.users.listUser();

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
//                      UPDATE: USERNAME, EMAIL, PASSWORD, MASTER ✅                             //
//                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////
*/

app.users.updateUsername('mariorossi', 'Mario1234@!', 'Rossi1234@!', 'newmariorossi');
app.users.updateEmail('newmariorossi', 'Mario1234@!', 'Rossi1234@!', 'newrossi@proton.me');
app.users.updatePassword('newmariorossi', 'Mario1234@!', 'Rossi1234@!', 'NEWMario5678@!');
app.users.updateMasterPassword('newmariorossi', 'NEWMario5678@!', 'Rossi1234@!', 'NEWMaster1234@!');
app.users.showUser('newmariorossi');
console.log(app.users.getSession());
console.log('');

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
//                                PASSWORD: ADD & REMOVE ✅                                      //
//                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////
*/

app.password.addPasswordForUser(
  $primoUtenteSignUp,
  'rossi@proton.me',
  'Rossi1234@!',
  'https://wwww.proton.me',
  'Account Proton',
);
app.password.addPasswordForUser(
  $primoUtenteSignUp,
  'rossi@gmail.com',
  'Rossi5678@!',
  'https://wwww.google.com',
  'Account Google',
);
app.password.getPasswordForUser($primoUtenteSignUp);
// app.password.deletePasswordForUser($primoUtenteSignUp, 'rossi@proton.me');
// app.password.deletePasswordForUser($primoUtenteSignUp, 'rossi@gmail.com');
// app.password.getPasswordForUser($primoUtenteSignUp);
// app.users.showUser('newmariorossi');
// app.password.getPasswordForUser($primoUtenteSignUp);
console.log('');

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
//                UPDATE: EMAIL, PASSWORD, WEBSITE, DESCRIPTION ✅                               //
//                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////
*/

app.password.updateEmailForUser($primoUtenteSignUp, 'rossi@proton.me', 'newrossi@proton.me');
app.password.updatePasswordForUser($primoUtenteSignUp, 'newrossi@proton.me', 'NEWMario5678@!');
console.log('');
app.password.getPasswordForUser($primoUtenteSignUp);
console.log('');
app.password.updateEmailForUser($primoUtenteSignUp, 'rossi@gmail.com', 'newrossi@google.com');
app.password.updatePasswordForUser($primoUtenteSignUp, 'newrossi@google.com', 'NEWMario5678@!');
console.log('');
app.password.getPasswordForUser($primoUtenteSignUp);
console.log('');
app.password.updateWebSiteForUser($primoUtenteSignUp, 'newrossi@proton.me', 'https://wwww.NEWproton.me');
app.password.updateDescriptionForUser($primoUtenteSignUp, 'newrossi@proton.me', 'NEWAccount Proton');
console.log('');
app.password.getPasswordForUser($primoUtenteSignUp);
console.log('');
app.password.updateWebSiteForUser($primoUtenteSignUp, 'newrossi@google.com', 'https://wwww.NEWgoogle.com');
app.password.updateDescriptionForUser($primoUtenteSignUp, 'newrossi@google.com', 'NEWAccount Google');
console.log('');
app.password.getPasswordForUser($primoUtenteSignUp);
console.log('');
// app.password.deletePasswordForUser($primoUtenteSignUp, 'newrossi@proton.me');
// app.password.deletePasswordForUser($primoUtenteSignUp, 'newrossi@google.com');
// app.password.getPasswordForUser($primoUtenteSignUp);
// app.users.showUser('newmariorossi');
app.users.logout();
console.log(app.users.getSession());
console.log('');

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
//                                     UTENTE 2: TEST ✅                                         //
//                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////
*/
console.log(app.users.getSession());
const $secondoUtenteSignUp = app.users.signup('marco', 'marco@proton.me', 'Marco1234@!', 'Master1234@!');
app.users.showUser('marco');
const $secondoUtenteLogin = app.users.login('marco', 'Marco1234@!', 'Master1234@!');
console.log(app.users.getSession());
console.log('');
// app.users.deleteUser('marco', 'Marco1234@!', 'Master1234@!');
app.users.listUser();
console.log('');
app.users.updateUsername('marco', 'Marco1234@!', 'Master1234@!', 'newmarco');
app.users.updateEmail('newmarco', 'Marco1234@!', 'Master1234@!', 'newmarco@proton.me');
app.users.updatePassword('newmarco', 'Marco1234@!', 'Master1234@!', 'NEWMarco5678@!');
app.users.updateMasterPassword('newmarco', 'NEWMarco5678@!', 'Master1234@!', 'NEWMaster1234@!');
app.users.showUser('newmarco');
console.log(app.users.getSession());

app.password.addPasswordForUser(
  $secondoUtenteSignUp,
  'marco@proton.me',
  'Marco1234@!',
  'https://wwww.proton.me',
  'Account Proton',
);
// app.password.deletePasswordForUser($secondoUtenteSignUp, 'marco@proton.me');
app.password.getPasswordForUser($secondoUtenteSignUp);
app.password.updateEmailForUser($secondoUtenteSignUp, 'marco@proton.me', 'newmarco@proton.me');
app.password.updatePasswordForUser($secondoUtenteSignUp, 'newmarco@proton.me', 'NEWMarco5678@!');
app.password.updateWebSiteForUser($secondoUtenteSignUp, 'newmarco@proton.me', 'https://wwww.NEWproton.me');
app.password.updateDescriptionForUser($secondoUtenteSignUp, 'newmarco@proton.me', 'NEWAccount Proton');
app.password.getPasswordForUser($secondoUtenteSignUp);
console.log('');
app.users.listUser();
console.log('');
app.password.getPasswordForUser($primoUtenteSignUp);
console.log('');
app.password.getPasswordForUser($secondoUtenteSignUp);
