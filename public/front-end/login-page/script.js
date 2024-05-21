const btnSignUp = document.getElementById('signUp');
const btnLogin = document.getElementById('loginJs');
const userName = document.getElementById('username');
const emailJs = document.getElementById('email');
const passwordJs = document.getElementById('password');
const btnRegistrati =  document.getElementById('registratiJs');


btnSignUp.addEventListener('click',()=>{
    btnSignUp.style.display='none'
    btnLogin.style.display='none'
    userName.style.display='block'
    emailJs.style.display='block'
    passwordJs.style.display='block'
    btnRegistrati.style.display='block'
    document.getElementById('icon').style.display='block'
    document.getElementById('icon1').style.display='block'
    document.getElementById('icon2').style.display='block'
})

btnLogin.addEventListener('click',()=>{
    btnSignUp.style.display='none'
    btnLogin.style.display='none'
    userName.style.display='block'
    passwordJs.style.display='block'
    document.getElementById('LoginJs').style.display='block'
    document.getElementById('icon').style.display='block'
    document.getElementById('icon2').style.display='block'
    document.getElementById('marginPass').style.position = 'relative';
    document.getElementById('marginPass').style.bottom = '50px';
    document.getElementById('marginUser').style.position = 'relative';
    document.getElementById('marginUser').style.top = '50px';
})


