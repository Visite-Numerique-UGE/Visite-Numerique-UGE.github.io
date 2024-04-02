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
.halftone-image img {
  filter: brightness(120%) contrast(55%);
  mix-blend-mode: hard-light;
  display: block;
}
</style>
