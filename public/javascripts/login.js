const loginText = document.querySelector(".login-text");
const loginBtn = document.querySelector("button.login-btn");
const form = document.querySelector("form");
const usernameInput = document.querySelector(".username");
const roleSelect = document.querySelector(".role-select");
const errorMessage = document.querySelector(".error-login")

roleSelect.addEventListener('click', e => {
    if ( e.target.nodeName == 'INPUT')
    {
        if (e.target.id == 'admin')
        {
            usernameInput.children[0].textContent = "Nom d'utilisateur";
            usernameInput.children[0].setAttribute("for", "username");
            usernameInput.children[1].setAttribute("id", "username");
            usernameInput.children[1].setAttribute("name", "username");

        }
        else {
            usernameInput.children[0].textContent = "CNE";
            usernameInput.children[0].setAttribute("for", "cne");
            usernameInput.children[1].setAttribute("id", "cne");
            usernameInput.children[1].setAttribute("name", "cne");
        }
    }
})

form.addEventListener('submit', async e =>{
    e.preventDefault();
    if (form.role.value == 'student')
    {
        let data = {
            cne : form.cne.value,
            password: form.password.value,
            role : form.role.value
        }
        const rawResponse = await fetch('/login', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        
        //redirect user
        const content = await rawResponse.json();
        if (content.id)
            location.assign('/student')
        else
        {
            errorMessage.textContent = content;
            errorMessage.style.display = "block"
        }
    }
    else if (form.role.value == 'admin')
    {
        let data = {
            username : form.username.value,
            password: form.password.value,
            role : form.role.value
        }
        const rawResponse = await fetch('/login', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        
        //redirect user
        const content = await rawResponse.json();
        if (content.id)
            location.assign('/admin')
        else
        {
            errorMessage.textContent = content;
            errorMessage.style.display = "block"
        }
    }
})

form.role.value = "student"
async function redirect()
{
    const rawResponse = await fetch('/users/current');
    const user = await rawResponse.json();

    if (user.role == "student")
        location.assign('/student')
    else if (user.role == "admin")
        location.assign('/admin')
}
redirect()

// post

// const rawResponse = await fetch('http://localhost:3000/users', {
//     method: 'POST',
//     headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
// });
// // delete this
// const content = await rawResponse.json();
// console.log(content);