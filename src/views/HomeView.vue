<script setup>
import TheWelcome from "../components/TheWelcome.vue";
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>

<script>
export default {
  name: "main",
  components: {},
  data() {},
  methods: {},
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
