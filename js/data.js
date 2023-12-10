async function getField(sheet, id, step, field) {
    /*
    - 0 : Parcours
    - 1 : Questions
    - 2 : Place
    */
    //_quiz.filter((row) => row.c[0].v == id)
    var filterAsync = async function (tab) {
        return tab.then((_tab) => {
            return _tab.filter((row) => row.c[0].v == id)
        })
    }
    let data = sheet == 0 ? await filterAsync(parcours_liste) : sheet == 1 ? await filterAsync(quiz) : await filterAsync(places)

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

    /* Parcours
    - 0 : id
    - 1 : name
    - 2 : desc
    - 3 : tag
    - 4 : place_0
    - 5 : place_1
    - 6 : place_2
    - 7 : place_3
    - 8 : place_4
    */

    /* Place
    - 0 : id
    - 1 : name
    - 2 : desc
    - 3 : tag
    - 4 : long
    - 5 : lat
    - 6 : img
    */
    save(id, step);

    return data[step].c[field].v


}


function save(id, step) {
    localStorage.setItem(id, JSON.stringify({ 'step': step }));
}



function isEmpty_localStorage(id) {
    if (localStorage.getItem(id) == null) {
        return 0;
    }
    return JSON.parse(localStorage.getItem(id)).step;
}