<template>
  <div id="mapContainer" class="quizMap"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getPlaces } from "@backend/features/places/index.js";
import { createCampusMap, createWalkingRoute } from "@/features/map/index.js";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import "lrm-graphhopper";
export default {
  name: "Map",
  data() {
    return {
      map: null,
      data: [],
      markers: [],
      route: null,
      userPosition: null,
      id: null,

      pos: parseInt(localStorage.getItem("pos-" + this.$route.params.id)),
      answers: JSON.parse(localStorage.getItem("answers-" + this.$route.params.id)),
      type: JSON.parse(localStorage.getItem("type-" + this.$route.params.id)),
    };
  },
  async mounted() {
    this.map = createCampusMap("mapContainer");

    // Obtenir la position de l'utilisateur
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userPosition = [position.coords.latitude, position.coords.longitude];
      });
    } else {
      alert("La position de l'utilisateur n'est pas disponible.");
    }
    await this.retrieveData();

    // Gestionnaire d'événement pour cliquer sur la carte

    this.calcPath();
  },
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },

  methods: {
    async retrieveData() {
      this.data = await getPlaces();
      this.data.forEach((place) => {
        let customIcon = L.divIcon({
          className: place.id,
          id: place.id,
          html: "<div id = '" + place.id + "'class=' '>",
          iconSize: [50, 50],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
        });
        let marker = L.marker([place.latitude, place.longitude], { icon: customIcon, id: place.id }).addTo(this.map);
        this.markers.push(marker);
      });
    },
    getData() {
      console.log("this.$route.params.id", this.$route.params.id);

      console.log("pos-" + this.$route.params.id);
      this.pos = parseInt(localStorage.getItem("pos-" + this.$route.params.id));
      this.answers = JSON.parse(localStorage.getItem("answers-" + this.$route.params.id));
      this.type = JSON.parse(localStorage.getItem("type-" + this.$route.params.id));
    },
    calculateAndDisplayRoute(start, destination) {
      console.log("calculateAndDisplayRoute start", start);
      console.log("calculateAndDisplayRoute destination", destination);
      if (this.routeControl) {
        this.map.removeControl(this.routeControl);
      }
      this.routeControl = createWalkingRoute(start, destination).addTo(this.map);
      this.map.setView([destination[0] - 0.001, destination[1]], 18);

      /*
      document
        .getElementsByClassName("leaflet-pane leaflet-marker-pane")[0].  lastChild.remove(); */
      //leaflet-marker-icon leaflet-zoom-animated leaflet-interactive

    },

    async getPosUser() {
      const getCoords = async () => {
        const pos = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        console.log("pooiooooooooooos", pos);
        return {
          lng: pos.coords.longitude,
          lat: pos.coords.latitude,
        };
      };

      this.userPosition = await getCoords();
      console.log("getPosUser this.userPosition : ", this.userPosition);
    },

    async calcPath() {
      this.getData();

      console.log("/ ------------------ CALC PATH ------------------  /");
      await this.getPosUser();

      let destinationCoords = this.getPosPlace();
      console.log("destinationCoords :", destinationCoords); /*
      console.log("destinationCoords.latlng :", destinationCoords.getLatLng()); */
      console.log("destinationCoords.lat :", destinationCoords.lat);
      console.log("destinationCoords.lng :", destinationCoords.lng);
      /*const lat_user = L.latLng(this.userPosition);
      if(this.map.getBounds().contains(lat_user)) */
      const dest_test = [destinationCoords.lat - 0.0001, destinationCoords.lng - 0.001];
      this.calculateAndDisplayRoute(this.userPosition, [destinationCoords.lat, destinationCoords.lng]);
    },

    getPosPlace() {
      console.log("this.answers[this.pos]: ", this.answers[this.pos]);

      return this.markers.find((marker) => marker.options.id == this.answers[this.pos]).getLatLng();
    },

    removeRoute() {
      if (this.routeControl) {
        this.map.removeControl(this.routeControl);
        this.routeControl = null;
      }
    },
  },
  watch: {
    "$route.params": {
      async handler(params) {
        console.log("route name : ", this.$route.name);
        console.log("route : ", this.$route.params.id);

        if (this.$route.name == "navigate" /* && this.map.getBounds().contains(L.latLng(this.userPosition)) */) {
          //chopper l'élément
          this.calcPath();
        }
      },
    },
  },
};
</script>

<style scoped>
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>
