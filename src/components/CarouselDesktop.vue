<script setup></script>

<template>
  <div class="flex-container">
    <div class="column">
      <div class="name">Carte</div>
      <div class="halftone-image">
        <img :src="'/assets/img/map_4.jpg'" />
      </div>

      <div class="desc">Perdu sur le campus ? Retrouve facilement ce qu'il te faut sur la carte interactive</div>

      <div class="home_button">
        <RouterLink to="/map"
          ><div class="filter">
            <img class="icon" id="_map" src="/assets/icon/map.png" />
          </div>
        </RouterLink>
      </div>
    </div>

    <div class="column">
      <div class="name">Parcours</div>
      <div class="halftone-image" style="">
        <img :src="'/assets/img/parcours_1.jpg'" />
      </div>

      <div class="desc">Envie de découvrir le campus. Grâce à ces parcours, le campus n'aura plus aucun secret pour toi !</div>
      <div class="home_button">
        <RouterLink to="/parcours"
          ><div class="filter">
            <img class="icon" src="/assets/icon/parcours.png" />
          </div>
        </RouterLink>
      </div>
    </div>

    <div class="column">
      <div class="name">Evenement</div>
      <div class="halftone-image" style="">
        <img :src="'/assets/img/event_2.jpg'" />
      </div>

      <div class="desc">Tu ne sais pas quoi faire prochainement ? Retrouve la liste de tous les évènements du campus.</div>
      <div class="home_button">
        <RouterLink to="/event">
          <div class="filter">
            <img class="icon" src="/assets/icon/event.png" />
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.flex-container {
  display: flex;
  width: 100lvw;
  height: 100lvh; /* 
  background-color: red; */
}
</style>

<script>
export default {
  methods: {},
};
</script>
