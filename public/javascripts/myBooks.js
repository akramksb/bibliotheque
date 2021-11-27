const body = document.querySelector("body")
// const booksTableBody = document.querySelector(".bookList table tbody")
const booksList = document.querySelector(".bookList ul");

const imagesPath = "Upload/BookCovers/";

async function showAllBooks()
{
    const rawResponse = await fetch('/myBooks/all');
    const books = await rawResponse.json();

    books.forEach(book => {
        let containerA = document.createElement("a")
        containerA.classList.add("flex-container")

        let img = document.createElement("img")
        img.title = book.title;
        img.alt = book.title
        if (book.image)
            img.src = imagesPath + book.image;
        
        let rightDiv = document.createElement("div")
        rightDiv.classList.add("image-parent")
        rightDiv.appendChild(img)
        

        let leftDiv = document.createElement("div")    
        leftDiv.classList.add("flex-column")
        leftDiv.textContent = book.title

        let span = document.createElement("span")
        span.classList.add("badge")
        span.textContent = `${book.qteStock} Copies en Stock`
        if(book.qteStock == 0)
            span.classList.add("danger")
        leftDiv.appendChild(span)

        containerA.append(leftDiv);
        containerA.append(rightDiv);

        booksList.appendChild(containerA);
    });
}

showAllBooks()