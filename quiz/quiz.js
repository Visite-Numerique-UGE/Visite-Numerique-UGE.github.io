async function getData(type) {
    let SHEET_ID = "1BM7ceJ2MygR80jV8AyIZ1sQQ5EeNJ1QT-O3OvNw-rsI";
    let SHEET_TITLE = type == 1 ? "parcours" : "quiz";
    let SHEET_RANGE = type == 1 ? "A:I" : "A:H";

    let FULL_URL = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?sheet=" + SHEET_TITLE + "&range=" + SHEET_RANGE;

    let data = await fetch(FULL_URL)
        .then((res) => res.text())
        .then((rep) => {
            let _data = JSON.parse(rep.substring(47).slice(0, -2));


            //console.log(_data.table.rows);

            //player_Name_title.innerHTML = data.table.rows[0].c[0].v;

            //return test[0].c[2].v
            return _data.table.rows
        })
        .catch(error => {
            console.error(error);
            return error
        });
    //console.log(data);

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
        console.log("---------------ON RENTRE DANS GET FIELD---------------")
        let parcours = data.filter((row) => row.c[0].v == id)
        console.log("* PARCOUUUUURS *")
        console.log(parcours[step].c[field].v);
        console.log("STEP")
        console.log(step)
        console.log("------------")
        console.log("ID : ")
        console.log(id)
        console.log("STEP : ")
        console.log(step)
        console.log("FIELD : ")
        console.log(field)
        if (field == 3) {
            console.log("------------type------------")
            console.log(parcours[step].c[field].v)
            console.log("------------type------------")
        }

        console.log("---------------ON SORT DE GET FIELD---------------")
        return parcours[step].c[field].v
    })
}

async function andMore(data, id, step) {
    return data.then((data) => {
        let parcours = data.filter((row) => row.c[0].v == id)
        console.log("-----FIN-----")
        if (parcours.length == (step + 1)) {
            console.log("ooui")
        }
        else { console.log("non") }
        console.log("-----FIN-----")
        return parcours.length == (step + 1)
    })

}

async function nbQuestion(data, id) {
    return data.then((data) => {
        let parcours = data.filter((row) => row.c[0].v == id)
        console.log("-----FIN-----")
        return parcours.length
    })

}

async function verification(res, data, id, step) {
    console.log("---------------ON RENTRE DANS VERIF---------------")
    let rep = await getFieldData(data, id, step, 4)
    console.log("-----------type-----------")
    console.log(typeof res)
    String.upper

    if (typeof res === typeof "res") {
        console.log("---------------ON SORT DE VERIF STRING---------------")
        return res.toUpperCase() == rep.toUpperCase()
    }
    return res.then((res) => {
        console.log("-----------getfield-----------")
        console.log(rep)
        console.log("-----------RES-----------")
        console.log(res)
        if (res === rep) console.log("C'EST BON")
        else console.log("PAS BOON")
        console.log("---------------ON SORT DE VERIF PROMISE---------------")
        return res.toUpperCase() === rep.toUpperCase()

    })

}




let rand_help1 = [1, 2, 3, 4]
async function randomAnswer(data, id, step, i, rand = false) {
    console.log("---------------ON RENTRE DANS RANDOM---------------")
    console.log(i)
    if (i == -1) {
        console.log("oupsi pas ici")
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
        console.log("ON SHUFFLE")
    }


    console.log("---------------ON SORT DE RANDOM---------------")
    return await getFieldData(data, id, step, 3 + rand_help1[i - 1])
}


