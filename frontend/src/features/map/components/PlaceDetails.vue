<template>
  <div v-if="isLoading" id="slider-content" role="status">Chargement du lieu...</div>
  <div v-else-if="errorMessage" id="slider-content" role="alert">{{ errorMessage }}</div>
  <div v-else-if="place" id="slider-content">
    <div class="card">
      <div class="halftone-image">
        <img :src="`/assets/building/${place.image}.jpg`" :alt="place.name" />
      </div>
      <p class="name">{{ place.name }}</p>
      <p class="desc">{{ place.description }}</p>
      <div class="actions">
        <RouterLink :to="`/parcours/${place.name}`" aria-label="Voir les parcours associés">
          <div class="filter"><img class="icon" src="/assets/icon/parcours.png" alt="" /></div>
        </RouterLink>
        <RouterLink :to="`/event/${place.name}`" aria-label="Voir les événements associés">
          <div class="filter"><img class="icon" src="/assets/icon/event.png" alt="" /></div>
        </RouterLink>
        <RouterLink :to="`/navigate/${place.id}`" aria-label="Calculer un itinéraire vers ce lieu">
          <div class="filter"><img class="icon" src="/assets/icon/path.png" alt="" /></div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { getPlaces } from "@backend/features/places/index.js";
import { useAsyncData } from "@/shared/composables/useAsyncData.js";

const route = useRoute();
const { data: places, isLoading, errorMessage } = useAsyncData(getPlaces, "Impossible de charger ce lieu.");
const place = computed(() => places.value.find((item) => item.id === route.params.id));
</script>
