const bookListSection = document.querySelector("#book-list");
const newBookForm = document.querySelector("#new-book-form");
const formDialog = document.querySelector("#new-book-dialog");
const newBookBtn = document.querySelector("#new-book-btn");

const libraryBooks = [];

function Book(author, title, pages, readStatus, id) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.readStatus = readStatus;
    this.id = id;
}

function addBookToLibrary (author, title, pages, readStatus, id) {
    let book = new Book(author, title, pages, readStatus, id);
    libraryBooks.push(book);
}

function displayBooks () {
    bookListSection.textContent = "";
    for (const book of libraryBooks) {
        let bookCard = document.createElement("div");
        bookCard.classList.add("book-card");

        bookCard.appendChild(createBookCardLines("Author: ", book.author));
        bookCard.appendChild(createBookCardLines("Title: ", book.title));
        bookCard.appendChild(createBookCardLines("Number of Pages: ", book.pages));
        bookCard.appendChild(createBookCardLines("Read Status: ", book.readStatus));
        bookCard.appendChild(createBookCardLines("ID: ", book.id));

        bookListSection.appendChild(bookCard);
    }
}

function createBookCardLines (cardLabel, bookInfo) {
    let line = document.createElement("p");
    let label = document.createElement("span");
    let info = document.createElement("span");

    label.classList.add("card-label");
    label.textContent = cardLabel;
    info.textContent = bookInfo;

    line.appendChild(label);
    line.appendChild(info);

    return line;
}

newBookBtn.addEventListener("click", () => {
    formDialog.showModal();
});

newBookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const target = event.target.elements;
    let newBookAuthor = target.author.value;
    let newBookTitle = target.title.value;
    let newBookPages = target.pages.value;
    let newBookStatus = target.status.value;
    addBookToLibrary(newBookAuthor, newBookTitle, newBookPages, newBookStatus, crypto.randomUUID());
    displayBooks();
    formDialog.close();
});

addBookToLibrary("a", "b", "c", "d", crypto.randomUUID());
addBookToLibrary("f", "g", "h", "i", crypto.randomUUID());
displayBooks();