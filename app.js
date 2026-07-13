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

addBookToLibrary("a", "b", "c", "d", "e");
addBookToLibrary("f", "g", "h", "i", "j");
console.log(libraryBooks);