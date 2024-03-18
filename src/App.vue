<script setup>
import router from "@/router/index.js";
import { watch } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
/* import home from "./assets/icon/home.png";
import home_selected from "./assets/icon/home_selected.png";
import event from "./assets/icon/event.png";
import event_selected from "./assets/icon/event_selected.png";
import map from "./assets/icon/map.png";
import map_selected from "./assets/icon/map_selected.png";
import parcours from "./assets/icon/parcours.png";
import parcours_selected from "./assets/icon/parcours_selected.png";
 */
</script>

<template>
  <header>
    <!-- <nav class="sticky">
      
    </nav> -->
  </header>
  <nav class="top-banner">
    <RouterLink to="/"><img class="icon" :src="icon[0] + '.png'" /></RouterLink>
    <RouterLink to="/map"><img class="icon" :src="icon[1] + '.png'" /></RouterLink>
    <RouterLink to="/quiz"><img class="icon" :src="icon[2] + '.png'" /></RouterLink>
    <RouterLink to="/event"><img class="icon" :src="icon[3] + '.png'" /></RouterLink>
  </nav>
  <RouterView />
</template>

<script>
export default {
  name: "Slider",
  data() {
    return {
      icon: ["src/assets/icon/home", "src/assets/icon/map", "src/assets/icon/parcours", "src/assets/icon/event"],
      route: useRoute(),
    };
  },
  watch: {
    route: {
      handler: function () {
        console.log(this.route.name);
        this.icon = this.icon.map((x) => x.replace("_selected", ""));
        if (this.route.name == "home") this.icon[0] += "_selected";
        if (this.route.name == "map") this.icon[1] += "_selected";
        if (this.route.name == "quiz-list") this.icon[2] += "_selected";
        if (this.route.name == "event") this.icon[3] += "_selected";
      },
      deep: true, // Watch nested properties inside sort object
    },
  },
  mounted() {},
};
</script>
