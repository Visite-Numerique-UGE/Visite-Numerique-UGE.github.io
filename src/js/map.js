import { i18n } from "./data/i18n"
import L from 'leaflet';

export default () => {
    return {
        conf: { // set conf values here
            locale: document.querySelector('html').getAttribute('lang') // get lang attribute from html tag
        },
        data: { // set some data here 
            map: '',
            i18n: {},
            places: []
        },
        async init() {
            this.data.map = L.map('map', { zoomControl: false }).setView([48.839623875988806, 2.588503717609941], 17),
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
    
            // Utilisez des fonctions fléchées pour conserver le contexte de `this`
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
            this.placeMarkers();
    },
    async getData() {
        let SHEET_ID = "1ENhL6EfZIEraeUmJafmKlN-FIYWMvw920LFmcIa5Hp8";
        let SHEET_TITLE = "place";
        let SHEET_RANGE = "A:G";
        let FULL_URL = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?sheet=" + SHEET_TITLE + "&range=" + SHEET_RANGE;
        await fetch(FULL_URL)
        .then((res) => res.text())
        .then((rep) => {
            let _data = JSON.parse(rep.substring(47).slice(0, -2));
            _data.table.rows.shift();
            this.data.places = _data.table.rows;
        })
        .catch(error => {
            console.error(error);
            return error
        });
    },

    placeMarkers() {
        this.data.places.forEach((place) => {
            var customIcon = L.divIcon({
                className: place.c[0].v,
                id: place.c[0].v,
                html: "<div id = '" + place.c[0].v + "'class='marker-background'><img id = '" + place.c[0].v + "'class='marker-image' src='" + place.c[6].v + "' alt='Image''></div>",
                iconSize: [50, 50],
                iconAnchor: [15, 30],
                popupAnchor: [0, -30]
            });
            // Ajouter le marqueur avec l'icône personnalisée
            L.marker([place.c[5].v, place.c[4].v], { icon: customIcon }).addTo(this.data.map);
        });
    },
};
};