import { parcours_liste } from "./parcours.js";
import { places } from "./place.js";
import { isEmpty_localStorage, save } from "./data/data.js"
import { getUserLocation } from "./location.js"

let slider = document.getElementById("slider");
let data_parcours = await parcours_liste();
let sliderGo = document.getElementById('slider-go-div');

//remplir le slider avec les données du lieu cliqué
function fillSlider() {
    slider = document.getElementById("slider");
    let sliderTitle = document.getElementById('slider-name');
    let sliderDescription = document.getElementById('slider-description');
    let sliderParcours = document.getElementById('slider-parcours');
    let sliderImage = document.getElementById('slider-img');
    places.then((place) => {
        let p = place.find(place => place.c[0].v == event.target.id);
        //si l'utilisateur est dans la zone de jeu, on affiche le bouton y aller
        let parcours = data_parcours.filter(place => place.c[4].v == event.target.id);
        let first_parcours_html = ""
        isInMap(p);
        parcours.forEach((_parcours) => {
            let css = isEmpty_localStorage("fin_parcours_" + _parcours.c[0].v) == true ? "parcours-done" : "parcours";
            first_parcours_html += `<button class = '` + css + `' @click="((count = 0, state = 1, id_parcours = ` + _parcours.c[0].v + `) , App().page(` + _parcours.c[0].v + `, count, state))" id='` + _parcours.c[0].v + `'class='parcours'>` + _parcours.c[1].v + `</button>`;
        });

        sliderParcours.innerHTML = first_parcours_html
        sliderTitle.innerText = p.c[1].v;
        sliderDescription.innerHTML = p.c[2].v;
        sliderImage.src = p.c[6].v;
        slider.style.visibility = "visible";

        let show = document.getElementsByClassName('card-item')
        console.log(show)
        for (let item of show) {
            item.style.display = 'none';
        }

        document.getElementById("slider-description").style.display = 'block';
    });
}

//eventListener pour afficher le slider
document.addEventListener('click', function (e) {
    slider = document.getElementById("slider");
    if (e.target.id == 'slider-close' || e.target.id == 'map') {
        slider.style.visibility = "hidden";
    }
    else if (e.target.className == 'show') {
        console.log(e.target.id)
        let show = document.getElementsByClassName('card-item')
        console.log(show)
        for (let item of show) {
            item.style.display = 'none';
        }
        document.getElementsByClassName(e.target.id)[0].style.display = 'block';
    }

    else if (e.target.className == 'parcours' || e.target.className == 'parcours-done') {
        save("actual_quiz", e.target.id)
        save(e.target.id, 0)


    }
    else if (e.target.className == 'marker-image') {
        //|| e.target.id != 'map'
        fillSlider();
    }
}, false);

function isInMap(p) {
    getUserLocation((userLocation) => {
        if ((userLocation < 48.836 || userLocation > 48.844 || userLocation < 2.572 || userLocation > 2.595)) {
            sliderGo.style.display = "block";
            sliderGo.innerHTML = `<button id='slider-go' @click="App().navigation('` + p.c[0].v + `')">Y aller</button>`;
        }
        else {
            sliderGo.style.display = "none";
        }
    });
}



