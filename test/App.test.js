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
console.log('Session 🌐');
app.users.getSession();
console.log('SIGNUP & LOGIN 👤');
const firstUserSign = app.users.signup('mariorossi', 'mariorossi@gmail.com', 'Password1234@!', 'Master5678@!');
const firstUserLoging = app.users.login('mariorossi', 'Password1234@!', 'Master5678@!');
console.log('SESSION 🌐 & LIST 👤');
app.users.getSession();
app.users.listUser();
// console.log('LOGOUT ❌ & SESSION 🌐');
// app.users.logout();
// app.users.getSession();
// console.log('DELETE ❌');
// app.users.deleteUser('mariorossi', 'Password1234@!', 'Master5678@!');
// app.users.listUser();
// console.log('USER 2 👤');
// console.log('SIGNUP & LOGIN 👤');
// const secondUserSign = app.users.signup('luciaverdi', 'luciaverdi@proton.me', 'Password1234@!', 'Master5678@!');
// const secondUserLogin = app.users.login('luciaverdi', 'Password1234@!', 'Master5678@!');
// console.log('SESSION 🌐 & LIST 👤');
// app.users.getSession();
// app.users.listUser();
// app.users.getarray();
// console.log('LOGOUT ❌ & SESSION 🌐');
// app.users.logout();
// app.users.getSession();
// console.log('DELETE ❌');
// app.users.deleteUser('luciaverdi', 'Password1234@!', 'Master5678@!');
// app.users.listUser();

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
//                      UPDATE: USERNAME, EMAIL, PASSWORD, MASTER ✅                             //
//                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////
*/

// console.log('UPDATE: USERNAME,EMAIL,PASSWORD & MASTER ✅');
// app.users.updateEmail('luciaverdi', 'Password1234@!', 'Master5678@!', 'newlucia@gmail.com');
// app.users.updateUsername('luciaverdi', 'Password1234@!', 'Master5678@!', 'newluciauser');
// app.users.updatePassword('newluciauser', 'Password1234@!', 'Master5678@!', 'newPass123@!');
// app.users.updateMaster('newluciauser', 'newPass123@!', 'Master5678@!', 'newMast1234@!');
// app.users.listUser();
// app.users.logout();

console.log('UTENTE 1 👤');
app.users.login('mariorossi', 'Password1234@!', 'Master5678@!');
app.users.updateUsername('mariorossi', 'Password1234@!', 'Master5678@!', 'newrossi');
app.users.updateEmail('newrossi', 'Password1234@!', 'Master5678@!', 'newrossi@outlook.it');
app.users.updatePassword('newrossi', 'Password1234@!', 'Master5678@!', 'newPass123@!');
const fistUserUpdated = app.users.updateMaster('newrossi', 'newPass123@!', 'Master5678@!', 'newMast1234@!');
app.users.listUser();

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
//                                PASSWORD: ADD & REMOVE ✅                                      //
//                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////
*/
console.log('TEST PASSWORDITEMS 📦');
app.password.addPasswordItem(fistUserUpdated, 'email', 'passwrd', 'website', 'description');
app.password.addPasswordItem(fistUserUpdated, '1', '2', '3', '4');
app.password.updateEmailItem(fistUserUpdated, 'email', 'newemail');
app.password.updatePasswordItem(fistUserUpdated, 'newemail', 'newPASSWORD');
app.password.updateWebSiteItem(fistUserUpdated, 'newemail', 'newWEBSITE');
app.password.updateDescriptionItem(fistUserUpdated, 'newemail', 'newDESCRIPTION');
app.password.updateDescriptionItem(fistUserUpdated, '1', 'newDESCRIPTION0000');
// app.password.deletePasswordItem(fistUserUpdated, 'newemail');
app.users.listUser();
fistUserUpdated.print();

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
