<script setup>
import { getParcours } from "@/api/getParcours.js";
</script>

<template>
  <div class="_container">
    <div class="title"><h1>Liste des Parcours</h1></div>
  </div>

  <div class="course_page">
    <div v-for="(item, index) in this.clean_parcours"  :key="item">
      <div class="list_course" :class="index === (this.clean_parcours.length-1) ? 'last' : ''">
        <div class="halftone-image child">
          <img :src="'src/assets/building/Centrif.jpg'" />
        </div>
        <div class="content_list child">
          <div class="name">{{ item[1] }}</div>
          <div class="details">
          <span class="tag">{{ item[3] }}</span>
          <span v-for="place in item[4]" :key="place">
            <span class="place">{{ place }}</span>
          </span>
          </div>

          <div class="desc">{{ item[2] }}{{ item[2] }}</div>

          <div class="home_button">
            <RouterLink :to="'/quiz/' + item[0]"
              ><div class="filter">
                <img class="icon" id="_map" src="../assets/icon/map.png" />
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  
</style>

<script>
export default {
  data() {
    return {
      parcours: [],
      clean_parcours: [],
    };
  },
  created() {
    this.retrieveData();
  },

  mounted() {
    console.log("this.parcours");
    console.log(this.parcours);
    console.log("this.clean_parcours");
    console.log(this.clean_parcours);
  },

  methods: {
    async retrieveData() {
      this.parcours = await getParcours();

      if (this.$route.params.id !== undefined) {
        console.log(this.$route.params.id);
      }

      this.cleanData();
    },

    cleanData() {
      for (let i = 0; i < this.parcours.length; i++) {
        this.clean_parcours.push([]);
      }
      for (let i = 0; i < this.parcours.length; i++) {
        this.clean_parcours[i].push(this.parcours[i].c[0].v); //id
        this.clean_parcours[i].push(this.parcours[i].c[1].v); //nom
        this.clean_parcours[i].push(this.parcours[i].c[2].v); //desc
        this.clean_parcours[i].push(this.parcours[i].c[3].v); //tag
        this.clean_parcours[i].push(this.parcours[i].c.slice(4, 16)); //id
      }

      for (let i = 0; i < this.clean_parcours.length; i++) {
        this.clean_parcours[i][4] = this.clean_parcours[i][4].filter((elm) =>  {return elm });
      }

      for (let i = 0; i < this.parcours.length; i++) {
        for (let j = 0; j < this.clean_parcours[i][4].length; j++) {
          this.clean_parcours[i][4][j] = this.clean_parcours[i][4][j].v;
        }
        /*  = this.clean_parcours[i][4].filter((elm) => elm); */
      }
    },
  },
};
</script>
