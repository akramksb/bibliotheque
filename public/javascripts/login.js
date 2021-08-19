const loginText = document.querySelector(".login-text");
const loginBtn = document.querySelector("button.login-btn");
const form = document.querySelector("form");
const usernameInput = document.querySelector(".username");
const roleSelect = document.querySelector(".role-select");

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
        data = {
            cne : form.cne.value,
            password: form.password.value,
            role : form.role.value
        }
        const rawResponse = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
        const content = await rawResponse.json();
        console.log(content);
    }
})


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