const body = document.querySelector("body")
const booksTable = document.querySelector(".bookList table")

const imagesPath = "Upload/BookCovers/";

async function showAllBooks()
{
    const rawResponse = await fetch('/books');
    const books = await rawResponse.json();

    books.forEach(book => {
        let tr = document.createElement("tr")
        let td = document.createElement("td")
        let img = document.createElement("img")
        img.title = book.title;
        if (book.image)
            img.src = imagesPath + book.image;
        td.appendChild(img)
        tr.appendChild(td)

        td = document.createElement("td")
        td.textContent = book.title
        tr.appendChild(td)

        td = document.createElement("td")
        td.textContent = book.qte
        tr.appendChild(td)

        booksTable.appendChild(tr);
    });
}

showAllBooks()