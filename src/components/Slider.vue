<template>
  <div id="slider-content">
    <div class="card">
      <div class="halftone-image">
        <!-- <img pictureUrl="" v-bind:src="this.mainImage" class="banner halftone" alt="" /> -->
        <img :src="'src/assets/building/' + this.mainImage + '.jpg'" />
      </div>
      <p class="name">{{ this.placeName }}</p>
      <p class="desc">{{ this.placeDescription }}</p>
      <div class="actions">
        <a><img class="icon" :src="parcours" /> </a>
        <a href="#" title=""><img class="icon" :src="event" /></a>
        <a href="#" title=""><img class="icon" :src="path" /></a>
      </div>
    </div>
  </div>
</template>

<script>
import { getParcours } from "@/api/getParcours.js";
import { getPlaces } from "@/api/getPlaces";
import parcours_selected from "@/assets/icon/parcours_selected.png";
import event_selected from "@/assets/icon/event_selected.png";
import path_selected from "@/assets/icon/path_selected.png";

export default {
  name: "Slider",
  data() {
    return {
      placesList: [],
      parcoursList: [],
      mainImage: "",
      placeName: "",
      placeDescription: "",
      event: event_selected,
      path: path_selected,
      parcours: parcours_selected,
    };
  },
  created() {
    this.retrieveData();
  },
  mounted() {
    console.log("here");
    console.log(this.$route.params.id);
    console.log("plus here");
    if (this.$route.params.id === undefined) {
      //document.getElementById("slider-content").style.display = "none";
      document.getElementById("slider-content").style.display = "none";
    }
  },
  methods: {
    async retrieveData() {
      this.parcoursList = await getParcours();
      if (this.$route.params.id !== undefined) {
        console.log(this.$route.params.id);
      }
    },
    async fillSlider(placeID) {
      this.placesList = await getPlaces();
      let tmp = this.placesList.filter((place) => {
        console.log(place.c[0].v == placeID);
        return place.c[0].v == placeID;
      })[0];
      this.mainImage = tmp.c[0].v;
      this.placeName = tmp.c[1].v;
      this.placeDescription = tmp.c[2].v;
      console.log(this.mainImage);
      console.log(this.placeName);
      console.log(this.placeDescription);
    },
  },
  watch: {
    "$route.params.id": {
      async handler(id) {
        // do stuff
        console.log("id :");
        console.log(id);
        console.log(this.placeName);
        if (id !== undefined) {
          await this.fillSlider(this.$route.params.id);
          document.getElementById("slider-content").style.display = "block";
        } else {
          this.mainImage = "";
          this.placeName = "";
          this.placeDescription = "";
          document.getElementById("slider-content").style.display = "none";
        }
      },
      immediate: true,
    },
  },
};
</script>
