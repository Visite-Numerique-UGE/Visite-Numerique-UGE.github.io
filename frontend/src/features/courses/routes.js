import CourseView from "./views/CourseView.vue";

export default [
  { path: "/parcours/", name: "parcours-list", component: CourseView, meta: { navigationId: "courses" } },
  { path: "/parcours/:id", name: "parcours", component: CourseView, meta: { navigationId: "courses" } },
];
