<template>
  <div id="mapContainer" class="quizMap"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getPlaces } from "@/api/getPlaces.js";
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
    // Créer la carte
    this.map = L.map("mapContainer", { zoomControl: false }).setView([48.839623875988806, 2.588503717609941], 17);
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      minZoom: 16,
      maxZoom: 18,
    }).addTo(this.map);
    let bounds = L.latLngBounds(L.latLng(48.836, 2.572), L.latLng(48.844, 2.595));
    this.map.setMaxBounds(bounds);
    this.map.on("drag", () => {
      let currentBounds = this.map.getBounds();
      if (!bounds.contains(currentBounds)) {
        this.map.panInsideBounds(bounds, { animate: false });
      }
    });

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
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },

  methods: {
    async retrieveData() {
      this.data = await getPlaces();
      this.data.forEach((place) => {
        let customIcon = L.divIcon({
          className: place.c[0].v,
          id: place.c[0].v,
          html: "<div id = '" + place.c[0].v + "'class=' '>",
          iconSize: [50, 50],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          /* <RouterLink to="/vocabulary/all/1">All</RouterLink> */
        });
        console.log(this.data);
        let marker = L.marker([place.c[5].v, place.c[4].v], { icon: customIcon, id: place.c[0].v }).addTo(this.map);
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
      this.routeControl = L.Routing.control({
        waypoints: [L.latLng(start), this.markers.find((marker) => marker.getLatLng().equals(destination)).getLatLng()],
        routeWhileDragging: false,
        alternativeRoutes: false,
        addWaypoints: false,
        draggableWaypoints: false,
        router: new L.Routing.GraphHopper("f8d3f7cb-8512-4c60-b0c5-e7ac1096fcb8", {
          vehicle: "foot",
        }),
      }).addTo(this.map);
      this.map.setView([destination[0] - 0.001, destination[1]], 18);

      /*
      document
        .getElementsByClassName("leaflet-pane leaflet-marker-pane")[0].  lastChild.remove(); */
      //leaflet-marker-icon leaflet-zoom-animated leaflet-interactive

      console.log("calculateAndDisplayRoute end");
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
