
let pages = [] //Pages to search through results
let pageCounter = 20; 
// For loop to keep track of search results (20 each page);
for (let i = 0; i < 57; i++) {
    pages[i] = pageCounter;
    pageCounter = pageCounter + 20;
}

let randomNumberPage = Math.floor(Math.random() * 57); // Random number between 0 - 56 for pages;
let randomPokemon = Math.floor(Math.random() * 21);
let pokemonObj = {};

const POKEUrl = `https://pokeapi.co/api/v2/pokemon/?offset=${pages[randomNumberPage]}&limit=20`; // URL to fetch pokemon data - 20 poke search result
let randomPage = `https://pokeapi.co/api/v2/pokemon/`

function loadDoc() {
    fetch(POKEUrl)
      .then((response) => response.json())
      .then((data) => {
      let pokemon = data.results[randomPokemon].name;
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          pokemonObj = {
            "name": data.name
         }
        })
  });
}

window.setTimeout(() => {
  document.querySelector('#main-container-full-name').innerText = `${pokemonObj.name}`
}, 2000);

// Counting by 20's the count is 57.7; => count:1154

// document.onload = alert("Data might be inaccurate and lacking in various aspects due to the fact that it is not taken directly from Nintendo's Pokemon ROMs.");
document.onload = loadDoc();

/* Pokemon Name = data.results.forms.name
   Pokemon Height =  data.results.height
   Pokemon Weight =  data.results.weight
   Pokemon Moves [array] = data.results.moves
   Pokemon Icons [array] = data.results.sprites
   Pokemon Types [array] = data.results.types
*/