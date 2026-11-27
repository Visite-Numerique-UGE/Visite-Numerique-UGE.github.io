import { PLACE } from "@backend/shared/config/sheets.js";
import { buildGvizUrl, fetchGvizRows } from "@backend/shared/data/gviz.js";
import { mapGvizRows } from "@backend/shared/data/mapGvizRows.js";
import { placeSchema } from "../data/placeSchema.js";

const getPlaces = async () => {
  const rows = await fetchGvizRows(buildGvizUrl(PLACE, "A:G"));
  return mapGvizRows(rows.slice(1), placeSchema);
};

export { getPlaces };