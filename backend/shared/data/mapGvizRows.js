export function getGvizCell(row, column, fallback = "") {
  return row?.c?.[column]?.v ?? fallback;
}

export function mapGvizRow(row, schema) {
  return Object.fromEntries(
    Object.entries(schema).map(([field, definition]) => {
      const { column, fallback = "", transform = (value) => value } = typeof definition === "number" ? { column: definition } : definition;
      const value = column === undefined ? undefined : getGvizCell(row, column, fallback);
      return [field, transform(value, row, getGvizCell)];
    })
  );
}

export function mapGvizRows(rows, schema) {
  return rows.map((row) => mapGvizRow(row, schema));
}
