<template>
  <div class="flex-container">
    <div v-for="card in homeCards" :key="card.route" class="column">
      <div class="name">{{ card.title }}</div>
      <div class="halftone-image">
        <img :src="card.image" :alt="card.title" />
      </div>
      <div class="desc">{{ card.description }}</div>
      <div class="home_button">
        <RouterLink :to="card.route" :aria-label="`Découvrir : ${card.title}`">
          <div class="filter"><img class="icon" :src="card.icon" alt="" /></div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { homeCards } from "@/features/home/data/homeCards.js";
</script>

<style scoped>
.flex-container {
  display: flex;
  width: 100lvw;
  height: 100lvh;
}
</style>
