<template>
  <div class="container">
    <div v-for="(card, index) in homeCards" v-show="index === activeIndex" :key="card.route" class="column">
      <div class="home_button">
        <RouterLink :to="card.route" :aria-label="`Découvrir : ${card.title}`">
          <div class="filter"><img class="icon" :src="card.icon" alt="" /></div>
        </RouterLink>
      </div>
      <div class="name">{{ card.title }}</div>
      <div class="halftone-image">
        <img :src="card.image" :alt="card.title" />
      </div>
      <div class="desc">{{ card.description }}</div>
      <div class="home_arrow">
        <button class="arrow left_arr" type="button" aria-label="Carte précédente" @click="changeCard(-1)"></button>
        <button class="arrow right_arr" type="button" aria-label="Carte suivante" @click="changeCard(1)"></button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { homeCards } from "@/features/home/data/homeCards.js";

const activeIndex = ref(0);

function changeCard(step) {
  activeIndex.value = (activeIndex.value + step + homeCards.length) % homeCards.length;
}
</script>

<style scoped>
.container {
  width: 100lvw;
  height: 100lvh;
}
</style>
