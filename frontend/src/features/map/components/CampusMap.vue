<template>
  <div class="_container">
    <div class="title">
      <h1>Carte</h1>
    </div>
  </div>
  <div id="mapContainer"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getPlaces } from "@backend/features/places/index.js";
import { createCampusMap, createWalkingRoute } from "../index.js";
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
    };
  },
  mounted() {
    this.map = createCampusMap("mapContainer");

    // Obtenir la position de l'utilisateur
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userPosition = [position.coords.latitude, position.coords.longitude];
      });
    } else {
      alert("La position de l'utilisateur n'est pas disponible.");
    }
    this.retrieveData();

    // Gestionnaire d'événement pour cliquer sur la carte
    this.map.on("click", () => {
      //ICI
      this.$router.push("/map/");
    });
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
          html:
            "<div id = '" +
            place.id +
            "'class='marker-background '><img id = '" +
            place.id +
            "'class='marker-image filtered' src='/assets/building/" +
            place.image +
            ".jpg" +
            "' alt='Image'></div>",
          iconSize: [50, 50],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
        });
        let marker = L.marker([place.latitude, place.longitude], { icon: customIcon, id: place.id })
          .addTo(this.map)
          .on("click", (e) => {
            this.map.setView([e.latlng.lat - 0.001, e.latlng.lng], 18);
            this.$router.push("/map/" + place.id);
          });
        this.markers.push(marker);
      });
    },
    calculateAndDisplayRoute(start, destination) {
      console.log("calculateAndDisplayRoute start");
      if (this.routeControl) {
        this.map.removeControl(this.routeControl);
      }
      this.routeControl = createWalkingRoute(start, destination).addTo(this.map);
      this.map.setView([destination[0] - 0.001, destination[1]], 18);
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

        console.log("this.userPosition", this.userPosition);
        const lat_user = L.latLng(this.userPosition);
        console.log("L.latLng(this.userPosition)", lat_user);
        console.log("this.map.getBounds()", this.map.getBounds());
        console.log("this.map.getBounds().contains(L.latLng(this.userPosition))", this.map.getBounds().contains(L.latLng(this.userPosition)));

        if (this.$route.name == "navigate" /* && this.map.getBounds().contains(L.latLng(this.userPosition)) */) {
          //chopper l'élément

          console.log("avant destinationCoords");
          let destinationCoords = this.markers.find((marker) => marker.options.id == this.$route.params.id).getLatLng();
          console.log("avant calculateAndDisplayRoute");
          this.calculateAndDisplayRoute(this.userPosition, [destinationCoords.lat, destinationCoords.lng]);
        }
      },
    },
  },
};
</script>

<style scoped>
#mapContainer {
  width: 100lvw;
  height: 95lvh;
}
</style>
