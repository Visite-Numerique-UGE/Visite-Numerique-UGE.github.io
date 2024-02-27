<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <!-- <nav class="sticky">
      
    </nav> -->
  </header>
  <nav class="top-banner">
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/map">Map</RouterLink>
    <RouterLink to="/quiz">Parcours</RouterLink>
    <RouterLink to="/event">Event</RouterLink>
  </nav>
  <RouterView />
</template>
