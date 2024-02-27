<script setup>
import Map from "@/components/Map.vue";
import Slider from "@/components/Slider.vue";
</script>

<template>
  <main>
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
  methods: {},
};
</script>
