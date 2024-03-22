<script setup>
import * as Quiz from "@/api/getQuiz.js";
</script>

<template>
  <div class="container">
    <div class="center">
      <div class="name">
        <p>
          {{ pos + 1 }} / {{ length }} - <span id="type">{{ type[pos] }}</span>
        </p>
      </div>
    </div>
    <div class="column question" id="">
      <div class="desc">
        <div class="content-question">
          <div class="question">{{ question[pos] }}</div>
          <div class="multiple" v-if="type[pos] == 'multiple'">{{ answers[pos] }}</div>
        </div>

        <div class="home_arrow bottom"></div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped src="@/assets/quiz.scss"></style>
<style lang="scss" scoped>
.container {
  width: 100lvw;
  height: 100lvh;
  display: block;
}
.content-question {
}
.desc {
  text-align: center;
  width: 80%;
  height: fit-content;
  display: block;
}

.home_arrow {
  display: block;
  position: relative;
  bottom: 0px;
}
.column {
  display: block;
  height: fit-content;
  margin-top: 0px;
}
.question {
  display: block;
  position: relative;
}
.bottom {
  display: block;
  bottom: 0;
  right: 0; /* set the right to 0 */
}
</style>

<script>
export default {
  data() {
    return {
      quiz: [],
      pos: 0,
      max: 0,
      id: this.$route.params.id,
      length: 0,
      type: [],
      question: [],
      answer: [],
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

    const content = document.getElementById("type");

    content.addEventListener("DOMSubtreeModified", () => console.log("change"));
  },
  mounted() {},
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
      }
    },
    changeCard(step) {
      /*  document.getElementById("column-1").style.display = "none";
      document.getElementById("column-2").style.display = "none";
      document.getElementById("column-3").style.display = "none"; */

      if (step == -1) {
        this.pos = Math.max(this.pos - 1, 0);
      } else this.pos += 1;
      this.max = Math.max(this.pos, this.max);

      this.buttonDisable();
      /* const name = "column-" + this.card.at(this.pos);
      console.log(name);
      document.getElementById(name).style.display = "block"; */
    },

    buttonDisable() {
      console.log("here");
      let larrow = document.getElementById("left_arr");
      larrow.disabled = true;
      let rarrow = document.getElementById("right_arr");
      rarrow.disabled = true;
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
        that.changeCard(-1);
      });
      rarrow[i].addEventListener("click", function () {
        that.changeCard(1);
      });
    }

    /* */
  },
};
</script>
