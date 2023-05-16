import { createCharacterCard, cardContainer } from "./components/card/card.js";

const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

// create fetch character

async function fetchCharacters() {
  try {
    cardContainer.innerHTML = "";
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
    );
    if (response.ok) {
      const characterInfo = await response.json();
      // Save MaxPage count info from the Api
      maxPage = characterInfo.info.pages;
      const characterInfoArray = characterInfo.results;
      characterInfoArray.forEach((character) => {
        const characterCard = createCharacterCard(character);
        return characterCard;
      });
    } else {
      console.error("Bad Response");
    }
  } catch (error) {
    console.error("An error occured!");
  }
}

fetchCharacters();

// Buttons Event Listener

prevButton.addEventListener("click", () => {
  if (page > 1) {
    page--;
  }
  fetchCharacters();
  pagination.textContent = `${page} / ${maxPage}`;
});

nextButton.addEventListener("click", () => {
  if (page < maxPage) {
    page++;
  }
  fetchCharacters();
  pagination.textContent = `${page} / ${maxPage}`;
});

//Implement Search Bar
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);
  searchQuery = data.query;

  fetchCharacters();
});
