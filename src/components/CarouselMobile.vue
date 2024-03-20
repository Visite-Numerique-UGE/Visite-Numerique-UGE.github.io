<script setup></script>

<template>
  <div class="container">
    <div class="column" id="column-1">
      <div class="home_button">
        <RouterLink to="/map">
          <div class="filter"><img class="icon" id="_map" src="../assets/icon/map.png" /></div
        ></RouterLink>
      </div>
      <div class="name">Carte</div>
      <div class="halftone-image">
        <img :src="'src/assets/building/Centrif.jpg'" />
      </div>
      <div class="desc">Perdu sur le campus ? Retrouve facilement ce qu'il te faut sur la carte interactive</div>
      <div class="home_arrow"></div>
    </div>

    <div class="column" id="column-2">
      <div class="home_button">
        <RouterLink to="/parcours"
          ><div class="filter"><img class="icon" src="../assets/icon/parcours.png" /></div
        ></RouterLink>
      </div>
      <div class="name">Parcours</div>
      <div class="halftone-image" style="">
        <img :src="'src/assets/building/Centrif.jpg'" />
      </div>

      <div class="desc">Envie de découvrir le campus. Grâce à ces parcours, le campus n'aura plus aucun secret pour toi !</div>
      <div class="home_arrow"></div>
    </div>

    <div class="column" id="column-3">
      <div class="home_button">
        <RouterLink to="/event"
          ><div class="filter"><img class="icon" src="../assets/icon/event.png" /></div
        ></RouterLink>
      </div>
      <div class="name">Evenement</div>
      <div class="halftone-image" style="">
        <img :src="'src/assets/building/Centrif.jpg'" />
      </div>

      <div class="desc">Tu ne sais pas quoi faire prochainement ? Retrouve la liste de tous les évènements du campus.</div>
      <div class="home_arrow"></div>
    </div>
  </div>
</template>

<style scoped>
.container {
  /* 
  display: flex; */
  width: 100lvw;
  height: 100lvh; /* 
  background-color: red; */
}
.column {
  /* display: flex; */
}
</style>

<script>
export default {
  data() {
    return {
      card: [1, 2, 3],
      pos: 0,
    };
  },
  methods: {
    changeCard: function (step) {
      document.getElementById("column-1").style.display = "none";
      document.getElementById("column-2").style.display = "none";
      document.getElementById("column-3").style.display = "none";
      this.pos += step;
      this.pos %= this.card.length;
      const name = "column-" + this.card.at(this.pos);
      console.log(name);
      document.getElementById(name).style.display = "block";
    },
  },
  mounted() {
    const harrow = document.getElementsByClassName("home_arrow");

    console.log(harrow);
    for (let i = 0; i < harrow.length; i++) {
      harrow[i].innerHTML += `<button class="arrow left_arr" id="left_arr" ></button> <button class="arrow right_arr" id="right_arr" ></button>`;
    }
    const that = this;
    const larrow = document.getElementsByClassName("left_arr");
    const rarrow = document.getElementsByClassName("right_arr");
    for (let i = 0; i < larrow.length; i++) {
      larrow[i].addEventListener("click", function () {
        console.log("Bonjour");
        that.changeCard(-1);
      });
      rarrow[i].addEventListener("click", function () {
        console.log("au revoir");
        that.changeCard(1);
      });
    }

    /* document.getElementById("column-1").style.display = "none"; */
    document.getElementById("column-2").style.display = "none";
    document.getElementById("column-3").style.display = "none";

    /* */
  },
};
</script>
