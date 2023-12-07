//define leaftlet map
var map = L.map('map').setView([48.839623875988806, 2.588503717609941], 17);

//define basemap
var CartoDB_VoyagerNoLabels = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	minZoom: 16,
	maxZoom: 18,
}).addTo(map);

//limit map bounds
var bounds = L.latLngBounds(
  L.latLng(48.836, 2.572),
  L.latLng(48.844, 2.595)
);

map.setMaxBounds(bounds);

// let cluster = L.markerClusterGroup();
// cluster.addTo(map);

// function clearMarkers() {
//   cluster.clearLayers();
// }