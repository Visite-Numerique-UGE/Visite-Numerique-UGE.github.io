import { i18n } from "./data/i18n";
import L from 'leaflet';
import { parcours_liste } from "./parcours.js";
import { places } from "./place.js";

export default () => {
  return {
    conf: {
      locale: document.querySelector('html').getAttribute('lang')
    },
    data: {
      map: '',
      i18n: {},
      places: [],
      parcours: []
    },
    async init() {
      this.data.map = L.map('map', { zoomControl: false }).setView([48.839623875988806, 2.588503717609941], 17);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        minZoom: 16,
        maxZoom: 18,
      }).addTo(this.data.map);

      var bounds = L.latLngBounds(
        L.latLng(48.836, 2.572),
        L.latLng(48.844, 2.595)
      );

      this.data.map.setMaxBounds(bounds);

      this.data.map.on('zoomend', () => {
        if (this.data.map.getZoom() == 16) {
          this.data.map.dragging.disable();
        } else {
          this.data.map.dragging.enable();
        }
      });

      this.data.map.on('drag', () => {
        var currentBounds = this.data.map.getBounds();
        if (!bounds.contains(currentBounds)) {
          this.data.map.panInsideBounds(bounds, { animate: false });
        }
      });

      await this.getData();
      await this.placeMarkers();    
    },
    async getData() {
      this.data.places = await places();
      this.data.parcours = await parcours_liste();
    },

    async placeMarkers() {
        console.log(this.data.places);
      this.data.places.forEach((place) => {
        var customIcon = L.divIcon({
          className: place.c[0].v,
          id: place.c[0].v,
          html: "<div id = '" + place.c[0].v + "'class='marker-background'><img id = '" + place.c[0].v + "'class='marker-image' src='" + place.c[6].v + "' alt='Image''></div>",
          iconSize: [50, 50],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30]
        });

        L.marker([place.c[5].v, place.c[4].v], { icon: customIcon }).addTo(this.data.map);
      });
    },
  };
};
