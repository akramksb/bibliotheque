const addLoanBtn = document.querySelector("button.addLoan-btn");
const form = document.querySelector("form");
const delaiInput = document.querySelector(".delai");
const cneMessage = document.querySelector(".error-cne")
const isbnMessage = document.querySelector(".error-isbn")
const submitMessage = document.querySelector(".error-submit")



form.addEventListener('submit', async e =>{
    e.preventDefault();
    cneMessage.style.display = "none"
    isbnMessage.style.display = "none"
    submitMessage.style.display = "none"
    let data = null;

    data = {
        bookId : form.isbn.value,       // should be bookISBN
        etudiantId : form.cne.value,    // and etudiantCNE
        delai : form.delai.value,
        date : new Date()
    }
    
    
    const rawResponse = await fetch('/addLoan', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    
    const content = await rawResponse.json();
    
    // catching errors
    if (rawResponse.status == 400 && content.error)
    {
        submitMessage.textContent = content.error
        submitMessage.style.display = "block"
        return;
    }

    let opacity = 65;
    let rgbValues = "220, 20, 60"
    if (rawResponse.status == 200)
        rgbValues = "48,212,66"
    
    let opChange = setInterval( ()=>{
        opacity--;
        form.parentElement.style.backgroundColor = `rgba(${rgbValues},${opacity}%)`
        if (opacity == 0)
            clearInterval(opChange)
    }, 10 )
    form.name.value = "";
    form.lastname.value = "";
    form.isbn.value = "";
    form.isbnRepet.value = "";
    try { form.cne.value = ""; } 
    catch { form.username.value = ""; }
})

form.role.value = "student"