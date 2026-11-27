import MapView from "./views/MapView.vue";

export default [
  { path: "/map", name: "map", component: MapView, meta: { navigationId: "map" } },
  { path: "/map/:id", name: "map-slider", component: MapView, meta: { navigationId: "map" } },
  { path: "/navigate/:id", name: "navigate", component: MapView, meta: { navigationId: "map" } },
];
