import L from 'leaflet';
import 'leaflet-routing-machine';
import 'lrm-graphhopper';
import { parcours_liste } from "./parcours.js";
import { places } from "./place.js";
import * as _quiz_ from "./data/quiz.js"
import * as _data_ from "./data/data.js"
import { getUserLocation } from "./location.js"

export default () => {
  return {
    conf: {
      locale: document.querySelector('html').getAttribute('lang')
    },
    data: {
      map: '',
      i18n: {},
      places: [],
      parcours: [],
      //slider: ''
    },
    _quiz: _quiz_,
    _data: _data_,
    async init() {
      this.data.map = L.map('map', { zoomControl: false }).setView([48.839623875988806, 2.588503717609941], 17);

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        minZoom: 1,
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
    }, page(id_parcours, step, state) {

      _data_.save("state", state)
      _quiz_.map(state);
      _quiz_.question(id_parcours, step, state)
      _quiz_.answer(id_parcours, step, state)
      _quiz_.endPage(id_parcours, state)

    },
    async getData() {
      this.data.places = await places();
      this.data.parcours = await parcours_liste();
    },

    async placeMarkers() {
      this.data.places.forEach((place) => {
        var customIcon = L.divIcon({
          className: place.c[0].v,
          id: place.c[0].v,
          html: "<div id = '" + place.c[0].v + "'class='marker-background'><img id = '" + place.c[0].v + "'class='marker-image' src='" + place.c[6].v + "' alt='Image'></div>",
          iconSize: [50, 50],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
        });
        //lorsqu'on clique sur un marker, on zoom sur le lieu et on affiche le slider

        L.marker([place.c[5].v, place.c[4].v], { icon: customIcon }).addTo(this.data.map).on('click', (e) => {
          this.data.map.setView([e.latlng.lat - 0.001, e.latlng.lng], 18);
          getUserLocation((userLocation) => {
            console.log(L.Routing.control);
            L.Routing.control({
              waypoints: [
                  L.latLng(userLocation.lat, userLocation.lng), // Utilisez la géolocalisation comme point de départ
                  L.latLng(place.c[5].v, place.c[4].v) // Exemple de point d'arrivée
              ],
              routeWhileDragging: false,
              alternativeRoutes: false,
              addWaypoints: false,  // Empêche l'ajout manuel de waypoints
              draggableWaypoints: false,
                            router: L.Routing.graphHopper('f8d3f7cb-8512-4c60-b0c5-e7ac1096fcb8', {
                  urlParameters: {
                      vehicle: 'foot'
                  }
              }),
              itineraryFormatter: function (data) {
                    var time = Math.round(data.routes[0].summary.totalTime % 3600 / 60) + ' min';
                    var distance = Math.round(data.routes[0].summary.totalDistance / 100) / 10 + ' km';
                    var instructions = '<h2>Itinéraire</h2><p>Temps : ' + time + '</p><p>Distance : ' + distance + '</p>';
                    return instructions;
                  },
                  createMarker: function(i, wp, nWps) {
                    if (i === nWps - 1) {
                        // Point d'arrivée, définissez l'opacité à 0
                        return L.marker(wp.latLng, {
                            icon: L.divIcon({ className: ''})
                        });
                    } else {
                        // Les autres points (départ et intermédiaires) utilisent le marquer par défaut
                        return L.marker(wp.latLng, {
                            draggable: true
                        });
                    }
                }

          }).addTo(this.data.map);
          var instructionsDiv = document.querySelector('.leaflet-routing-container');
          if (instructionsDiv) {
              instructionsDiv.style.display = 'none';
          }
          
      
          });
        }
        );
      });
      
    },
    
    //get the map 
    getMap() {
      return this.data.map;
    },
  }
};
