const body = document.querySelector("body")

const booksList = document.querySelector(".card-container > div")


const imagesPath = "Upload/BookCovers/";

async function showAllBooks()
{
    const rawResponse = await fetch('/myBooks/all');
    const books = await rawResponse.json();

    books.forEach(book => {
        let col = document.createElement("div");
        col.classList.add("col")

        booksList.appendChild(col);

        booksList.appendChild(col)
        console.log(col)

        let card = document.createElement("div");
        card.classList.add("card", "h-100")

        col.appendChild(card)
        

        let imageContainer = document.createElement("div");
        imageContainer.classList.add("img-container")



        let image = document.createElement("img");
        image.classList.add("card-img-top")
        imageContainer.appendChild(image)

        image.title = book.title;
        image.alt = book.title;
        if (book.image)
            image.src = imagesPath + book.image;

        card.appendChild(imageContainer)


        let cardBody = document.createElement("div");
        cardBody.classList.add("card-body")

        card.appendChild(cardBody)

        let bookTitle = document.createElement("h5");
        bookTitle.textContent = book.title;
        bookTitle.classList.add("card-title")

        // let bookStock = document.createElement("p")
        // bookStock.textContent = `Stock : ${book.qteStock} / ${book.total}`
        // console.log(typeof book.qteStock)
        // console.log(typeof 0)
        // if (book.qteStock === 0)
        //     bookStock.classList.add("outOfStock")
        
        cardBody.appendChild(bookTitle)
        // cardBody.appendChild(bookStock)

    });
}

showAllBooks()