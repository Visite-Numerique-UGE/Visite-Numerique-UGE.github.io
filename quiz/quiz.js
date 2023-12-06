async function getData(type) {
    let SHEET_ID = "1BM7ceJ2MygR80jV8AyIZ1sQQ5EeNJ1QT-O3OvNw-rsI";
    let SHEET_TITLE = type == 1 ? "parcours" : "quiz";
    let SHEET_RANGE = type == 1 ? "A:I" : "A:H";

    let FULL_URL = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?sheet=" + SHEET_TITLE + "&range=" + SHEET_RANGE;

    let data = await fetch(FULL_URL)
        .then((res) => res.text())
        .then((rep) => {
            let _data = JSON.parse(rep.substring(47).slice(0, -2));

            console.log(_data);

            //console.log(_data.table.rows);


            let length = _data.table.rows.length;

            //player_Name_title.innerHTML = data.table.rows[0].c[0].v;

            //return test[0].c[2].v
            return _data.table.rows
        })
        .catch(error => {
            console.error(error);
            return error
        });
    return await data
}

async function getFieldData(data, id, step, field) {
    console.log("PARCOURS 1 GET1");
    let parcours = data.filter((row) => row.c[0].v == id)
    console.log(parcours[step].c[field].v);
    /*
    - 0 : id
    - 1 : step
    - 2 : questions
    - 3 : type
    - 4 : right_answer
    - 5 : answer_opt2
    - 6 : answer_opt3
    - 7 : answer_opt4
    */
    //return _data.table.rows[nb].c[2].v
    return await parcours[step].c[field].v
}




async function getField(sheet, id, step, field) {
    console.log("parcours")
    console.log(id)
    if (sheet == 1) step = 0
    let all_data = await getData(sheet)
    return await getFieldData(all_data, id, step, field)

}




