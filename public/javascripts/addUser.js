const addUserText = document.querySelector(".addUser-text");
const addUserBtn = document.querySelector("button.addUser-btn");
const form = document.querySelector("form");
const usernameInput = document.querySelector(".username");
const roleSelect = document.querySelector(".role-select");
const passwordMessage = document.querySelector(".error-password")
const cneMessage = document.querySelector(".error-cne")


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
    cneMessage.style.display = "none"
    passwordMessage.style.display = "none"
    let data = null;

    if (form.role.value == 'student')
    {
        let userExist = await fetch(`/users/students/${form.cne.value}`);
        let userExistContent = await userExist.json();
        if (userExistContent)
        {
            cneMessage.textContent = "CNE existe deja"
            cneMessage.style.display = "block"
            return;
        }
        if ( form.password.value !== form.passwordRepet.value )
        {
            passwordMessage.textContent = "le mot de passe ne correspond pas"
            passwordMessage.style.display = "block"
            return;
        }
        data = {
            name : form.name.value,
            lastname : form.lastname.value,
            cne : form.cne.value,
            password: form.password.value,
            role : form.role.value
        }

    }
    else if (form.role.value == 'admin')
    {
        let userExist = await fetch(`/users/admins/${form.username.value}`);
        let userExistContent = await userExist.json();
        if (userExistContent)
        {
            cneMessage.textContent = "username existe deja"
            cneMessage.style.display = "block"
            return;
        }
        if ( form.password.value !== form.passwordRepet.value )
        {
            passwordMessage.textContent = "le mot de passe ne correspond pas"
            passwordMessage.style.display = "block"
            return;
        }
        data = {
            name : form.name.value,
            lastname : form.lastname.value,
            username : form.username.value,
            password: form.password.value,
            role : form.role.value
        }
    }

    const rawResponse = await fetch('/addUser', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    const content = await rawResponse.json();

    let opacity = 65;
    let rgbValues = "220, 20, 60"
    if (content.id)
        rgbValues = "48,212,66"
    
    let opChange = setInterval( ()=>{
        opacity--;
        form.parentElement.style.backgroundColor = `rgba(${rgbValues},${opacity}%)`
        if (opacity == 0)
            clearInterval(opChange)
    }, 1 )
    form.name.value = "";
    form.lastname.value = "";
    form.password.value = "";
    form.passwordRepet.value = "";
    try { form.cne.value = ""; } 
    catch { form.username.value = ""; }
})

form.role.value = "student"