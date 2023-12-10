var slider = document.getElementById("slider");

//remplir le slider avec les données du lieu cliqué
function fillSlider() {
    var sliderTitle = document.getElementById('slider-name');
    var sliderDescription = document.getElementById('slider-description');
    var sliderParcours = document.getElementById('slider-parcours');
    var sliderImage = document.getElementById('slider-img');
    var place = places.find(place => place.c[0].v == event.target.id);
    console.log(place);
    map.setView([parseFloat(place.c[5].v) - 0.001, place.c[4].v], 18);
    sliderTitle.innerText = place.c[1].v;
    sliderDescription.innerHTML = place.c[2].v;
    sliderImage.src = place.c[6].v;
    slider.style.visibility = "visible";
}

//eventListener pour afficher le slider
document.addEventListener('click', function (e) {
    console.log(e.target);
    if (e.target.id == 'slider-close' || e.target.id == 'map') {
        slider.style.visibility = "hidden";
    }
    else if (e.target.className == 'marker-image' || e.target.id != 'map') {
        fillSlider();
    }
}, false);




