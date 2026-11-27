import L from "leaflet";
import { GRAPHHOPPER_API_KEY } from "../config/mapServices.js";

export function createWalkingRoute(start, destination) {
  if (!GRAPHHOPPER_API_KEY) {
    throw new Error("La clé GraphHopper manque : configure VITE_GRAPHHOPPER_API_KEY dans .env.local.");
  }

  return L.Routing.control({
    waypoints: [L.latLng(start), L.latLng(destination)],
    routeWhileDragging: false,
    alternativeRoutes: false,
    addWaypoints: false,
    draggableWaypoints: false,
    createMarker(index, waypoint, waypointCount) {
      return index === waypointCount - 1 ? null : L.marker(waypoint.latLng);
    },
    router: new L.Routing.GraphHopper(GRAPHHOPPER_API_KEY, {
      vehicle: "foot",
    }),
  });
}
