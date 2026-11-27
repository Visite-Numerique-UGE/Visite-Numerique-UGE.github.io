import EventView from "./views/EventView.vue";

export default [
  { path: "/event/", name: "event-list", component: EventView, meta: { navigationId: "events" } },
  { path: "/event/:id", name: "event", component: EventView, meta: { navigationId: "events" } },
];
