<script setup>
import * as Quiz from "@/api/getQuiz.js";

import Map from "@/components/MapQuiz.vue";
</script>

<template>
  <div class="container">
    <div class="game" v-if="pos < length">
      <!-- AVANCEE-->
      <div class="center">
        <div class="name">
          <p>
            {{ pos + 1 }} / {{ length }}
            <!-- - <span id="type">{{ type[pos] }}</span>
          </p> -->
          </p>
        </div>
      </div>
      <!-- QUESTION-->
      <div class="column question" id="">
        <div class="content-question">
          <div class="question">{{ question[pos] }}</div>
        </div>
      </div>
      <!-- MULTIPLE-->
      <div class="multiple" v-if="type[pos] == 'multiple'">
        <div class="column answer" :id="id + '-' + pos + '-' + answers_order[pos][0]" @click="verif(answers_order[pos][0])">
          <div>{{ answers[pos][answers_order[pos][0]] }}</div>
        </div>
        <div class="column answer" :id="id + '-' + pos + '-' + answers_order[pos][1]" @click="verif(answers_order[pos][1])">
          <div>{{ answers[pos][answers_order[pos][1]] }}</div>
        </div>
        <div class="column answer" :id="id + '-' + pos + '-' + answers_order[pos][2]" @click="verif(answers_order[pos][2])">
          <div>{{ answers[pos][answers_order[pos][2]] }}</div>
        </div>
        <div class="column answer" :id="id + '-' + pos + '-' + answers_order[pos][3]" @click="verif(answers_order[pos][3])">
          <div>{{ answers[pos][answers_order[pos][3]] }}</div>
        </div>
      </div>
      <!-- SAISIE-->
      <div class="saisie" v-if="type[pos] == 'saisie'">
        <div class="center _saisie">
          <input placeholder="saisissez votre réponse.." type="text" :id="id + '-' + pos + '-' + 0" :name="id + '-' + pos + '-' + 0" />
        </div>
        <div class="center _saisie">
          <button @click="verifSaisie()">Envoyer</button>
        </div>
      </div>
      <!-- lieu -->
      <div class="saisie" v-if="type[pos] == 'lieu'">
        <!-- mettre map lieu -->
        <div class="map_quiz"><Map /></div>
      </div>
    </div>
    <div class="result" v-if="pos == length">
      <div class="center">
        <div class="name">
          <p></p>
        </div>
      </div>
      <div class="column question" id="">
        <div class="content-question">
          <!-- TODO: FINIR PAGE DE FIN -->
          <div class="question">
            Bravo ! <br /><br />
            Merci d'avoir participé à ce parcours inauguratif. <br /><br />
            D'autres parcours seront bientôt ajouté. Ainsi vous pourrez visitez Descartes dans ses moindres recoins !
          </div>
        </div>
      </div>
    </div>
    <!-- BUTTON-->
    <div class="column" id="home_arrow">
      <div class="pad">
        <div class="home_arrow bottom" id=""></div>
      </div>
    </div>

    <div class="center" v-if="pos == length">
      <RouterLink :to="'/parcours/'">
        <div class="home_arrow bottom" id="">
          <button class="_saisie">Retour</button>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style lang="css" scoped src="@/assets/quiz.scss"></style>
<style lang="scss" scoped>
.answer {
  position: relative;
  margin-bottom: 20px;
  padding-top: 12.5px;
  padding-bottom: 12.5px;
  width: min(75.5lvw, 360px);
}
.halftone-image:before {
  content: "";
  position: absolute;
  width: 1000lvh;
  height: 1000lvh;
  left: -1550%;
}

.multiple {
  margin-top: 20px;
}
.container {
  width: 100lvw;
  height: 100lvh;
  display: block;
}
._saisie {
  width: min(85lvw, 400px);
  margin-left: auto;
  margin-right: auto;
  input {
    font-size: 1.7em;
    padding: 10px;
    margin-bottom: 20px;
    width: calc(calc(min(85lvw, 400px)) + 40px);
    border: 1px solid black;
    box-shadow: 0px 0px 0px 2px rgba(0, 0, 0, 1), 8px 8px 0px 0px rgba(0, 0, 0, 1);
    border-radius: 8px;
  }
  padding-bottom: 5.5px;
}

.desc {
  text-align: center;
  width: 80%;
  /* height: fit-content; */
  display: block;
}

.column {
  padding-left: 20px;
  padding-right: 20px;
  font-size: 1.3em;
  margin-bottom: 20px;
  display: block;
  height: fit-content;
  width: min(75.5lvw, 360px);
  margin-top: 0px;
}
</style>

<script>
export default {
  data() {
    return {
      quiz: [],
      id: this.$route.params.id,
      pos: localStorage.getItem("pos-" + this.$route.params.id) === null ? 0 : parseInt(localStorage.getItem("pos-" + this.$route.params.id)),
      max: localStorage.getItem("max-" + this.$route.params.id) === null ? 0 : parseInt(localStorage.getItem("max-" + this.$route.params.id)),
      length: 0,
      type: [],
      question: [],
      answers_order: [],
      answers: [],
    };
  },
  async created() {
    localStorage.setItem("pos-" + this.$route.params.id, this.pos);
    localStorage.setItem("max-" + this.$route.params.id, this.max);
    this.quiz = await Quiz.quiz;
    this.quiz = this.filter();
    this.length = this.quiz.length;
    console.log("id");
    console.log(this.id);
    this.getQuestion();
    localStorage.setItem("type-" + this.$route.params.id, JSON.stringify(this.type));
    localStorage.setItem("answers-" + this.$route.params.id, JSON.stringify(this.answers));
  },
  methods: {
    filter() {
      return this.quiz.filter((question) => {
        return question.c[0].v == this.id;
      });
    },
    getQuestion() {
      for (let i = 0; i < this.quiz.length; i++) {
        console.log("this.quiz.length : ", this.quiz.length);
        this.type.push(this.quiz[i].c[3].v);
        this.question.push(this.quiz[i].c[2].v);
        if (this.type[i] == "multiple") {
          console.log("getQuestion : multiple, i : ", i);
          this.answers.push([this.quiz[i].c[4].v, this.quiz[i].c[5].v, this.quiz[i].c[6].v, this.quiz[i].c[7].v]);
        } else if (this.type[i] == "saisie") {
          console.log("getQuestion : saisie, i : ", i);
          this.answers.push([this.quiz[i].c[4].v, "", "", ""]);
        } else if (this.type[i] == "lieu") {
          console.log("getQuestion : lieu, i : ", i);
          this.answers.push(this.quiz[i].c[8].v);
        } else if (this.type[i] == "anecdote") {
          console.log("getQuestion : anecdote, i : ", i);
          /* TODO: Ajouter des images - ajouter une colonne sur la BDD */
          this.answers.push([" ", " ", " ", " "]);
        }

        let shuffle = [0, 1, 2, 3];
        this.answers_order.push(
          shuffle
            .map((value) => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value)
        );
      }
    },
    changeCard(step = 0) {
      /*  document.getElementById("column-1").style.display = "none";
      document.getElementById("column-2").style.display = "none";
      document.getElementById("column-3").style.display = "none"; */
      console.log("style");
      console.log(this.type[this.pos]);

      if (this.type[this.pos] == "multiple") this.clean();

      if (step == -1) {
        this.pos = Math.max(this.pos - 1, 0);
      } else this.pos += step;
      this.max = Math.max(this.pos, this.max);

      localStorage.setItem("pos-" + this.$route.params.id, this.pos == this.length ? 0 : this.pos);
      localStorage.setItem("max-" + this.$route.params.id, this.max);

      this.buttonDisable();
      if (this.type[this.pos] == "multiple") this.clean();
      this.hid();
      /* const name = "column-" + this.card.at(this.pos);
      console.log(name);
      document.getElementById(name).style.display = "block"; */
    },

    buttonDisable() {
      console.log("heeeeeeeeeeeere");

      let larrow = document.getElementById("left_arr");
      let rarrow = document.getElementById("right_arr");
      rarrow.disabled = true;
      larrow.disabled = true;
      if (this.pos != 0) {
        larrow.disabled = false;
      }

      const type = this.type[this.pos];
      console.log("pos");
      console.log(this.pos);
      console.log("type");
      console.log(type);
      if (type == "lieu" || type == "anecdote" || this.max > this.pos) {
        rarrow.disabled = false;
      }
    },
    hid() {
      const harrow = document.getElementById("home_arrow");
      if (this.pos == this.length) {
        harrow.style.visibility = "hidden";
        harrow.style.display = "none";
      } else {
        harrow.style.visibility = "visible";

        harrow.style.display = "block";
      }
    },
    putArrow() {
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
          that.changeCard(-1);
        });
        rarrow[i].addEventListener("click", function () {
          that.changeCard(1);
        });
      }

      this.changeCard();
    },
    clean() {
      let rep0 = document.getElementById(this.id + "-" + this.pos + "-0");
      let rep1 = document.getElementById(this.id + "-" + this.pos + "-1");
      let rep2 = document.getElementById(this.id + "-" + this.pos + "-2");
      let rep3 = document.getElementById(this.id + "-" + this.pos + "-3");

      let rep = [rep0, rep1, rep2, rep3];
      for (let i = 0; i < rep.length; i++) {
        if (!rep[i]) break;
        rep[i].style.color = "#2458a0";
        rep[i].style.backgroundColor = "white";
      }
    },
    verif(answer) {
      console.log("answer");
      console.log(answer);
      if (answer == 0) {
        this.clean();
        this.changeCard(1);
      } else {
        let rep = document.getElementById(this.id + "-" + this.pos + "-" + answer);

        rep.style.color = "white";
        rep.style.backgroundColor = "#df3663";
      }
    },
    editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0) costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1)) newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0) costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    },
    similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (longerLength - this.editDistance(longer, shorter)) / parseFloat(longerLength);
    },
    verifSaisie() {
      const ans = this.answers[this.pos][0].toLowerCase();
      const ans_value = document.getElementById(this.id + "-" + this.pos + "-" + 0).value.toLowerCase();

      if (this.similarity(ans, ans_value) > 0.7) {
        this.changeCard(1);
      }
    },
  },
  async mounted() {
    this.quiz = await Quiz.quiz;
    this.quiz = this.filter();
    this.putArrow();
    /* */
  },
};
</script>
