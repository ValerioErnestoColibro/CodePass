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
app.users.updateMaster('newmariorossi', 'Newpa123@!', 'Master1234@!', 'Newmaster123@!');
app.users.listUser();

/*
////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
//                                PASSWORD: ADD & REMOVE ✅                                      //
//                                                                                               //
//////////////////////////////////////////////////////////////////////////////////////////////////
*/

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
