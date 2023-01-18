
const imgDiv = document.querySelector('#img');
const movieContainer = document.querySelector('#movie-container');

// These variables grab the characters detail html elements 
const fullName = document.querySelector('#main-container-full-name');
const birthYear = document.querySelector('#main-container-birth-year');
const gender = document.querySelector('#main-container-gender');
const eyeColor = document.querySelector('#main-container-eye-color');
const height = document.querySelector('#main-container-height');

const loader = document.querySelector('#loader'); // Spinner loader before data is set 
const allCharactersMeter = document.querySelector('#allCharactersMeter'); // The meter for character progress
const aboutDetailsCont = document.querySelector('#aboutDetailsCont');
const imgContainer = document.querySelector('#img-container');

const firstTenCharactersUrl = `https://swapi.dev/api/people/`; // URL to fetch all SWAPI characters
let allCharactersList = [];
let localImageCharactersList = [];

// Change background colors depending on status of light side vs dark
const lightSidePallette = ['#3780d3', '#5bdd59'];
const darkSidePallette = [ '#d62f00', '#950216'];

async function fetchLocalJson() {
  await fetch('./JSON/characters.json')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((elm, index) => {
      localImageCharactersList.push(elm)
    })
  })
  .catch((err) => console.log(err))
}
fetchLocalJson();
// Add all characaters to array function
addCharactersToArray = (arr) => {
  arr.forEach((elm, index) => {
    allCharactersList.push(elm)
  })
}
checkMeter = (value) => {
  allCharactersMeter.setAttribute("value", value);
}
// Function below merges local json with API data to create object with local images for each character
addAllCharacterImages = () => {
  allCharactersList.forEach((elm, i) => {
    localImageCharactersList.forEach((element, index) => {
      if (elm.name === element.name){
        elm.image = element.img;
      }
    })
  })
}
// This function below picks a character and sisplays their data
setData = () => {
  while (movieContainer.hasChildNodes()) {
    movieContainer.removeChild(movieContainer.firstChild);
  }
  let randomNumber = Math.floor(Math.random() * 82); // Random number between 0 - 81 for pages;
  let character = allCharactersList[randomNumber];
  console.log(character.films);

  fullName.innerText = `Name: ${character.name}`;
  birthYear.innerText = `Birth Year: ${character.birth_year}`;
  gender.innerText = `Gender: ${character.gender}`;
  eyeColor.innerText = `Eye Color: ${character.eye_color}`;
  height.innerText = `Height: ${character.height}cm`;
  imgDiv.src = character.image;

  character.films.forEach((elm, index) => {
    const img = document.createElement("img");
    let movieImg = document.createElement("img");
    // Main switch statement that adds movie img to character
    switch (elm) {
      case "https://swapi.dev/api/films/1/":
        movieImg.src = './images/films/a-new-hope.jfif';
        movieContainer.appendChild(movieImg);
        break;
      case "https://swapi.dev/api/films/2/":
        movieImg.src = './images/films/the-empire-strikes-back.jfif';
        movieContainer.appendChild(movieImg);
        break;
      case "https://swapi.dev/api/films/3/":
        movieImg.src = './images/films/return-of-the-jedi.jfif';
        movieContainer.appendChild(movieImg);
        break;
      case "https://swapi.dev/api/films/4/":
        movieImg.src = './images/films/the-phantom-menace.jfif';
        movieContainer.appendChild(movieImg);
        break;
      case "https://swapi.dev/api/films/5/":
        movieImg.src = './images/films/attack-of-the-clones.jfif';
        movieContainer.appendChild(movieImg);
        break;
      case "https://swapi.dev/api/films/6/":
        movieImg.src = './images/films/revenge-of-the-sith.jfif';
        movieContainer.appendChild(movieImg);
        break;
    
      default:
        break;
    }

  })
  
}

// Loop over all pages and add to array; - MAIN FUNCTION
async function getAllCharacters() {
  let pageNum = 1;
  for (let i = 1; i < 10; i++) {
    checkMeter(`${i}0`);
    if (pageNum === 1){
      await fetch(`${firstTenCharactersUrl}`)
        .then((response) => response.json())
        .then((data) => {
          addCharactersToArray(data.results)
      });
      pageNum = pageNum + 1;
    } else {
      await fetch(`${firstTenCharactersUrl}?page=${pageNum}`)
        .then((response) => response.json())
        .then((data) => {
          addCharactersToArray(data.results)
      });
      pageNum = pageNum + 1;
    }
    allCharactersMeter.setAttribute("value", '100');
  }

    let tl = gsap.timeline();
    tl.to("#allCharactersMeter", { opacity:0 });
    tl.to("#loader", {  scale: 1.3 });
    tl.to("#loader", { scale: 0, opacity:0 });
    tl.to("#img", {opacity:1});
    tl.to("#aboutDetailsCont", {opacity:1});
}

async function loadDoc() {
  await getAllCharacters();
  await addAllCharacterImages();
  window.setTimeout(setData, 2000);
}

// window.loadDoc();
document.onload = loadDoc();