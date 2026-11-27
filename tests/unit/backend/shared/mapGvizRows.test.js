import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { getGvizCell, mapGvizRow, mapGvizRows } from "../../../../backend/shared/data/mapGvizRows.js";

describe("Generic Google Sheets row mapper", () => {
  it("maps columns using a reusable schema", () => {
    const schema = {
      id: { column: 0, transform: String },
      title: 1,
      count: { column: 2, transform: Number },
    };
    const row = { c: [{ v: 12 }, { v: "Campus" }, { v: "3" }] };

    assert.deepEqual(mapGvizRow(row, schema), { id: "12", title: "Campus", count: 3 });
  });

  it("supports fallbacks and derived values", () => {
    const schema = {
      title: { column: 0, fallback: "Sans titre" },
      location: { transform: (_value, row, readCell) => `${readCell(row, 1)}, ${readCell(row, 2)}` },
    };
    const row = { c: [null, { v: "48.8" }, { v: "2.5" }] };

    assert.deepEqual(mapGvizRow(row, schema), { title: "Sans titre", location: "48.8, 2.5" });
    assert.equal(getGvizCell(row, 9), "");
  });

  it("maps collections without feature-specific behavior", () => {
    const rows = [{ c: [{ v: "one" }] }, { c: [{ v: "two" }] }];

    assert.deepEqual(mapGvizRows(rows, { id: 0 }), [{ id: "one" }, { id: "two" }]);
  });
});