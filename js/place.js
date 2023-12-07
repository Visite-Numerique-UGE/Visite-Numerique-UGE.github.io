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
                console.log(place.c[5]);

                // var myIcon = L.icon({
                //     //marker rond avec image
                //     iconUrl: place.c[6].v,
                //     iconSize: [10, 10],
                //     iconAnchor: [22, 94],
                //     popupAnchor: [-3, -76],
                //     shadowUrl: 'my-icon-shadow.png',
                //     shadowSize: [68, 95],
                //     shadowAnchor: [22, 94]
                // });
                
                L.marker([place.c[5].v, place.c[4].v]).addTo(map);
                var imageUrl = 'y-icon-shadow.png'; // Remplacez par le lien vers votre image
                var imageBounds = [[51.49, -0.1], [51.51, -0.08]]; // Ajustez les coordonnées de la boîte englobante selon vos besoins
                // Utiliser le plugin DistortableImage pour afficher l'image dans le marqueur
                var distortedImage = L.distortableImageOverlay(imageUrl, { bounds: imageBounds, interactive: true }).addTo(marker);
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