var slider = document.getElementById("slider");

function fillSlider(){
    //fill the slider with the data from the place clicked
    var sliderTitle = document.getElementById('slider-name');
    var sliderDescription = document.getElementById('slider-description');
    var sliderImage = document.getElementById('slider-img');

    //get the place clicked
    var place = places.find(place => place.c[1].v == event.target.id);
    console.log(place);
    //fill the slider
    sliderTitle.innerText = place.c[1].v;
    sliderDescription.innerHTML = place.c[2].v;
    sliderImage.src = place.c[6].v;
    slider.style.visibility = "visible";
}

document.addEventListener('click', function(e) {
    console.log( e.target.id );
    if (e.target.id == 'slider-close') {
        //baisser le slider
        slider.style.visibility = "hidden";
    }
    else fillSlider();
}, false);



  