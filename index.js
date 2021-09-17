class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class BookCollection {
  constructor() {
    const data = localStorage.getItem('bookList');
    if (data != null) {
      this.bookList = JSON.parse(data);
    } else {
      this.bookList = [];
    }
  }

  saveData() {
    localStorage.setItem('bookList', JSON.stringify(this.bookList));
  }

  avoidDuplicate(book) {
    const condition = this.bookList.find((currentBook) => {
      const titleMatch = currentBook.title === book.title;
      const authorMatch = currentBook.author === book.author;
      return (titleMatch && authorMatch);
    });

    return condition == undefined;
  }

  addBook(book) {
    if (this.avoidDuplicate(book)) {
      this.bookList.push(book);
    }
  }

  removeBook(book) {
    this.bookList = this.bookList.filter((currentBook) => {
      const titleMatch = currentBook.title === book.title;
      const authorMatch = currentBook.author === book.author;
      return !(titleMatch && authorMatch);
    });
  }
}

// Instance of the class BookCollection
const myBooks = new BookCollection();

document.addEventListener('DOMContentLoaded', () => {
  displayBooks();
});

const addBtn = document.querySelector('#addButton');
const titleIn = document.querySelector('#title-input');
const authorIn = document.querySelector('#author-input');

const bookDisplay = document.querySelector('#book-display');

const displayBooks = () => {
  bookDisplay.innerHTML = '';
  myBooks.bookList.forEach((book) => {
    const title = document.createElement('p');
    const author = document.createElement('p');

    title.className = 'book-title';
    title.textContent = book.title;
    author.className = 'book-author';
    author.textContent = book.author;
    const bookElement = document.createElement('div');
    bookElement.className = 'book-element';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove Book';
      deleteButton.addEventListener('click', (e) => deleteBook(e)); // eslint-disable-line
    bookElement.append(title, author, deleteButton);

    bookDisplay.append(bookElement);
  });
  myBooks.saveData();
};

const deleteBook = (e) => {
  const bookElement = e.target.parentElement;
  const currentBook = new Book(bookElement.querySelector('.book-title').textContent,
    bookElement.querySelector('.book-author').textContent);
  myBooks.removeBook(currentBook);
  displayBooks();
};

const bookInput = () => {
  const currentBook = new Book(titleIn.value, authorIn.value);
  myBooks.addBook(currentBook);

  titleIn.textContent = '';
  authorIn.textContent = '';
  displayBooks();
};

addBtn.addEventListener('click', bookInput);
