<template>
  <div class="_container">
    <div class="title"><h1>Liste des Evenements</h1></div>
  </div>

  <div class="course_page">
    <p v-if="isLoading">Chargement des événements...</p>
    <p v-else-if="errorMessage" role="alert">{{ errorMessage }}</p>
    <p v-else-if="eventList.length === 0">Aucun événement disponible.</p>
    <div v-else v-for="(event, index) in eventList" :key="`${event.title}-${index}`">
      <div class="list_event" :class="index === eventList.length - 1 ? 'last' : ''">
        <!--         <div class="halftone-image child">
          <img src="" />
        </div> -->
        <div class="content_list child">
          <div style="color: transparent">_</div>
          <div class="name">{{ event.title }}</div>
          <div class="details">
            <span class="tag">{{ event.date }}</span>
            <!-- <span class="place">{{ item }}</span> -->
          </div>

          <div class="desc">
            <span v-for="tag in event.tags" :key="tag">
              <span class="place">{{ tag }}</span>
            </span>
            <div><br />{{ event.description }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { parseCulture } from "@backend/features/events/index.js";
import { useAsyncData } from "@/shared/composables/useAsyncData.js";

const { data: eventList, isLoading, errorMessage } = useAsyncData(parseCulture, "Impossible de charger les événements. Réessaie plus tard.");
</script>
