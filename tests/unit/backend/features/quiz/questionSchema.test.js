import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { mapGvizRow } from "../../../../../backend/shared/data/mapGvizRows.js";
import { questionSchema } from "../../../../../backend/features/quiz/data/questionSchema.js";

describe("quiz question schema", () => {
  it("maps answers according to the question type", () => {
    const makeRow = (type) => ({
      c: [{ v: 12 }, null, { v: "Question" }, { v: type }, { v: "A" }, { v: "B" }, { v: "C" }, { v: "D" }, { v: "place-1" }],
    });

    assert.deepEqual(mapGvizRow(makeRow("multiple"), questionSchema).answers, ["A", "B", "C", "D"]);
    assert.deepEqual(mapGvizRow(makeRow("saisie"), questionSchema).answers, ["A", "", "", ""]);
    assert.equal(mapGvizRow(makeRow("lieu"), questionSchema).answers, "place-1");
    assert.deepEqual(mapGvizRow(makeRow("anecdote"), questionSchema).answers, [" ", " ", " ", " "]);
  });
});
