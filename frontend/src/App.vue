<script setup>
import { computed } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const route = useRoute();
const navigationItems = Object.values(import.meta.glob("./features/*/navigation.js", { eager: true, import: "default" })).sort((a, b) => a.order - b.order);
const activeNavigationId = computed(() => route.meta.navigationId);
</script>

<template>
  <header>
    <div class="banner"></div>
    <nav class="top-banner" aria-label="Navigation principale">
      <RouterLink
        v-for="item in navigationItems"
        :key="item.id"
        :to="item.to"
        :aria-label="item.label"
        :aria-current="activeNavigationId === item.id ? 'page' : undefined"
      >
        <div :class="{ filter: activeNavigationId === item.id }">
          <img class="icon _navbar" :src="item.icon" :alt="item.label" />
        </div>
      </RouterLink>
    </nav>
  </header>
  <RouterView />
</template>
