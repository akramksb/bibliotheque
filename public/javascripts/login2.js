const signupText = document.querySelector(".sign-up-text");
const loginText = document.querySelector(".login-text");
const loginContainer = document.querySelector(".login-container");
const cancelLoginBtn = document.querySelector(".cancel-login");

loginText.addEventListener('click', e=>{
    loginContainer.style.display = 'block';
})

cancelLoginBtn.addEventListener('click', e=>{
    loginContainer.style.display = 'none';
})

loginContainer.addEventListener('click', e=>{
    if (e.target.className == "login-container")
    {
    loginContainer.style.display = 'none';
    }
})