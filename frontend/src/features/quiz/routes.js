import QuizView from "./views/QuizView.vue";

export default [{ path: "/quiz/:id", name: "quiz", component: QuizView, meta: { navigationId: "courses" } }];
