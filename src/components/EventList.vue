<script setup>
import * as EventJS from "@/api/getEvents.js";
</script>

<template>
  <div class="_container">
    <div class="title"><h1>Liste des Evenements</h1></div>
  </div>

  <div class="course_page">
    <div v-for="(item, index) in eventList" :key="item">
      <div class="list_event" :class="index === eventList.length - 1 ? 'last' : ''">
        <!--         <div class="halftone-image child">
          <img src="" />
        </div> -->
        <div class="content_list child">
          <div style="color: transparent">_</div>
          <div class="name">{{ item[0] }}</div>
          <div class="details">
            <span class="tag">{{ item[1] }}</span>
            <!-- <span class="place">{{ item }}</span> -->
          </div>

          <div class="desc">
            <span v-for="place in item[2]" :key="place">
              <span class="place">{{ place }}</span>
            </span>
            <div><br />{{ item[3] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script>
export default {
  data() {
    return {
      eventList: [],
    };
  },
  created() {
    this.retrieveData();
  },

  mounted() {
    console.log("EVENT");
  },

  methods: {
    async retrieveData() {
      this.eventList = await EventJS.parseCulture();
    },
  },
};
</script>
