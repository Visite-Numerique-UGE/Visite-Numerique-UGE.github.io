<template>
  <div id="mapContainer"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { getPlaces } from "@/api/getPlaces.js";
export default {
  name: "Map",
  data() {
    return {
      map: null,
      data: [],
      markers: [],
    };
  },
  mounted() {
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

    this.map.on("click", () => {
      //ICI

      this.$router.push("/map/");
    });
    this.retrieveData();
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
          html:
            "<div id = '" +
            place.c[0].v +
            "'class='marker-background'><img id = '" +
            place.c[0].v +
            "'class='marker-image' src='src/assets/building/" +
            place.c[0].v +
            ".jpg" /* +
            place.c[6].v */ +
            "' alt='Image'></div>",
          iconSize: [50, 50],
          iconAnchor: [15, 30],
          popupAnchor: [0, -30],
          /* <RouterLink to="/vocabulary/all/1">All</RouterLink> */
        });
        this.markers.push(
          L.marker([place.c[5].v, place.c[4].v], { icon: customIcon })
            .addTo(this.map)
            .on("click", (e) => {
              this.map.setView([e.latlng.lat - 0.001, e.latlng.lng], 18);
              console.log(place.c[0].v);

              this.$router.push("/map/" + place.c[0].v);
            })
            .addTo(this.map)
        );
      });
    },
  },
  watch: {
    "$route.params.id": {
      handler(id) {
        // do stuff
        console.log("id :");
        console.log(id);
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
#mapContainer {
  width: 100lvw;
  height: 100lvh;
}
</style>
