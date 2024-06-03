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

//check param , validate , duplicate & session
app.users.getSession();
const $persona1 = app.users.signup('mariorossi', 'mariorossi@gmail.com', 'Password1234@!', 'Master1234@!');
app.users.login('mariorossi', 'Password1234@!', 'Master1234@!');
// app.users.login('mariorossi', 'Password1234@!', 'Master1234@!');
app.users.getSession();
// app.users.logout();
// app.users.getSession();
// app.users.logout();
// app.users.listUser();
// app.users.deleteUser('mariorossi', 'Password1234@!', 'Master1234@!');
// app.users.listUser();

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
//                      UPDATE: USERNAME, EMAIL, PASSWORD, MASTER ✅                             //
//                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////
*/

//check param , validate , duplicate & session
app.users.updateUsername('mariorossi', 'Password1234@!', 'Master1234@!', 'newmariorossi');
app.users.getSession(); // check update session
app.users.updateEmail('newmariorossi', 'Password1234@!', 'Master1234@!', 'newmariorossi@gmail.com');
app.users.updatePassword('newmariorossi', 'Password1234@!', 'Master1234@!', 'Newpa123@!');
const updatedUser = app.users.updateMaster('newmariorossi', 'Newpa123@!', 'Master1234@!', 'Newmaster123@!');
// app.users.listUser();
console.log('');
const itemPrimo = app.password.addPasswordItem(
  updatedUser,
  'example@email.com',
  'password1234@!',
  'google.com',
  'google desc'
);
const itemSecondo = app.password.addPasswordItem(updatedUser, '1', '2', '3', '4');
app.password.updateEmailItem(updatedUser, itemPrimo, 'newemail@gmail.com');
app.password.updatePasswordItem(updatedUser, itemPrimo, 'newPassword');
app.password.updateEmailItem(updatedUser, itemSecondo, 'newEMAIL');
app.password.updateWebSiteItem(updatedUser, itemPrimo, 'newWEBSITE');
app.password.updateDescriptionItem(updatedUser, itemPrimo, 'newDESC');
// console.log('');
// // app.users.listUser();
// app.password.deletePasswordItem(updatedUser, itemPrimo);
updatedUser.print();
// app.users.listUser();

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
//                                PASSWORD: ADD & REMOVE ✅                                      //
//                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////
*/

// app.users.listUser();
// // app.password.deletePasswordItem(updatedUser, 'example@email.com');
// // app.users.listUser();
// app.password.updateEmailItem(updatedUser, 'example@email.com', 'newemail@gmail.com');
// app.users.showUser('newmariorossi');

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
//                UPDATE: EMAIL, PASSWORD, WEBSITE, DESCRIPTION ✅                               //
//                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////
*/

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
//                                     UTENTE 2: TEST ✅                                         //
//                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////
*/
