
const imgDiv = document.querySelector('#img');
const fullName = document.querySelector('#main-container-full-name');
const birthYear = document.querySelector('#main-container-birth-year');
const gender = document.querySelector('#main-container-gender');

const loader = document.querySelector('#loader');
const allCharactersMeter = document.querySelector('#allCharactersMeter');
const aboutDetailsCont = document.querySelector('#aboutDetailsCont');

let randomNumber = Math.floor(Math.random() * 82); // Random number between 0 - 81 for pages;

const firstTenCharactersUrl = `https://swapi.dev/api/people/`; // URL to fetch all SWAPI characters
let allCharactersList = [];
let localImageCharactersList = [];
let loadingAllCharacters = true;
const lightSidePallette = ['#3780d3', '#5bdd59']
const darkSidePallette = [ '#d62f00', '#950216']

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
async function loadDoc() {
  await getAllCharacters();
  await addAllCharacterImages();
  window.setTimeout(setData, 2000);
  
}
addAllCharacterImages = () => {
  allCharactersList.forEach((elm, i) => {
    localImageCharactersList.forEach((element, index) => {
      if (elm.name === element.name){
        elm.image = element.img;
      }
    })
  })
}
setData = () => {
  let character = allCharactersList[randomNumber];
  console.log(character)

  fullName.innerText = `Name: ${character.name}`;
  birthYear.innerText = `Birth Year: ${character.birth_year}`;
  gender.innerText = `Gender: ${character.gender}`;
  
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
  loadingAllCharacters = false;

    let tl = gsap.timeline();
    tl.to("#allCharactersMeter", { opacity:0 });
    tl.to("#loader", {  scale: 1.3 });
    tl.to("#loader", { scale: 0, opacity:0 });
    tl.to("#aboutDetailsCont", {opacity:1});
}
document.onload = loadDoc();