import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-graphhopper";
import { places } from "./place.js";
import * as _quiz_ from "./data/quiz.js";
import * as _data_ from "./data/data.js";
import { getUserLocation } from "./location.js";

let __map;
let route = null;

export default () => {
  return {
    conf: {
      locale: document.querySelector("html").getAttribute("lang"),
    },
    data: {
      //map: null,
      i18n: {},
      //places: [],
      //parcours: [],
      //slider: ''
    },
    _quiz: _quiz_,
    _data: _data_,
    init() {

      __map = L.map("map", { zoomControl: false }).setView(
        [48.839623875988806, 2.588503717609941],
        17
      );
      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png",
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          minZoom: 16,
          maxZoom: 18,
        }
      ).addTo(__map);

      let bounds = L.latLngBounds(
        L.latLng(48.836, 2.572),
        L.latLng(48.844, 2.595)
      );

      __map.setMaxBounds(bounds);

      __map.on("drag", () => {
        let currentBounds = __map.getBounds();
        if (!bounds.contains(currentBounds)) {
          __map.panInsideBounds(bounds, { animate: false });
        }
      });
      this.placeMarkers();

      //   var maskPolygonCoords  = L.polygon([
      //     [48.84234454154177, 2.573352561582853],
      //     [48.84102153853708, 2.573803663663745],
      //     [48.84161530792168, 2.582230061848677],
      //     [48.83491529836199, 2.5837269669108083],
      //     [48.833856638925006, 2.593346563406754],
      //     [48.84254497446358, 2.595501110303805],
      //     [48.843383768473544, 2.5888857410083177],
      //     [48.843403739598976, 2.5831807436851104]
      // ]).addTo(__map);

    },
    page(id_parcours, step, state) {
      _data_.save("state", state);
      _quiz_.map(state);
      _quiz_.question(id_parcours, step, state);
      _quiz_.answer(id_parcours, step, state);
      _quiz_.endPage(id_parcours, state);
    },

    placeMarkers() {
      places.then((places) => {
        places.forEach((place) => {
          let customIcon = L.divIcon({
            className: place.c[0].v,
            id: place.c[0].v,
            html:
              "<div id = '" +
              place.c[0].v +
              "'class='marker-background'><img id = '" +
              place.c[0].v +
              "'class='marker-image' src='" +
              place.c[6].v +
              "' alt='Image'></div>",
            iconSize: [50, 50],
            iconAnchor: [15, 30],
            popupAnchor: [0, -30],
          });
          L.marker([place.c[5].v, place.c[4].v], { icon: customIcon })
            .addTo(__map)
            .on("click", (e) => {
              __map.setView([e.latlng.lat - 0.00075, e.latlng.lng], 18);
              if (route != null) __map.removeControl(route);
              //marker color change
              let markers = document.querySelectorAll(".marker-background");
              e.className = "marker-background-active";
            })
            .addTo(__map);
        });
      });
    },

    //get the map
    getMap() {
      return __map;
    },

    navigation(id) {
      places.then((p) => {
        let place = p.find((element) => element.c[0].v == id);
        getUserLocation((userLocation) => {
          if (route != null) __map.removeControl(route);
          route = L.Routing.control({
            waypoints: [
              L.latLng(userLocation.lat, userLocation.lng),
              L.latLng(place.c[5].v, place.c[4].v),
            ],
            routeWhileDragging: false,
            alternativeRoutes: false,
            addWaypoints: false,
            draggableWaypoints: false,
            router: L.Routing.graphHopper(
              "f8d3f7cb-8512-4c60-b0c5-e7ac1096fcb8",
              {
                urlParameters: {
                  vehicle: "foot",
                },
              }
            ),
            createMarker: function (i, wp, nWps) {
              if (i === nWps - 1) {
                return L.marker(wp.latLng, {
                  icon: L.divIcon({ className: "" }),
                });
              } else {
                return L.marker(wp.latLng, {
                  draggable: true,
                });
              }
            },
          }).addTo(__map);
          //set view at the center between the user and the place
          console.log();
          __map.setView([(Number(userLocation.lat) + Number(place.c[5].v)) / 2, (Number(userLocation.lng) + Number(place.c[4].v)) / 2], 10);
        });
      });
    },
  };
};
