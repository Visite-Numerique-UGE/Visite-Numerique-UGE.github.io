<script setup>
import { getQuiz } from "@backend/features/quiz/index.js";

import Map from "./QuizPlaceMap.vue";
</script>

<template>
  <div class="container">
    <div class="game" v-if="pos < length">
      <!-- AVANCEE-->
      <div class="center">
        <div class="name">
          <p>{{ pos + 1 }} / {{ length }}</p>
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
        <div class="column answer" :class="{ incorrect: incorrectAnswers.includes(answers_order[pos][0]) }" @click="verif(answers_order[pos][0])">
          <div>{{ answers[pos][answers_order[pos][0]] }}</div>
        </div>
        <div class="column answer" :class="{ incorrect: incorrectAnswers.includes(answers_order[pos][1]) }" @click="verif(answers_order[pos][1])">
          <div>{{ answers[pos][answers_order[pos][1]] }}</div>
        </div>
        <div class="column answer" :class="{ incorrect: incorrectAnswers.includes(answers_order[pos][2]) }" @click="verif(answers_order[pos][2])">
          <div>{{ answers[pos][answers_order[pos][2]] }}</div>
        </div>
        <div class="column answer" :class="{ incorrect: incorrectAnswers.includes(answers_order[pos][3]) }" @click="verif(answers_order[pos][3])">
          <div>{{ answers[pos][answers_order[pos][3]] }}</div>
        </div>
      </div>
      <!-- SAISIE-->
      <div class="saisie" v-if="type[pos] == 'saisie'">
        <div class="center _saisie">
          <input v-model="answerInput" placeholder="saisissez votre réponse.." type="text" aria-label="Votre réponse" />
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
    <div v-if="pos < length" class="column" id="home_arrow">
      <div class="pad">
        <div class="home_arrow bottom">
          <button class="arrow left_arr" type="button" aria-label="Question précédente" :disabled="leftDisabled" @click="changeCard(-1)"></button>
          <button class="arrow right_arr" type="button" aria-label="Question suivante" :disabled="rightDisabled" @click="changeCard(1)"></button>
        </div>
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
.answer.incorrect {
  color: white;
  background-color: #df3663;
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
      incorrectAnswers: [],
      answerInput: "",
    };
  },
  async created() {
    localStorage.setItem("pos-" + this.$route.params.id, this.pos);
    localStorage.setItem("max-" + this.$route.params.id, this.max);
    this.quiz = await getQuiz();
    this.quiz = this.filter();
    this.length = this.quiz.length;
    this.getQuestion();
    localStorage.setItem("type-" + this.$route.params.id, JSON.stringify(this.type));
    localStorage.setItem("answers-" + this.$route.params.id, JSON.stringify(this.answers));
  },
  computed: {
    leftDisabled() {
      return this.pos === 0;
    },
    rightDisabled() {
      const type = this.type[this.pos];
      return !(type === "lieu" || type === "anecdote" || this.max > this.pos);
    },
  },
  methods: {
    filter() {
      return this.quiz.filter((question) => question.courseId == this.id);
    },
    getQuestion() {
      for (let i = 0; i < this.quiz.length; i++) {
        const quizQuestion = this.quiz[i];
        this.type.push(quizQuestion.type);
        this.question.push(quizQuestion.question);
        this.answers.push(quizQuestion.answers);

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
      if (step == -1) {
        this.pos = Math.max(this.pos - 1, 0);
      } else this.pos += step;
      this.max = Math.max(this.pos, this.max);

      localStorage.setItem("pos-" + this.$route.params.id, this.pos == this.length ? 0 : this.pos);
      localStorage.setItem("max-" + this.$route.params.id, this.max);

      this.incorrectAnswers = [];
      this.answerInput = "";
    },
    verif(answer) {
      if (answer == 0) {
        this.changeCard(1);
      } else if (!this.incorrectAnswers.includes(answer)) {
        this.incorrectAnswers.push(answer);
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
      const ans_value = this.answerInput.toLowerCase();

      if (ans_value && this.similarity(ans, ans_value) > 0.7) {
        this.changeCard(1);
      }
    },
  },
};
</script>
