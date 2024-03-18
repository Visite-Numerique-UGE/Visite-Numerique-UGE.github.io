<script setup></script>

<template>
  <div class="flex-container">
    <div class="column">
      <div class="halftone-image" style="width: min(70lvw, 400px)">
        <img :src="'src/assets/building/' + this.mainImage + '.jpg'" />
      </div>

      <p class="desc">{{ this.placeDescription }}</p>
    </div>

    <div class="column">
      <div class="halftone-image" style="">
        <img :src="'src/assets/building/' + this.mainImage + '.jpg'" />
      </div>

      <p class="desc">{{ this.placeDescription }}</p>
    </div>

    <div class="column">
      <div class="halftone-image" style="">
        <img :src="'src/assets/building/' + this.mainImage + '.jpg'" />
      </div>

      <p class="desc">{{ this.placeDescription }}</p>
    </div>
  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
  width: 100lvw;
  height: 100lvh;
  background-color: red;
  border: 2px solid blue;
}
.flex-container > div {
  display: flex; /*grow*/
}
</style>
