var parcours_liste = [];

async function getDataP() {
    let SHEET_ID = "1BM7ceJ2MygR80jV8AyIZ1sQQ5EeNJ1QT-O3OvNw-rsI";
    let SHEET_TITLE = "parcours_liste";
    let SHEET_RANGE = "A:I";
    let FULL_URL = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?sheet=" + SHEET_TITLE + "&range=" + SHEET_RANGE;
    await fetch(FULL_URL)
        .then((res) => res.text())
        .then((rep) => {
            let _data = JSON.parse(rep.substring(47).slice(0, -2));
            _data.table.rows.shift();
            parcours_liste = _data.table.rows;
            console.log(parcours_liste)
            /* 
            parcours_liste.forEach((parcours) => {
                var customIcon = L.divIcon({
                    className: parcours.c[0].v,
                    id: parcours.c[0].v,
                    html: "<button id = '" + parcours.c[0].v + "'class='marker-background'><img id = '" + parcours.c[0].v + "'class='marker-image' src='" + parcours.c[6].v + "' alt='Image''></div>",
                    
                });
            });*/
        })
        .catch(error => {
            console.error(error);
            return error
        });
}

getDataP()