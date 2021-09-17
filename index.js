console.log("Javascript!");

const addBtn = document.querySelector("#addButton");
const titleIn = document.querySelector("#title-input");
const authorIn = document.querySelector("#author-input");

const bookDisplay = document.querySelector("#book-display");

console.log(bookDisplay);

const bookInput =  () => {
  const title = document.createElement("p");
  const author = document.createElement("p");

  title.textContent = titleIn.value;
  author.textContent = authorIn.value;

  console.log(titleIn.value)

  titleIn.textContent = "";
  authorIn.textContent = "";
  const bookElement = document.createElement("div");
  bookElement.className = "book-element";
  bookElement.append(title, author)

  bookDisplay.append(bookElement);

}

addBtn.addEventListener("click", bookInput)
