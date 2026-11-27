import { PARCOURS } from "@backend/shared/config/sheets.js";
import { buildGvizUrl, fetchGvizRows } from "@backend/shared/data/gviz.js";
import { mapGvizRows } from "@backend/shared/data/mapGvizRows.js";
import { courseSchema } from "../data/courseSchema.js";

export const getCourses = async () => {
  const rows = await fetchGvizRows(buildGvizUrl(PARCOURS, "A:G"));
  return mapGvizRows(rows, courseSchema)
    .filter((course) => course.isPublished)
    .map(({ isPublished, ...course }) => course);
};