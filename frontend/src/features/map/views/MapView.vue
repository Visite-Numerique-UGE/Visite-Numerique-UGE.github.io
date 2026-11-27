<script setup>
import Map from "../components/CampusMap.vue";
import Slider from "../components/PlaceDetails.vue";
</script>

<template>
  <main>
    <Map></Map>
    <div class="container"><Slider></Slider></div>
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
  methods: {},
};
</script>
