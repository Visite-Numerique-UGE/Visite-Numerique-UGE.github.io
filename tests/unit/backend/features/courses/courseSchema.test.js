import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { mapGvizRow } from "../../../../../backend/shared/data/mapGvizRows.js";
import { courseSchema } from "../../../../../backend/features/courses/data/courseSchema.js";

describe("course schema", () => {
  it("maps course fields and publication state", () => {
    const row = { c: [{ v: 12 }, { v: "Campus" }, { v: "Description" }, { v: "Culture" }, { v: "Bibliothèque" }, { v: "1" }, { v: "/course.jpg" }] };
    const course = mapGvizRow(row, courseSchema);

    assert.deepEqual(course, {
      id: "12",
      name: "Campus",
      description: "Description",
      tag: "Culture",
      place: "Bibliothèque",
      isPublished: true,
      image: "/course.jpg",
    });
  });
});
