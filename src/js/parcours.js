export const parcours_liste = async () => {
  try {
    let SHEET_ID = "1ENhL6EfZIEraeUmJafmKlN-FIYWMvw920LFmcIa5Hp8";
    let SHEET_TITLE = "parcours";
    let SHEET_RANGE = "A:I";
    let FULL_URL = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?sheet=" + SHEET_TITLE + "&range=" + SHEET_RANGE;
    const response = await fetch(FULL_URL);
    const rep = await response.text();
    const _data = JSON.parse(rep.substring(47).slice(0, -2));
    _data.table.rows.shift();
    return _data.table.rows;
  } catch (error) {
    console.error(error);
    throw error
  }
};