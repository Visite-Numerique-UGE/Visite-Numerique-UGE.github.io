import { SHEET_ID, PARCOURS } from "@/constants";

const getParcours = async () => {
  try {
    let SHEET_RANGE = "A:G";
    let FULL_URL = "https://docs.google.com/spreadsheets/d/" + SHEET_ID + "/gviz/tq?sheet=" + PARCOURS + "&range=" + SHEET_RANGE;
    const response = await fetch(FULL_URL);
    const rep = await response.text();
    const _data = JSON.parse(rep.substring(47).slice(0, -2));
    /* console.log("data");
    console.log(_data.table.rows); */
    return _data.table.rows.filter(data => {
      console.log(data.c[5].v);
      return data.c[5].v == 1
    });
  } catch (error) {
    console.error(error);
    throw error
  }
};

export { getParcours };