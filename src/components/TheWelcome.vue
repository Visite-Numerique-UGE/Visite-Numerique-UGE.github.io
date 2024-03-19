<script setup>
import CarouselMobile from "./CarouselMobile.vue";
import CarouselDesktop from "./CarouselDesktop.vue";
</script>

<template>
  <div class="visibledesktop"><CarouselDesktop /></div>

  <div class="visibledevice">
    <CarouselMobile />
  </div>
</template>

<style scoped>
body {
  background: #fff;
}
</style>
