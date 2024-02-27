<template>
  <div id="slider-content">
    <div class="card">
      <div class="halftone-image">
        <img pictureUrl="" v-bind:src="this.mainImage" class="banner halftone" alt="" />
      </div>
      <p class="name">{{ this.placeName }}</p>
      <p>{{ this.placeDescription }}</p>
      <div class="actions">
        <a>Parcours</a>
        <a href="#" title="">Evénement</a>
        <a href="#" title="">Y aller</a>
      </div>
    </div>
  </div>
</template>

<script>
import { getParcours } from "@/api/getParcours.js";
import { getPlaces } from "@/api/getPlaces";
export default {
  name: "Slider",
  data() {
    return {
      placesList: [],
      parcoursList: [],
      mainImage: "",
      placeName: "",
      placeDescription: "",
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
      this.mainImage = tmp.c[6].v;
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
