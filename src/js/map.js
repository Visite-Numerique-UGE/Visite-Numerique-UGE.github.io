var map = L.map('map', { zoomControl: false }).setView([48.839623875988806, 2.588503717609941], 17);

var CartoDB_VoyagerNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    minZoom: 16,
    maxZoom: 18,
}).addTo(map);


//limite de la map
var bounds = L.latLngBounds(
    L.latLng(48.836, 2.572),
    L.latLng(48.844, 2.595)
);
map.setMaxBounds(bounds);

// event qui désactive le le mouvement de la map si on est au niveau 16
map.on('zoomend', function () {
    if (map.getZoom() == 16) {
        map.dragging.disable();
    } else {
        map.dragging.enable();
    }
});

// event qui désactive le le mouvement de la map si on arrive aux limites de la map
map.on('drag', function () {
    var currentBounds = map.getBounds();
    if (!bounds.contains(currentBounds)) {
        map.panInsideBounds(bounds, { animate: false });
    }
});