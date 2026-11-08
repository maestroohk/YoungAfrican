"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import "leaflet/dist/leaflet.css";
import { liveAreas, plannedAreas, plannedRegion } from "@/content/coverage";

const views = {
  local: { label: "Kazo and nearby", center: [0.3635, 32.5522] as [number, number], zoom: 14 },
  region: { label: "All of Wakiso", center: [0.38, 32.45] as [number, number], zoom: 10 },
};

export function CoverageMap() {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<LeafletMap | null>(null);
  const [view, setView] = useState<keyof typeof views>("local");

  useEffect(() => {
    let cancelled = false;
    import("leaflet").then((L) => {
      if (cancelled || !container.current || map.current) return;
      const instance = L.map(container.current, { scrollWheelZoom: false, zoomControl: true }).setView(views.local.center, views.local.zoom);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(instance);

      L.polygon([plannedRegion.outline, plannedRegion.kampala], {
        color: "#c48a00",
        weight: 2,
        dashArray: "6 6",
        fillColor: "#ffc24d",
        fillOpacity: 0.25,
      })
        .bindTooltip("Wakiso District: coming soon", { sticky: true })
        .addTo(instance);

      const markers: ReturnType<typeof L.circleMarker>[] = [];
      for (const area of plannedAreas) {
        const marker = L.circleMarker(area.position, { radius: 10, color: "#3a2400", weight: 2, fillColor: "#ffc24d", fillOpacity: 1 })
          .bindTooltip(`${area.name} · Coming soon`, { permanent: true, direction: "right", offset: [12, 0] })
          .addTo(instance);
        markers.push(marker);
      }
      for (const area of liveAreas) {
        const marker = L.circleMarker(area.position, { radius: 13, color: "#ffffff", weight: 3, fillColor: "#2d3cff", fillOpacity: 1 })
          .bindTooltip(`${area.name} · Live now`, { permanent: true, direction: "bottom", offset: [0, 14], className: "font-semibold" })
          .addTo(instance);
        markers.push(marker);
      }
      const toggleLabels = () => markers.forEach((marker) => (instance.getZoom() >= 12 ? marker.openTooltip() : marker.closeTooltip()));
      instance.on("zoomend", toggleLabels);
      toggleLabels();
      map.current = instance;
    });
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
    };
  }, []);

  const show = (key: keyof typeof views) => {
    setView(key);
    const animate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    map.current?.setView(views[key].center, views[key].zoom, { animate });
  };

  return (
    <figure className="overflow-hidden rounded-[2rem] bg-white">
      <div role="group" aria-label="Map view" className="flex flex-wrap items-center justify-between gap-3 border-b border-line p-3 sm:p-4">
        <div className="flex gap-2">
          {(Object.keys(views) as (keyof typeof views)[]).map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={view === key}
              onClick={() => show(key)}
              className="min-h-11 rounded-full bg-paper px-4 text-sm font-semibold transition-colors hover:bg-ink/10 aria-pressed:bg-ink aria-pressed:text-white"
            >
              {views[key].label}
            </button>
          ))}
        </div>
        <ul className="flex flex-wrap gap-4 text-sm">
          <li className="flex items-center gap-2">
            <span aria-hidden className="size-3.5 rounded-full bg-blue ring-2 ring-white ring-offset-1 ring-offset-blue" />
            Live now
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden className="size-3.5 rounded-full bg-mango ring-2 ring-mango-ink" />
            Coming soon
          </li>
        </ul>
      </div>
      <div ref={container} role="region" aria-label="Map of Young African Internet coverage around Kazo, Lugoba, Nabweru and Wakiso District" className="relative isolate z-0 h-[24rem] bg-paper sm:h-[30rem]" />
    </figure>
  );
}
