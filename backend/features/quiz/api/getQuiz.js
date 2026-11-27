import { buildGvizUrl, fetchGvizRows } from "@backend/shared/data/gviz.js";
import { mapGvizRows } from "@backend/shared/data/mapGvizRows.js";
import { questionSchema } from "../data/questionSchema.js";

let quizRequest;

export function getQuiz() {
  if (!quizRequest) {
    quizRequest = fetchGvizRows(buildGvizUrl("quiz", "A:I")).then((rows) => mapGvizRows(rows, questionSchema));
  }

  return quizRequest;
}