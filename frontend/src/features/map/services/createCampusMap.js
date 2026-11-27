import L from "leaflet";
import { CARTO_API_KEY } from "../config/mapServices.js";

const CAMPUS_CENTER = [48.839623875988806, 2.588503717609941];
const CAMPUS_BOUNDS = [
  [48.836, 2.572],
  [48.844, 2.595],
];

export function createCampusMap(containerId) {
  const map = L.map(containerId, { zoomControl: false }).setView(CAMPUS_CENTER, 17);
  const bounds = L.latLngBounds(...CAMPUS_BOUNDS.map((point) => L.latLng(point)));

  const apiKeyQuery = CARTO_API_KEY ? `?key=${encodeURIComponent(CARTO_API_KEY)}` : "";
  L.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png${apiKeyQuery}`, {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    minZoom: 16,
    maxZoom: 18,
  }).addTo(map);

  map.setMaxBounds(bounds);
  map.on("drag", () => {
    if (!bounds.contains(map.getBounds())) {
      map.panInsideBounds(bounds, { animate: false });
    }
  });

  return map;
}
