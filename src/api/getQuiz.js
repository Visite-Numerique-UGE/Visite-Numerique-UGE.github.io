let quiz;
quiz = getDataQuiz();
let rand_help1 = [1, 2, 3, 4]
let actual_quiz = -1;

function getQuiz() {
    console.log("GET QUIZ")
    console.log(isEmpty_localStorage("actual_quiz"))

    return isEmpty_localStorage("actual_quiz")
}

async function getDataQuiz() {
    let SHEET_ID = "1ENhL6EfZIEraeUmJafmKlN-FIYWMvw920LFmcIa5Hp8";
    let SHEET_TITLE = "quiz";
    let SHEET_RANGE = "A:I";

    let FULL_URL = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?sheet=" + SHEET_TITLE + "&range=" + SHEET_RANGE;

    return await fetch(FULL_URL)
        .then((res) => res.text())
        .then((rep) => {
            let _data = JSON.parse(rep.substring(47).slice(0, -2));
            /* _data.table.rows.shift(); */
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
    let rep = await getField(1, id, step, 4)
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
    return await getField(1, id, step, 3 + rand_help1[i - 1])
}

export {
    quiz
}