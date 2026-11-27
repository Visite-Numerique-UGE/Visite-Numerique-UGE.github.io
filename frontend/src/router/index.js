import { createRouter, createWebHashHistory } from "vue-router";

const featureRoutes = import.meta.glob("../features/*/routes.js", {
  eager: true,
  import: "default",
});

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: Object.values(featureRoutes).flat(),
});

export default router;
