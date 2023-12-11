import * as _data_ from "./data.js"
let quiz;
quiz = getDataQuiz();
let rand_help1 = [1, 2, 3, 4]
let actual_quiz = -1;

function getQuiz() {
    console.log("GET QUIZ")
    console.log(_data_.isEmpty_localStorage("actual_quiz"))

    return _data_.isEmpty_localStorage("actual_quiz")
}

async function getDataQuiz() {
    let SHEET_ID = "1ENhL6EfZIEraeUmJafmKlN-FIYWMvw920LFmcIa5Hp8";
    let SHEET_TITLE = "quiz";
    let SHEET_RANGE = "A:H";

    let FULL_URL = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?sheet=" + SHEET_TITLE + "&range=" + SHEET_RANGE;

    return await fetch(FULL_URL)
        .then((res) => res.text())
        .then((rep) => {
            let _data = JSON.parse(rep.substring(47).slice(0, -2));
            _data.table.rows.shift();
            return _data.table.rows
        })
        .catch(error => {
            console.error(error);
            return error
        });
}





async function andMore(id, step) {
    return (await nbQuestion(id)) == (step + 1)
}

async function nbQuestion(id) {
    let parcours = await quiz.then((_quiz) => {
        return _quiz.filter((row) => row.c[0].v == id)
    })
    return parcours.length
}

async function verification(res, id, step) {
    let rep = await _data_.getField(1, id, step, 4)
    if (typeof res === typeof "res") {
        return res.toUpperCase() == rep.toUpperCase()
    }
    return res.then((_res) => {
        return _res.toUpperCase() === rep.toUpperCase()

    })


}

async function randomAnswer(id, step, i, rand = false) {
    if (i == -1) {
        return " "
    }
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };
    if (rand && i == 1) {
        rand_help1 = shuffle(rand_help1);
    }
    return await _data_.getField(1, id, step, 3 + rand_help1[i - 1])
}

function question() {

    let question = document.getElementById('question');
    let _html = `<div id="progressbar">
                      <div :style="`+ "`" + `width: \${ (step + 1) * 100 / await quizFun.nbQuestion(id_parcours) }%;` + "`" + `"></div>
                    </div >
<template x-if="await dataFun.getField(1,id_parcours, step, 3)=='lieu' ">
                      <h2 x-data="{ message: 'Lieu' }" x-text="message"></h2>
</template>

<template x-if="await dataFun.getField(1,id_parcours, step, 3)=='multiple' || await dataFun.getField(1,id_parcours, step, 3)=='saisie' " >
                      <h2 x-data="{ message: 'Question' }" x-text="message"></h2>
</template>

 <h3 x-text="await dataFun.getField(1, id_parcours, step, 2)"></h3>`

    question.innerHTML = _html
}

function answer() {

    let question = document.getElementById('answer');
    let _html = `<!-- ANSWER -->
                  <!-- CAS CHOIX MULTIPLE-->
                  <div class="answerblock center">
                    <template x-if="await dataFun.getField(1,id_parcours, step, 3)=='multiple'">
                      <template x-for="i in 4">
                        <div class="button-borders">
                          <button
                            x-text="await quizFun.randomAnswer(id_parcours, step, (await dataFun.getField(1,id_parcours, step, 3)=='multiple') ? i : -1, true)"
                            @click="if(await quizFun.verification(quizFun.randomAnswer(id_parcours, step, (await dataFun.getField(1,id_parcours, step, 3)=='multiple') ? i : -1),  id_parcours, step)) (await quizFun.andMore(id_parcours, step)) ? (count=0, window.location.replace('index.html')):count++"
                          ></button>
                        </div>
                      </template>
                    </template>

                    <!-- CAS SAISIE -->
                    <template x-if="await dataFun.getField(1,id_parcours, step, 3)=='saisie'  ">
                      <div x-data="{ res: '' }">
                        <input type="text" x-model="res" />
                        <br /><br />
                        <button
                          @click="if(await quizFun.verification(res,  id_parcours, step)) (await quizFun.andMore(id_parcours, step)) ? (count=0, window.location.replace('index.html')):count++">
                          Valider
                        </button>
                      </div>
                    </template>
                    <template x-if="await dataFun.getField(1,id_parcours, step, 3)=='lieu' ">
                      <button @click="await quizFun.andMore(id_parcours, step) ? (count=0, window.location.replace('index.html')):count++">
                        J'y suis
                      </button>
                    </template>
                  </div>
                  <br />

                  <!-- FIN ANSWER-->`

    question.innerHTML = _html

}

export {
    quiz,
    getQuiz,
    getDataQuiz,
    andMore,
    nbQuestion,
    verification,
    randomAnswer, question, answer

}