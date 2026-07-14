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

Book.prototype.changeStatus = function () {
    switch (this.readStatus) {
        case "Read":
            this.readStatus = "Reading";
            break;

        case "Reading":
            this.readStatus = "Pending";
            break;

        case "Pending":
            this.readStatus = "Abandoned";
            break;

        case "Abandoned":
            this.readStatus = "Read";
            break;
    
        default:
            this.readStatus = "Read";
            break;
    }
};

function addBookToLibrary (author, title, pages, readStatus, id) {
    let book = new Book(author, title, pages, readStatus, id);
    libraryBooks.push(book);
}

function displayBooks () {
    bookListSection.textContent = "";
    for (const book of libraryBooks) {
        let bookCard = document.createElement("div");
        let cardBtns = document.createElement("div");
        let statusBtn = document.createElement("button");
        let deleteBtn = document.createElement("button");
        
        bookCard.classList.add("book-card");
        cardBtns.classList.add("card-btns");
        statusBtn.classList.add("status-btn");
        deleteBtn.classList.add("delete-btn");
        statusBtn.setAttribute("data-id", book.id);
        deleteBtn.setAttribute("data-id", book.id);
        statusBtn.textContent = "Change Read Status";
        deleteBtn.textContent = "Delete";

        cardBtns.appendChild(statusBtn);
        cardBtns.appendChild(deleteBtn);

        bookCard.appendChild(createBookCardLines("Author: ", book.author));
        bookCard.appendChild(createBookCardLines("Title: ", book.title));
        bookCard.appendChild(createBookCardLines("Number of Pages: ", book.pages));
        bookCard.appendChild(createBookCardLines("Read Status: ", book.readStatus));
        bookCard.appendChild(createBookCardLines("ID: ", book.id));
        bookCard.appendChild(cardBtns);

        bookListSection.appendChild(bookCard);
    }
}

function createBookCardLines (cardLabel, bookInfo) {
    let line = document.createElement("p");
    let label = document.createElement("span");
    let info = document.createElement("span");

    label.classList.add("card-label");
    if (cardLabel === "Read Status: ") {
        info.setAttribute("data-status", bookInfo);
    }
    label.textContent = cardLabel;
    info.textContent = bookInfo;

    line.appendChild(label);
    line.appendChild(info);

    return line;
}

function changeBook (bookID, action) {
    let bookIndex = libraryBooks.findIndex(book => bookID === book.id);
    if (bookIndex !== -1) {
        switch (action) {
            case "delete":
                libraryBooks.splice(bookIndex, 1);
                break;

            case "status":
                libraryBooks[bookIndex].changeStatus();
                break;
        
            default:
                console.log("Action not defined");
                break;
        }
    };
};

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

bookListSection.addEventListener("click", (event) => {
    if (event.target.matches(".delete-btn")) {
        changeBook(event.target.getAttribute("data-id"), "delete");
        displayBooks();
    } else if (event.target.matches(".status-btn")) {
        changeBook(event.target.getAttribute("data-id"), "status");
        displayBooks();
    }
});

addBookToLibrary("J.K. Rowling", "Harry Potter Philosopher's Stone", "352", "Read", crypto.randomUUID());
addBookToLibrary("Rick Riordan", "Percy Jackson and the Olympians: The Lightning Thief", "377", "Pending", crypto.randomUUID());
displayBooks();