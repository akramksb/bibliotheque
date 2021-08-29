const addUserText = document.querySelector(".addUser-text");
const addUserBtn = document.querySelector("button.addUser-btn");
const form = document.querySelector("form");
const usernameInput = document.querySelector(".username");
const passwordMessage = document.querySelector(".error-password")
const cneMessage = document.querySelector(".error-cne")

const imgInput = document.querySelector(".image-select input")
// const imgPreview = document.querySelector(".preview-upload")
const imgSelect = document.querySelector(".image-select")
const imgHide = document.querySelector(".image-select .to-hide")
const imgShow = document.querySelector(".image-select .to-show")
const reselectImg = document.querySelector(".reselect-img")
const removeImg = document.querySelector(".remove-img")


imgInput.addEventListener("change", function () {
    const files = imgInput.files[0];
    if (files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
        // imgPreview.src = this.result;
        imgInput.style.display = "none"
        imgHide.style.display = "none";
        imgSelect.style.backgroundImage = `url(${this.result})`
        imgShow.style.display = "flex"
        });    
    }
});
reselectImg.addEventListener('click', e=>{
    imgInput.click();
});
removeImg.addEventListener('click', e=>{
    imgInput.style.display = "block"
    imgHide.style.display = "block";
    imgSelect.style.backgroundImage = ""
    imgShow.style.display = "none"
});





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
