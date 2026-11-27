import { SHEET_ID } from "../config/sheets.js";

export function buildGvizUrl(sheetName, range, spreadsheetId = SHEET_ID) {
  const params = new URLSearchParams({ sheet: sheetName, range });
  return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/gviz/tq?${params}`;
}

export function parseGvizResponse(responseText) {
  const jsonStart = responseText.indexOf("(");
  const jsonEnd = responseText.lastIndexOf(")");

  if (jsonStart === -1 || jsonEnd <= jsonStart) {
    throw new Error("Réponse Google Sheets invalide : enveloppe GViz introuvable.");
  }

  let payload;
  try {
    payload = JSON.parse(responseText.slice(jsonStart + 1, jsonEnd));
  } catch {
    throw new Error("Réponse Google Sheets invalide : JSON illisible.");
  }

  if (!Array.isArray(payload?.table?.rows)) {
    throw new Error("Réponse Google Sheets invalide : lignes absentes.");
  }

  return payload.table.rows;
}

export async function fetchGvizRows(url, fetchImpl = fetch) {
  const response = await fetchImpl(url);
  if (!response.ok) {
    throw new Error(`Erreur Google Sheets : HTTP ${response.status}.`);
  }

  return parseGvizResponse(await response.text());
}