<script setup>
import * as Quiz from "@/api/getQuiz.js";
</script>

<template>
  <div class="container">
    <div class="game" v-if="pos < length">
      <!-- AVANCEE-->
      <div class="center">
        <div class="name">
          <p>
            {{ pos + 1 }} / {{ length }} - <span id="type">{{ type[pos] }}</span>
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
        <div class="column answer" :id="id + '-' + pos + '-' + answers_order[pos][0]" @click="this.verif(answers_order[pos][0])">
          <div>{{ answers[pos][answers_order[pos][0]] }}</div>
        </div>
        <div class="column answer" :id="id + '-' + pos + '-' + answers_order[pos][1]" @click="this.verif(answers_order[pos][1])">
          <div>{{ answers[pos][answers_order[pos][1]] }}</div>
        </div>
        <div class="column answer" :id="id + '-' + pos + '-' + answers_order[pos][2]" @click="this.verif(answers_order[pos][2])">
          <div>{{ answers[pos][answers_order[pos][2]] }}</div>
        </div>
        <div class="column answer" :id="id + '-' + pos + '-' + answers_order[pos][3]" @click="this.verif(answers_order[pos][3])">
          <div>{{ answers[pos][answers_order[pos][3]] }}</div>
        </div>
      </div>
      <!-- SAISIE-->
      <div class="saisie" v-if="type[pos] == 'saisie'">
        <div class="center">
          <input placeholder="saisissez votre réponse.." type="text" :id="id + '-' + pos + '-' + 0" :name="id + '-' + pos + '-' + 0" />
        </div>
        <div class="center">
          <button @click="verifSaisie()">Envoyer</button>
        </div>
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
          <div class="question">Bravo !Bravo !Bravo !Bravo !Bravo !Bravo !Bravo !Bravo !Bravo !Bravo !Bravo !Bravo !Bravo !Bravo !Bravo !</div>
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
      <RouterLink :to="'/parcours/'"><button>Retour</button> </RouterLink>
    </div>
  </div>
</template>

<style lang="css" scoped src="@/assets/quiz.scss"></style>
<style lang="scss" scoped>
.answer {
  position: relative;
  margin-bottom: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.multiple {
  margin-top: 20px;
}
.container {
  width: 100lvw;
  height: 100lvh;
  display: block;
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
  font-size: 1.5em;
  margin-bottom: 20px;
  display: block;
  height: fit-content;
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
    this.quiz = await Quiz.quiz;
    this.quiz = this.filter();
    this.length = this.quiz.length;
    console.log("id");
    console.log(this.id);
    this.getQuestion();
  },
  methods: {
    filter() {
      return this.quiz.filter((question) => {
        return question.c[0].v == this.id;
      });
    },
    getQuestion() {
      for (let i = 0; this.quiz.length; i++) {
        this.type.push(this.quiz[i].c[3].v);
        this.question.push(this.quiz[i].c[2].v);
        if (this.type[i] == "multiple") {
          this.answers.push([this.quiz[i].c[4].v, this.quiz[i].c[5].v, this.quiz[i].c[6].v, this.quiz[i].c[7].v]);
        } else if (this.type[i] == "saisie") {
          this.answers.push([this.quiz[i].c[4].v, "", "", ""]);
        } else if (this.type[i] == "lieu" || this.type[i] == "anecdote") {
          this.answers.push([""]);
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
      console.log("this.style");
      console.log(this.type[this.pos]);
      if (this.type[this.pos] == "multiple") this.clean();
      if (step == -1) {
        this.pos = Math.max(this.pos - 1, 0);
      } else this.pos += step;
      this.max = Math.max(this.pos, this.max);

      localStorage.setItem("pos-" + this.$route.params.id, this.max == this.length ? 0 : this.pos);
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
      console.log("this.pos");
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
    verifSaisie() {
      const ans = this.answers[this.pos][0];
      const ans_value = document.getElementById(this.id + "-" + this.pos + "-" + 0).value;

      console.log(ans_value);
      if (ans.includes(ans_value)) {
        this.changeCard(1);
      }

      /* if (answer == 0) {
        this.clean();
        this.changeCard(1);
      } else {
        let rep = document.getElementById(this.id + "-" + this.pos + "-" + answer);

        rep.style.color = "white";
        rep.style.backgroundColor = "#df3663";
      } */
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
