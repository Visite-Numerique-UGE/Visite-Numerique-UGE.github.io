async function getData() {
    let SHEET_ID = "1BM7ceJ2MygR80jV8AyIZ1sQQ5EeNJ1QT-O3OvNw-rsI";
    let SHEET_TITLE = "place";
    let SHEET_RANGE = "A:G";
    let FULL_URL = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?sheet=" + SHEET_TITLE + "&range=" + SHEET_RANGE;
    await fetch(FULL_URL)
        .then((res) => res.text())
        .then((rep) => {
            let _data = JSON.parse(rep.substring(47).slice(0, -2));
            _data.table.rows.shift();
            console.log(_data.table.rows);
            places = _data.table.rows;
            places.forEach((place) => {
                var customIcon = L.divIcon({
                    className: place.c[0].v,
                    html: "<div class='marker-background'></div><img class='marker-image' src='" + place.c[6].v + "' alt='Image'>",
                    iconSize: [50, 50],
                    iconAnchor: [15, 30],
                    popupAnchor: [0, -30]
                  });
                  // Ajouter le marqueur avec l'icône personnalisée
                  L.marker([place.c[5].v, place.c[4].v], { icon: customIcon }).addTo(map);
                // L.marker([place.c[5].v, place.c[4].v], {icon: myIcon})
                // .bindPopup(
                //     "<img src='"+place.c[6].v+"' width='100px' height='100px'><br>"+"<b>" +
                //     place.c[0].v+"</b>"
                // )
                // .addTo(map);
            });
        })
        .catch(error => {
            console.error(error);
            return error
        });
}