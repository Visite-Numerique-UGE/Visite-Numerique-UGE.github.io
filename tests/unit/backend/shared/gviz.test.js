import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { buildGvizUrl, fetchGvizRows, parseGvizResponse } from "../../../../backend/shared/data/gviz.js";

describe("buildGvizUrl", () => {
  it("encodes sheet names and ranges", () => {
    const url = new URL(buildGvizUrl("Quiz et lieux", "A:I", "sheet-id"));

    assert.equal(url.searchParams.get("sheet"), "Quiz et lieux");
    assert.equal(url.searchParams.get("range"), "A:I");
    assert.equal(url.pathname, "/spreadsheets/d/sheet-id/gviz/tq");
  });
});

describe("parseGvizResponse", () => {
  it("returns rows from the GViz wrapper", () => {
    const rows = [{ c: [{ v: "place-1" }] }];

    assert.deepEqual(parseGvizResponse(`google.visualization.Query.setResponse(${JSON.stringify({ table: { rows } })});`), rows);
  });

  it("rejects malformed or incomplete responses", () => {
    assert.throws(() => parseGvizResponse("not a GViz response"), /enveloppe GViz introuvable/);
    assert.throws(() => parseGvizResponse("google.visualization.Query.setResponse({bad});"), /JSON illisible/);
    assert.throws(() => parseGvizResponse("google.visualization.Query.setResponse({});"), /lignes absentes/);
  });
});

describe("fetchGvizRows", () => {
  it("returns rows from a successful response", async () => {
    const rows = [{ c: [{ v: "place-1" }] }];
    const fetchImpl = async () => ({
      ok: true,
      text: async () => `google.visualization.Query.setResponse(${JSON.stringify({ table: { rows } })});`,
    });

    assert.deepEqual(await fetchGvizRows("/sheet", fetchImpl), rows);
  });

  it("rejects unsuccessful HTTP responses", async () => {
    let requestCount = 0;
    const fetchImpl = async () => {
      requestCount += 1;
      return { ok: false, status: 503 };
    };

    await assert.rejects(fetchGvizRows("/sheet", fetchImpl), /HTTP 503/);
    assert.equal(requestCount, 1);
  });
});