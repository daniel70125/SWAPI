const SWAPIUrl = 'https://swapi.dev/api/people';
var p = document.getElementById('para1');
const imgCont = document.getElementById('character-image');
const ul = document.getElementsByTagName('li');
let images = 
[
    'https://wallpapercave.com/wp/wp3984493.jpg', // Luke skywalker
    'https://theartmad.com/wp-content/uploads/2015/06/C-3PO-Wallpaper-36.jpg', // c-3po
    'https://www.model-space.com/media/catalog/product/cache/2/thumbnail/1280x/9df78eab33525d08d6e5fb8d27136e95/r/2/r2d2.jpg', // R2-D2
    'https://www.mural-wallpaper.com/wp-content/uploads/2019/07/UN-DIS74-1.jpg', // Darth Vader
    'https://cdn.hipwallpaper.com/i/84/29/jCAnu5.jpg', // leia organa
    'https://vignette.wikia.nocookie.net/starwars/images/e/eb/OwenCardTrader.png/revision/latest?cb=20171108050140', // owen lars
    'https://theartmad.com/wp-content/uploads/2015/06/Beru-Lars-2.jpg', // beru whitesun lars
    'https://www.renderhub.com/ardera/r5-d4-astromech-droid/r5-d4-astromech-droid-01.jpg', // r5-d4
    'https://i.pinimg.com/originals/33/81/e5/3381e50f4b54339203c97b28c08ccbb8.jpg', // Biggs Darklighter
    'https://wallpapercave.com/wp/wp4581073.jpg' // Obi-Wan Kenobi

]

function loadDoc() {
    let randomNum = Math.ceil(Math.random() * 9);
    var ourRequest = new XMLHttpRequest();
    ourRequest.open("GET", 'https://swapi.dev/api/people/', true);
    ourRequest.onload = function(){
        var data = JSON.parse(this.responseText);

        console.log(data);
        if (data.results[randomNum].name.toLowerCase() === 'luke skywalker'){
            imgCont.src = images[randomNum]
        } else if (data.results[randomNum].name.toLowerCase() === 'c-3po'){
            imgCont.src = images[randomNum]
        } else if (data.results[randomNum].name.toLowerCase() === 'r2-d2'){
            imgCont.src = images[randomNum]
        } else if (data.results[randomNum].name.toLowerCase() === 'darth vader'){
            imgCont.src = images[randomNum]
        } else if (data.results[randomNum].name.toLowerCase() === 'leia organa'){
            imgCont.src = images[randomNum]
        } else if (data.results[randomNum].name.toLowerCase() === 'owen lars'){
            imgCont.src = images[randomNum]
        } else if (data.results[randomNum].name.toLowerCase() === 'beru whitesun lars'){
            imgCont.src = images[randomNum]
        } else if (data.results[randomNum].name.toLowerCase() === 'r5-d4'){
            imgCont.src = images[randomNum]
        } else if (data.results[randomNum].name.toLowerCase() === 'biggs darklighter'){
            imgCont.src = images[randomNum]
        } else if (data.results[randomNum].name.toLowerCase() === 'obi-wan kenobi'){
            imgCont.src = images[randomNum]
        }
        document.getElementById('character-name').innerText = `${data.results[randomNum].name}`;
        document.getElementById('birth-year').innerText = `${data.results[randomNum].birth_year}`;
        document.getElementById('gender').innerText = `${data.results[randomNum].gender.toUpperCase()}`;
        document.getElementById('hair-color').innerText = `${data.results[randomNum].hair_color.toUpperCase()}`;
        document.getElementById('height').innerText = `${data.results[randomNum].height}`;
        document.getElementById('mass').innerText = `${data.results[randomNum].mass}`;
    }
    ourRequest.send();
}

document.onload = loadDoc();
