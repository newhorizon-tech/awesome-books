/* eslint-disable max-classes-per-file */
/* eslint-disable no-undef */

document.addEventListener('DOMContentLoaded', async () => {
  const currentTime = luxon.DateTime.local().toLocaleString(luxon.DateTime.DATETIME_MED);

  document.querySelector('#date-display').innerHTML = `${currentTime}`;
});

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

    return condition === undefined;
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

const addBtn = document.querySelector('#addButton');
const titleIn = document.querySelector('#title-input');
const authorIn = document.querySelector('#author-input');

const bookDisplay = document.querySelector('#book-display');

const displayBooks = () => {
  bookDisplay.innerHTML = '';
  myBooks.bookList.forEach((book) => {
    const title = document.createElement('span');
    const author = document.createElement('span');
    const filler = document.createElement('span');
    filler.textContent = ' by ';

    title.className = 'book-title';
    title.textContent = book.title;
    author.className = 'book-author';
    author.textContent = book.author;
    const bookElement = document.createElement('div');
    bookElement.className = 'book-element';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Remove Book';
    deleteButton.addEventListener('click', (e) => deleteBook(e)); // eslint-disable-line
    const textInfo = document.createElement('div');
    textInfo.append(title, filler, author);
    bookElement.append(textInfo, deleteButton);

    bookDisplay.append(bookElement);
  });
  myBooks.saveData();
};

document.addEventListener('DOMContentLoaded', () => {
  displayBooks();
});

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

// Navigation

const list = document.querySelector('#list');
const listContent = bookDisplay;

const addNew = document.querySelector('#add-new');
const addContent = document.querySelector('#book-input');

const contact = document.querySelector('#contact');
const contactContent = document.querySelector('#contact-display');

const displayHome = () => {
  document.querySelector('h1').textContent = 'All Awesome Books';
  listContent.className = 'display-on';
  addContent.className = 'display-off';
  contactContent.className = 'display-off';
};

list.addEventListener('click', displayHome);

addNew.addEventListener('click', () => {
  document.querySelector('h1').textContent = 'Add New Book';
  listContent.className = 'display-off';
  addContent.className = 'display-on';
  contactContent.className = 'display-off';
});

contact.addEventListener('click', () => {
  document.querySelector('h1').textContent = 'Contact us!';
  listContent.className = 'display-off';
  addContent.className = 'display-off';
  contactContent.className = 'display-on';
});

// Add Book Event Listener

addBtn.addEventListener('click', () => {
  displayHome();
  bookInput();
});
