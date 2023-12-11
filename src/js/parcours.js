var parcours_liste = [];

parcours_liste = getDataParcours();

async function getDataParcours() {
    let SHEET_ID = "1ENhL6EfZIEraeUmJafmKlN-FIYWMvw920LFmcIa5Hp8";
    let SHEET_TITLE = "parcours";
    let SHEET_RANGE = "A:I";

    let FULL_URL = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?sheet=" + SHEET_TITLE + "&range=" + SHEET_RANGE;

    await fetch(FULL_URL)
        .then((res) => res.text())
        .then((rep) => {
            let _data = JSON.parse(rep.substring(47).slice(0, -2));

            parcours_liste = _data.table.rows
        })
        .catch(error => {
            console.error(error);
            return error
        });
}

