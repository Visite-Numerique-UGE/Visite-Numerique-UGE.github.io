import L from "leaflet";
import "leaflet-routing-machine";
import "lrm-graphhopper";
import { places } from "./place.js";
import * as _quiz_ from "./data/quiz.js";
import * as _data_ from "./data/data.js";
import { getUserLocation } from "./location.js";

var __map ;

export default () => {
  return {
    conf: {
      locale: document.querySelector("html").getAttribute("lang"),
    },
    data: {
      map: null,
      i18n: {},
      places: [],
      parcours: [],
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

      var bounds = L.latLngBounds(
        L.latLng(48.836, 2.572),
        L.latLng(48.844, 2.595)
      );

      __map.setMaxBounds(bounds);

      __map.on("zoomend", () => {
        if (__map.getZoom() == 16) {
          __map.dragging.disable();
        } else {
          __map.dragging.enable();
        }
      });

      __map.on("drag", () => {
        var currentBounds = __map.getBounds();
        if (!bounds.contains(currentBounds)) {
          __map.panInsideBounds(bounds, { animate: false });
        }
      });
      this.placeMarkers();
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
          var customIcon = L.divIcon({
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
              __map.setView([e.latlng.lat - 0.001, e.latlng.lng], 18);
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
        var place = p.find((element) => element.c[0].v == id);
        getUserLocation((userLocation) => {
          L.Routing.control({
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
            itineraryFormatter: function (data) {
              var time =
                Math.round((data.routes[0].summary.totalTime % 3600) / 60) +
                " min";
              var distance =
                Math.round(data.routes[0].summary.totalDistance / 100) / 10 +
                " km";
              var instructions =
                "<h2>Itinéraire</h2><p>Temps : " +
                time +
                "</p><p>Distance : " +
                distance +
                "</p>";
              return instructions;
            },
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
        });
      });
    },
  };
};
