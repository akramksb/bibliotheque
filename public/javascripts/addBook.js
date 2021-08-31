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
reselectImg.addEventListener('click', e => {
    imgInput.click();
});
removeImg.addEventListener('click', e => {
    imgInput.style.display = "block"
    imgHide.style.display = "block";
    imgSelect.style.backgroundImage = ""
    imgShow.style.display = "none"
});





form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = new FormData();
    let jsonData = {
        isbn: form.isbn.value,
        qte: form.quantite.value,
        title: form.titre.value,
        image : null
    }
    jsonData = JSON.stringify(jsonData)
    // json data will bee sent as file
    const blob = new Blob([jsonData], {
        type: 'application/json'
    });
    data.append("details", blob);
    data.append('image', imgInput.files[0])

    const rawResponse = await fetch('/addBook', {
        method: 'POST',
        body: data
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
    form.isbn.value = "";
    form.quantite.value = "";
    form.titre.value = "";
    removeImg.click()
})
