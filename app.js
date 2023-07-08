//API wikipedia : https://en.wikipedia.org/w/api.php?action=query&origin=*&format=json&generator=search&gsrnamespace=0&gsrlimit=5&gsrsearch='New_England_Patriots'

const form = document.querySelector("form");

const input = document.querySelector("input");

const errorMsg = document.querySelector(".error-msg");
const resultsDisplay = document.querySelector(".results-display");
const loader = document.querySelector(".loader");

form.addEventListener("submit", handleSubmit);

function handleSubmit(e) {
  e.preventDefault();

  if (!input.value === "") {
    errorMsg.textContent = "Wops, veuillez remplir l'input";
    return;
  } else {
    errorMsg.textContent = "";
    loader.style.display = "flex";
    resultsDisplay.textContent = "";
    wikiAPICall(input.value);
  }
}
async function wikiAPICall(searchInput) {
  try {
    const reponse = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
    );
    if (!reponse.ok) {
      throw new Error(`${reponse.status}`);
    }
    const data = await reponse.json();
    createCards(data.query.search);
  } catch (error) {
    errorMsg.textContent = `${error}`;
    loader.style.display = "none";
  }
}

function createCards(data) {
  if (!data.length) {
    errorMsg.textContent = "Wopsy, aucun résultat";
    loader.style.display = "none";
    return;
  }
  data.forEach((element) => {
    const url = `https://en.wikipedia.org/?curid=${element.pageid}`;
    const card = document.createElement("div");
    card.className = "result-item";
    card.innerHTML = `<h3 class="result-title">
        <a href=${url} target="_blank>${element.title}</a>
        </h3>
        <a href=${url} class="result-link" target="_blank">${url}</a>
        <span class="result-snippet">${element.snippet}</span>
        <br>`;
    resultsDisplay.appendChild(card);
  });
  loader.style.display = "none";
}
