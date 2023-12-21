import * as _data_ from "./data.js";
let quiz;
quiz = getDataQuiz();
let rand_help1 = [1, 2, 3, 4];
let actual_quiz = -1;

function getQuiz() {
  return _data_.isEmpty_localStorage("actual_quiz");
}

async function getDataQuiz() {
  let SHEET_ID = "1ENhL6EfZIEraeUmJafmKlN-FIYWMvw920LFmcIa5Hp8";
  let SHEET_TITLE = "quiz";
  let SHEET_RANGE = "A:H";

  let FULL_URL =
    "https://docs.google.com/spreadsheets/d/" +
    SHEET_ID +
    "/gviz/tq?sheet=" +
    SHEET_TITLE +
    "&range=" +
    SHEET_RANGE;

  return await fetch(FULL_URL)
    .then((res) => res.text())
    .then((rep) => {
      let _data = JSON.parse(rep.substring(47).slice(0, -2));
      return _data.table.rows;
    })
    .catch((error) => {
      console.error(error);
      return error;
    });
}

async function andMore(id, step) {
  return (await nbQuestion(id)) == step + 1;
}

async function nbQuestion(id) {
  let parcours = await quiz.then((_quiz) => {
    return _quiz.filter((row) => row.c[0].v == id);
  });
  return parcours.length;
}

async function verification(res, id, step) {
  let rep = await _data_.getField(1, id, step, 4);
  if (typeof res === typeof "res") {
    return res.toUpperCase() == rep.toUpperCase();
  }
  return res.then((_res) => {
    return _res.toUpperCase() === rep.toUpperCase();
  });
}

async function randomAnswer(id, step, i, rand = false) {
  if (i == -1) {
    return " ";
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
  return await _data_.getField(1, id, step, 3 + rand_help1[i - 1]);
}

function question(id_parcours, step, state) {
  let question = document.getElementById("question");
  question.innerHTML = "";
  if (state != 1) {
    return;
  }

  let hid = document.getElementsByClassName("hid");

  for (let item of hid) {
    item.style.display = "block";
  }

  _data_.save(id_parcours, step, true);
  let nb = nbQuestion(id_parcours);
  let progress = Math.max(_data_.isEmpty_localStorage(id_parcours, true), step);

  nb.then((nb) => {
    let button_progress = `<div class="progress">`;
    for (let i = 0; i < nb; i++) {
      let disabled = progress >= i ? "" : "disabled";
      button_progress +=
        `<button ` +
        disabled +
        ` id="progress" @click="(count=` +
        i +
        `, App().page(id_parcours, count, state) )">` +
        (i + 1) +
        ` </button>\n`;
    }
    button_progress += `</div>`;
    let _html =
      button_progress +
      `<div class="title-quiz">
<template x-if="await dataFun.getField(1,id_parcours, count, 3)=='lieu' ">
                      <h2 class="center" x-data="{ message: 'Lieu' }" x-text="message"></h2>
</template>

<template x-if="await dataFun.getField(1,id_parcours, count, 3)=='multiple' || await dataFun.getField(1,id_parcours, count, 3)=='saisie' " >
                      <h2 class="center" x-data="{ message: 'Question' }" x-text="message"></h2>
</template></div>

 <div class="question-quiz"> 
 <p class="center" x-text="await dataFun.getField(1, id_parcours, count, 2)"></p>
 
 </div>`;

    question.innerHTML = `<div class="questionblock">` + _html + `</div>`;
  });
}

function answer(id_parcours, step, state) {
  let answer = document.getElementById("answer");
  answer.innerHTML = "";
  if (state != 1) {
    return;
  }
  let type = "";
  _data_.getField(1, id_parcours, step, 3).then((field) => {
    if (field == "multiple") {
      type = `<!-- CAS CHOIX MULTIPLE-->
                  <template x-for="i in 4">
                        <div class="button-borders">
                          <button  class="answer-quiz" :id="$id('text-input')"
                            x-text="await quizFun.randomAnswer(id_parcours, count, (await dataFun.getField(1,id_parcours, count, 3)=='multiple') ? i : -1, true)"
                            @click="if(await quizFun.verification(quizFun.randomAnswer(id_parcours, count, (await dataFun.getField(1,id_parcours, count, 3)=='multiple') ? i : -1),  id_parcours, count))
                            ( (await quizFun.andMore(id_parcours, count) ? (count = 0, state = 2): count++) , App().page(id_parcours, count, state) )"
                          ></button>
                        </div>
                      </template >`;
    } else if (field == "saisie") {
      type = `<!-- CAS SAISIE -->
                      <div style="margin: 0.75rem;" x-data="{ res: '' }">
                        <input  type="text" x-model="res" />
                        <br /><br />
                        <button 
                          @click="if(await quizFun.verification(res,  id_parcours, count))
                          ( (await quizFun.andMore(id_parcours, count) ? (count = 0, state = 2): count++) , App().page(id_parcours, count, state) )">
                          Valider
                        </button>
                      </div>`;
    } else if (field == "lieu" || field == "anecdote") {
      let text = field == "lieu" ? "J'y suis" : " > "
      type = `<button style="
    margin: 0.75rem;" @click="( (await quizFun.andMore(id_parcours, count) ? (count = 0, state = 2): count++), console.log('count : ' +count) , App().page(id_parcours, count, state) )">
                        `+ text + `
                      </button>
                    </template `;
    }

    let _html =
      `<!-- ANSWER -->
                  
                  <div class="answerblock center">` +
      type +
      `</div>
                  <br />

                  <!-- FIN ANSWER-->`;

    answer.innerHTML = _html;
  });
}

function endPage(id_parcours, state) {
  let endPage = document.getElementById("endPage");
  endPage.innerHTML = "";
  endPage.style.visibility = "hidden"
  if (state != 2) {
    return;
  }

  endPage.style.visibility = "visible";

  let _html = `<div class="center"><h1>Bravo !</h1></div><br>
<div class="center">
<button @click="((count = 0, state = 0, id_parcours = quizFun.getQuiz() ) , App().page(id_parcours, count, state) )">Retourner sur la carte</button>
</div>`;

  endPage.innerHTML = _html;
}

//TODO: Déplacer dans map
function map(state) {
  let map = document.getElementById("map_");

  map.innerHTML = "";
  if (state != 0) {
    return;
  }
  let hid = document.getElementsByClassName("hid")
  for (let item of hid) {
    item.style.display = "none";
  }

  let _html = `<main>
<div id="map" x-data="App()">
  <div style='opacity:0;' x-html="data.map"></div>
 </div>

<div id="slider">



                      
  <div class="slider-content">
      <div class="card">
        <h2 id="slider-name"></h2>
        <img id="slider-img" src="" alt=""/>

        <button class="close" id="slider-close">&times;</button>
      </div>

        
      
      <div class="menu center">
            <button class="show" id="show-description"> Description </button>
            <button class="show" id="show-parcours"> Parcours </button>
            <button class="show" id="show-event"> Événements </button>
          <div id="slider-go-div"></div>
      </div>

      <div class="card-desc">
        <div id="slider-description" class="card-item show-description">une description vraiment au pif</div>
        
        
        <div id="slider-parcours-list" class="card-item show-parcours vertical-center">
          <div id="slider-parcours"></div>
          <div id="slider-parcours-second"></div>
        </div>


        <div id="slider-event" class="card-item show-event">Pas d'évènement</div>
      </div>
      

      
  </div>


</div>
</main>`;
  map.innerHTML = _html;
}

document.addEventListener('click', function (e) {

  if (e.target.className == 'answer-quiz') {
    let button = document.getElementById(e.target.id);
    button.style.backgroundColor = "rgb(210, 33, 60)";
    button.style.borderColor = "rgb(239, 125, 0)";
    console.log(e.target.id)
  }
}, false);


export {
  quiz,
  getQuiz,
  getDataQuiz,
  andMore,
  nbQuestion,
  verification,
  randomAnswer,
  question,
  answer,
  endPage,
  map,
  //setVisibility,
};
