console.log("Javascript!");

const bookList = [];

const addBtn = document.querySelector("#addButton");
const titleIn = document.querySelector("#title-input");
const authorIn = document.querySelector("#author-input");

const bookDisplay = document.querySelector("#book-display");

console.log(bookDisplay);



const displayBooks = () => {
  bookDisplay.innerHTML = "";
  bookList.forEach( book => {
    const title = document.createElement("p");
    const author = document.createElement("p");

    title.textContent = book.title;
    author.textContent = book.author;
    const bookElement = document.createElement("div");
    bookElement.className = "book-element";

    const deleteButton = document.createElement("button");
    bookElement.append(title, author)

    bookDisplay.append(bookElement);
  })
  console.log(bookList);
}

const bookInput =  () => {

  bookList.push({title: titleIn.value, author: authorIn.value});

  titleIn.textContent = "";
  authorIn.textContent = "";
  displayBooks()
}

addBtn.addEventListener("click", bookInput)
