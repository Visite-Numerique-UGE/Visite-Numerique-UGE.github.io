<template>
    <div id="slider-content">
        <img pictureUrl="" v-bind:src="this.mainImage"/>
        <h2>{{ this.placeName }}</h2>
        <p>{{ this.placeDescription }}</p>
        <div class="menu center">
            <button class = "show" id="show-description">Description</button>
            <button class = "show" id="show-parcours">Parcours</button>
            <button class = "show" id="show-event">Evènements</button>
        </div>
        <button v-for="parcours in this.parcoursList"
        :key="parcours.id"
        :name="parcours.name"
        ></button>
    </div>
</template>

  <script>
  import {getParcours} from "@/api/getParcours.js"
  import{getPlaces} from "@/api/getPlaces"
  export default {
    name: "Slider",
    data() {
      return {
        placesList: [],
        parcoursList: [],
        mainImage : "",
        placeName : "",
        placeDescription : "",
      };
    },
    created() {
        this.retrieveData();
    },
    methods: {
       async retrieveData() {
        this.parcoursList = await getParcours();
      },
      async fillSlider(placeID){
        this.placesList = await getPlaces();
        console.log(this.placesList[placeID].c[6].v);
        this.mainImage = this.placesList[placeID].c[6].v;
        this.placeName = this.placesList[placeID].c[1].v;
        this.placeDescription = this.placesList[placeID].c[2].v;
      }
    },
  };
  </script>