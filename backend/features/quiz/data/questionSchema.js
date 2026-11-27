export const questionSchema = {
  courseId: { column: 0, transform: String },
  question: 2,
  type: 3,
  answers: {
    transform: (_value, row, readCell) => {
      const type = readCell(row, 3);

      if (type === "multiple") return [4, 5, 6, 7].map((column) => readCell(row, column));
      if (type === "saisie") return [readCell(row, 4), "", "", ""];
      if (type === "lieu") return readCell(row, 8);
      if (type === "anecdote") return [" ", " ", " ", " "];
      return [];
    },
  },
};
