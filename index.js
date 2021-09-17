console.log("Javascript!");

let bookList = [];

const addBtn = document.querySelector("#addButton");
const titleIn = document.querySelector("#title-input");
const authorIn = document.querySelector("#author-input");

const bookDisplay = document.querySelector("#book-display");

console.log(bookDisplay);

const deleteBook = (e) => {
  const bookElement = e.target.parentElement;
  const title = bookElement.querySelector(".book-title").textContent
  const author = bookElement.querySelector(".book-author").textContent
  bookList = bookList.filter((book) => {
    return !(book.title === title && book.author === author)
  })

  displayBooks()
  console.log(e.target.parentElement)
}


const displayBooks = () => {
  bookDisplay.innerHTML = "";
  bookList.forEach(book => {
    const title = document.createElement("p");
    const author = document.createElement("p");


    title.className = "book-title";
    title.textContent = book.title;
    author.className = "book-author";
    author.textContent = book.author;
    const bookElement = document.createElement("div");
    bookElement.className = "book-element";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Remove Book"
    deleteButton.addEventListener("click", e => deleteBook(e))
    bookElement.append(title, author, deleteButton);

    bookDisplay.append(bookElement);
  })
  console.log(bookList);
}

const bookInput = () => {

  bookList.push({
    title: titleIn.value,
    author: authorIn.value
  });

  titleIn.textContent = "";
  authorIn.textContent = "";
  displayBooks()
}

addBtn.addEventListener("click", bookInput)
