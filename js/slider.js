var slider = document.getElementById("slider");

function fillSlider(){
    //fill the slider with the data from the place clicked
    var sliderTitle = document.getElementById('slider-name');
    var sliderDescription = document.getElementById('slider-description');
    var sliderImage = document.getElementById('slider-img');

    //get the place clicked
    var place = places.find(place => place.c[0].v == event.target.id);
    console.log(place);
    //fill the slider
    //put the center of the map on the place
    map.setView([parseFloat(place.c[5].v)-0.001, place.c[4].v], 18);
    sliderTitle.innerText = place.c[1].v;
    sliderDescription.innerHTML = place.c[2].v;
    sliderImage.src = place.c[6].v;
    slider.style.visibility = "visible";
}

document.addEventListener('click', function(e) {
    console.log( e.target );
    if (e.target.id == 'slider-close' || e.target.id == 'map' ) {
        //baisser le slider
        slider.style.visibility = "hidden";
    }
    else if (e.target.className == 'marker-image' || e.target.id != 'map') {
        //remplir le slider
        fillSlider();
    }
}, false);




  