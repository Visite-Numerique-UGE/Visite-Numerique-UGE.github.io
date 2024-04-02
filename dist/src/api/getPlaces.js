import { SHEET_ID, PLACE } from "@/constants";

const getPlaces = async () => {
    try {
        let SHEET_RANGE = "A:G";
        let FULL_URL = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?sheet=" + PLACE + "&range=" + SHEET_RANGE;
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

export { getPlaces };