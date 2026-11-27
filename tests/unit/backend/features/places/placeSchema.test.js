import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { mapGvizRow } from "../../../../../backend/shared/data/mapGvizRows.js";
import { placeSchema } from "../../../../../backend/features/places/data/placeSchema.js";

describe("place schema", () => {
  it("maps spreadsheet columns to the place model", () => {
    const row = { c: [{ v: "biblio" }, { v: "Bibliothèque" }, { v: "Description" }, null, { v: "2.5" }, { v: "48.8" }] };

    assert.deepEqual(mapGvizRow(row, placeSchema), {
      id: "biblio",
      name: "Bibliothèque",
      description: "Description",
      longitude: 2.5,
      latitude: 48.8,
      image: "biblio",
    });
  });
});
