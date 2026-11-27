<template>
  <div class="_container">
    <div class="title"><h1>Liste des Parcours</h1></div>
  </div>

  <div class="course_page">
    <p v-if="isLoading">Chargement des parcours...</p>
    <p v-else-if="errorMessage" role="alert">{{ errorMessage }}</p>
    <p v-else-if="courses.length === 0">Aucun parcours disponible.</p>
    <div v-else v-for="(course, index) in courses" :key="course.id">
      <div class="list_course" :class="index === courses.length - 1 ? 'last' : ''">
        <div class="halftone-image child">
          <img :src="course.image" />
        </div>
        <div class="content_list child">
          <div class="name">{{ course.name }}</div>
          <div class="details">
            <span class="tag">{{ course.tag }}</span>
            <span class="place">{{ course.place }}</span>
          </div>

          <div class="desc">{{ course.description }}</div>

          <div class="home_button">
            <RouterLink :to="'/quiz/' + course.id"
              ><div class="filter">
                <img class="icon" id="_map" src="/assets/icon/map.png" />
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { getCourses } from "@backend/features/courses/index.js";
import { useAsyncData } from "@/shared/composables/useAsyncData.js";

const { data: courses, isLoading, errorMessage } = useAsyncData(getCourses, "Impossible de charger les parcours. Réessaie plus tard.");
</script>
