console.log("Javascript!");

const addBtn = document.querySelector("#addButton");
const titleIn = document.querySelector("#title-input");
const authorIn = document.querySelector("#author-input");

const bookDisplay = document.querySelector("#book-display");


console.log(addBtn)


addBtn.addEventListener("click", (e) => console.log(e))


const bookInput =  (e) => {
  const title = document.createElement("p");
  const author = document.createElement("p");

  title.textContent = titleIn.textContent;
  author.textContent = authorIn.textContent;

  titleIn.textContent = "";
  authorIn.textContent = "";


}
