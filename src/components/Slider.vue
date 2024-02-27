<template>
  <div id="slider-content">
    <img pictureUrl="" v-bind:src="this.mainImage" />
    <h2>{{ this.placeName }}</h2>
    <p>{{ this.placeDescription }}</p>
    <div class="menu center">
      <button class="show" id="show-description">Description</button>
      <button class="show" id="show-parcours">Parcours</button>
      <button class="show" id="show-event">Evènements</button>
    </div>
    <button v-for="parcours in this.parcoursList" :key="parcours.id" :name="parcours.name"></button>
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
  methods: {
    async retrieveData() {
      this.parcoursList = await getParcours();
      if (this.$route.params.id !== undefined) {
        console.log("here\n");
        console.log(this.$route.params.id);
        await this.fillSlider(this.$route.params.id);
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
};
</script>
