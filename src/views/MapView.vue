<script setup>
import TheWelcome from "../components/TheWelcome.vue";

import Map from "@/components/Map.vue";
import Slider from "@/components/Slider.vue";
</script>

<template>
  <main>
    <!-- <TheWelcome /> -->

    <nav><button class="top-banner" @click="doStuff" style="position: absolute">toggle</button></nav>
    <Map></Map>
    <Slider></Slider>
  </main>
</template>

<script>
export default {
  name: "main",
  components: { Map, Slider },
  data() {
    return {
      slider: false,
    };
  },
  methods: {
    doStuff: function () {
      console.log("heeeeeeeeeeeey");
      console.log(Map.data()._tmp_id);
      console.log(Map.data().tmp_id);
      console.log(Map.data().map);
      console.log("heeeeeeeeeeeey");
      console.log(Slider.data());

      this.slider = !this.slider;
      if (this.$route.params.id !== undefined) {
        Slider.methods.fillSlider(this.$route.params.id);
        console.log(Slider.data());
      }
    },
  },
};
</script>

<style>
.custom-div-icon {
  position: relative;
  text-align: center;
}

.marker-background {
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: rgb(24, 140, 166);
  border-radius: 50% 50% 50% 0%;
  transform: rotate(-45deg);
}

.marker-image {
  position: absolute;
  top: 3px;
  left: 3px;
  width: auto;
  height: 34px;
  aspect-ratio: 1/1;
  border-radius: 100%;
  transform: rotate(45deg);
}
</style>
