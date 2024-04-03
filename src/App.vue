<script setup>
import router from "@/router/index.js";
import { watch } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";
</script>

<template>
  <header>
    <!-- <nav class="sticky">
      
    </nav> -->
  </header>
  <div class="banner"></div>
  <nav class="top-banner">
    <RouterLink to="/"><img class="icon _navbar" id="icon_home" :src="icon[0] + '.png'" /></RouterLink>
    <RouterLink to="/map"><img class="icon _navbar" id="icon_map" :src="icon[1] + '.png'" /></RouterLink>
    <RouterLink to="/parcours"><img class="icon _navbar" id="icon_parcours" :src="icon[2] + '.png'" /></RouterLink>
    <RouterLink to="/event"><img class="icon _navbar" id="icon_event" :src="icon[3] + '.png'" /></RouterLink>
  </nav>
  <RouterView />
</template>

<script>
export default {
  name: "Slider",
  data() {
    return {
      icon: ["/assets/icon/home", "/assets/icon/map", "/assets/icon/parcours", "/assets/icon/event"],
      route: useRoute(),
    };
  },
  watch: {
    route: {
      handler: function () {
        let route = this.$route.name.split("-")[0];

        if (route == "quiz") route = "parcours";

        if (route == "navigate") route = "map";

        console.log("route");
        console.log(route);
        this.icon = this.icon.map((x) => x.replace("_selected", ""));

        let _filter = document.getElementById("filter");
        console.log("_filter");
        console.log(_filter);

        if (_filter !== null) {
          let childFilter = _filter.firstChild;
          _filter.parentNode.insertBefore(childFilter, _filter);
          _filter.parentNode.removeChild(_filter);
        }
        const _navbar = document.getElementsByClassName("_navbar");

        const _id = "icon_" + route;

        console.log("id : ");
        console.log(_id);
        let wrapper = document.createElement("div");
        wrapper.className = "filter";
        wrapper.id = "filter";
        let myDiv = document.getElementById(_id);
        wrapper.appendChild(myDiv.cloneNode(true));
        myDiv.parentNode.replaceChild(wrapper, myDiv);
      },
      deep: true, // Watch nested properties inside sort object
    },
  },
  mounted() {},
};
</script>
