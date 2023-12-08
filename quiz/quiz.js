async function getData(type) {
    let SHEET_ID = "1BM7ceJ2MygR80jV8AyIZ1sQQ5EeNJ1QT-O3OvNw-rsI";
    let SHEET_TITLE = type == 1 ? "parcours" : "quiz";
    let SHEET_RANGE = type == 1 ? "A:I" : "A:H";

    let FULL_URL = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?sheet=" + SHEET_TITLE + "&range=" + SHEET_RANGE;

    let data = await fetch(FULL_URL)
        .then((res) => res.text())
        .then((rep) => {
            let _data = JSON.parse(rep.substring(47).slice(0, -2));
            return _data.table.rows
        })
        .catch(error => {
            console.error(error);
            return error
        });
    return await data
}

async function getFieldData(data, id, step, field) {
    /* Questions
    - 0 : id
    - 1 : step
    - 2 : questions
    - 3 : type
    - 4 : right_answer
    - 5 : answer_opt2
    - 6 : answer_opt3
    - 7 : answer_opt4
    */
    return data.then((data) => {
        let parcours = data.filter((row) => row.c[0].v == id)
        save(id, step);
        return parcours[step].c[field].v
    })
}

async function andMore(data, id, step) {
    return data.then((data) => {
        let parcours = data.filter((row) => row.c[0].v == id)
        return parcours.length == (step + 1)
    })

}

async function nbQuestion(data, id) {
    return data.then((data) => {
        let parcours = data.filter((row) => row.c[0].v == id)
        return parcours.length
    })

}

async function verification(res, data, id, step) {
    let rep = await getFieldData(data, id, step, 4)
    String.upper

    if (typeof res === typeof "res") {
        return res.toUpperCase() == rep.toUpperCase()
    }
    return res.then((res) => {
        return res.toUpperCase() === rep.toUpperCase()

    })
}

let rand_help1 = [1, 2, 3, 4]
async function randomAnswer(data, id, step, i, rand = false) {
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
    return await getFieldData(data, id, step, 3 + rand_help1[i - 1])
}


function save(id, step) {
    localStorage.setItem(id, JSON.stringify({'step' : step}));
    console.log(localStorage);
}



function isEmpty_localStorage(id) {
    if (localStorage.getItem(id) == null) {
        return 0;
    }
    else return JSON.parse(localStorage.getItem(id)).step;
}
