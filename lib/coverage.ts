import { liveAreas, plannedAreas, plannedRegion } from "@/content/coverage";

export type LngLat = [number, number];
export type Status = "live" | "planned" | "unconfirmed";

export type Place = { name: string; context: string; position: LngLat };

export type Coverage = {
  status: Status;
  area?: string;
  nearest: { name: string; status: Exclude<Status, "unconfirmed">; km: number };
};

const knownAreas = [
  ...liveAreas.map((area) => ({ ...area, status: "live" as const })),
  ...plannedAreas.map((area) => ({ ...area, status: "planned" as const })),
];

export const areaPlaces = knownAreas.map((area) => ({
  name: area.name,
  context: area.detail,
  position: [area.position[1], area.position[0]] as LngLat,
  status: area.status,
}));

export function distanceKm([lng1, lat1]: LngLat, [lng2, lat2]: LngLat) {
  const rad = Math.PI / 180;
  const a = Math.sin(((lat2 - lat1) * rad) / 2) ** 2 + Math.cos(lat1 * rad) * Math.cos(lat2 * rad) * Math.sin(((lng2 - lng1) * rad) / 2) ** 2;
  return 12742 * Math.asin(Math.sqrt(a));
}

function inside([lng, lat]: LngLat, ring: [number, number][]) {
  let result = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [latI, lngI] = ring[i];
    const [latJ, lngJ] = ring[j];
    if (latI > lat !== latJ > lat && lng < ((lngJ - lngI) * (lat - latI)) / (latJ - latI) + lngI) result = !result;
  }
  return result;
}

export function inPlannedRegion(point: LngLat) {
  return inside(point, plannedRegion.outline) && !inside(point, plannedRegion.kampala);
}

export function coverageAt(place: Place): Coverage {
  const ranked = areaPlaces
    .map((area) => ({ ...area, km: distanceKm(place.position, area.position) }))
    .sort((a, b) => a.km - b.km);
  const nearest = { name: ranked[0].name, status: ranked[0].status, km: ranked[0].km };

  const named = ranked.find((area) => place.name.toLowerCase() === area.name.toLowerCase() && area.km < 2);
  if (named) return { status: named.status, area: named.name, nearest };
  if (inPlannedRegion(place.position)) return { status: "planned", area: plannedRegion.name, nearest };
  return { status: "unconfirmed", nearest };
}
