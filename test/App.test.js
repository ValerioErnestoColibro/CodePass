/** @format */

'use strict';

const CodePass = require('./services/CodePass.test');
const app = new CodePass();

//Utente 1 👤
// Validate: username ✅, email ✅, password ✅, master ✅, username duplicati ✅
const $primoUtenteSignUp = app.users.signup('mariorossi', 'mariorossi@gmail.com', 'Mario1234@!', 'Rossi1234@!');
app.users.showUser('mariorossi');
app.users.listUser();
//
console.log(``);
// Login + Session update ✅
const $primoUtenteLogIn = app.users.login('mariorossi', 'Mario1234@!', 'Rossi1234@!');
app.users.getSession();

//
console.log(``);

// Logout + Session update ✅
app.users.logout();
app.users.getSession();

//Delete User + Session update ✅
// app.users.deleteUser('mariorossi', 'Mario1234@!', 'Rossi1234@!');
// app.users.getSession();

// Update Username + Session update ✅
// app.users.updateUsername('mariorossi', 'Mario1234@!', 'Rossi1234@!', 'newmariorossi');
// app.users.getSession();
// app.users.showUser('newmariorossi');

// Update Email ✅
// app.users.updateEmail('mariorossi', 'Mario1234@!', 'Rossi1234@!', 'rossiemail@gmail.com');
// app.users.showUser('mariorossi');

//Update Password ✅
// app.users.updatePassword('mariorossi', 'Mario1234@!', 'Rossi1234@!', 'newPass1234@');
// app.users.showUser('mariorossi');

// Update MasterPasswors ✅
// app.users.updateMasterPassword('mariorossi', 'Mario1234@!', 'Rossi1234@!', 'newMaster1234@');
// app.users.showUser('mariorossi');

// Utente 2
const $secondoUtente = app.users.signup('luciabastarda', 'luciabastarda@proton.me', 'lucillA01@', 'Masterlucia@0');
const $secondoUtenteLog = app.users.login('luciabastarda', 'lucillA01@', 'Masterlucia@0');
app.users.getSession();

app.users.updateUsername('luciabastarda', 'lucillA01@', 'Masterlucia@0', 'newluciau');
app.users.getSession();
