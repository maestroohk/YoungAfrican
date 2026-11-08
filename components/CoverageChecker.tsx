"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import type { Map as MapLibreMap, Marker } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { ArrowRight, LoaderCircle, LocateFixed, MapPin, RotateCcw, Search, X } from "lucide-react";
import { areaPlaces, coverageAt, distanceKm, type Coverage, type LngLat, type Place } from "@/lib/coverage";
import { plannedRegion } from "@/content/coverage";
import { ugx } from "@/content/site";

type Selection = { place: Place; coverage: Coverage; resolving?: boolean };
type Suggestion = Place & { id: string; known?: boolean };

const home = { center: [32.5525, 0.3635] as LngLat };
const homeBounds: [LngLat, LngLat] = [
  [Math.min(...areaPlaces.map((area) => area.position[0])), Math.min(...areaPlaces.map((area) => area.position[1]))],
  [Math.max(...areaPlaces.map((area) => area.position[0])), Math.max(...areaPlaces.map((area) => area.position[1]))],
];
const homeFit = { padding: { top: 110, bottom: 60, left: 50, right: 120 }, maxZoom: 14 };
const uganda = "29.5,-1.5,35.1,4.3";
const statusStyle = {
  live: { label: "Live now", dot: "bg-blue", badge: "bg-blue text-white" },
  planned: { label: "Coming soon", dot: "bg-mango ring-2 ring-mango-ink", badge: "bg-mango text-mango-ink" },
  unconfirmed: { label: "Not yet confirmed", dot: "bg-muted", badge: "bg-ink/10 text-ink" },
};

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function formatKm(km: number) {
  return km < 1 ? `${Math.round(km * 100) * 10} m` : `${km.toFixed(1)} km`;
}

function contextOf(properties: Record<string, string | undefined>) {
  return [properties.district, properties.city, properties.county, properties.state].filter((part, index, all) => part && all.indexOf(part) === index).join(", ");
}

async function photon(path: string, signal?: AbortSignal) {
  const response = await fetch(`https://photon.komoot.io/${path}`, { signal });
  if (!response.ok) throw new Error(String(response.status));
  const data = (await response.json()) as { features: { geometry: { coordinates: LngLat }; properties: Record<string, string | undefined> }[] };
  return data.features
    .filter((feature) => feature.properties.countrycode === "UG" && feature.properties.name)
    .map((feature) => ({ name: feature.properties.name!, context: contextOf(feature.properties), position: feature.geometry.coordinates }));
}

function areaMarker(name: string, status: "live" | "planned") {
  const element = document.createElement("button");
  element.type = "button";
  element.setAttribute("aria-label", `${name}: ${statusStyle[status].label}`);
  element.className = `flex items-center gap-1.5 rounded-full py-1 pr-3 pl-1 text-xs font-semibold shadow-md ring-1 ring-black/10 data-selected:ring-4 data-selected:ring-ink/40 ${
    status === "live" ? "bg-blue text-white" : "bg-white text-ink"
  }`;
  element.innerHTML = `<span class="size-4 rounded-full ${status === "live" ? "bg-white" : "bg-mango ring-2 ring-mango-ink"}"></span>${name}`;
  return element;
}

function pinElement() {
  const element = document.createElement("div");
  element.className = "size-5 rounded-full bg-ink ring-4 ring-white shadow-lg";
  return element;
}

export function CoverageChecker() {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<MapLibreMap | null>(null);
  const pin = useRef<Marker | null>(null);
  const areaElements = useRef<Record<string, HTMLElement>>({});
  const selectRef = useRef<(place: Place, resolving?: boolean) => void>(() => {});
  const [mapState, setMapState] = useState<"loading" | "ready" | "error">("loading");
  const [query, setQuery] = useState("");
  const [remote, setRemote] = useState<{ query: string; items: Place[] }>({ query: "", items: [] });
  const [searchError, setSearchError] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [selected, setSelected] = useState<Selection | null>(null);
  const [sheet, setSheet] = useState(false);
  const [locating, setLocating] = useState(false);

  const trimmed = query.trim();
  const suggestions = useMemo<Suggestion[]>(() => {
    if (!trimmed) return [];
    const local = areaPlaces
      .filter((area) => area.name.toLowerCase().startsWith(trimmed.toLowerCase()))
      .map((area) => ({ ...area, id: `area-${area.name}`, known: true }));
    const found = remote.query === trimmed ? remote.items : [];
    const extra = found
      .filter((item) => !local.some((area) => area.name === item.name && distanceKm(area.position, item.position) < 1))
      .map((item, index) => ({ ...item, id: `place-${index}` }));
    return [...local, ...extra].slice(0, 7);
  }, [trimmed, remote]);

  useEffect(() => {
    if (trimmed.length < 3) return;
    const controller = new AbortController();
    const timer = setTimeout(() => {
      photon(`api/?q=${encodeURIComponent(trimmed)}&limit=8&lang=en&bbox=${uganda}&lat=${home.center[1]}&lon=${home.center[0]}`, controller.signal)
        .then((items) => {
          setRemote({ query: trimmed, items });
          setSearchError(false);
        })
        .catch((error: Error) => error.name !== "AbortError" && setSearchError(true));
    }, 300);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmed]);

  const select = (place: Place, resolving = false) => {
    setSelected({ place, coverage: coverageAt(place), resolving });
    setSheet(true);
    setOpen(false);
    setActive(-1);
    const instance = map.current;
    if (!instance) return;
    const known = areaPlaces.find((area) => area.name === place.name && distanceKm(area.position, place.position) < 0.05);
    for (const [name, element] of Object.entries(areaElements.current)) element.toggleAttribute("data-selected", name === known?.name);
    if (known) pin.current?.remove();
    else
      import("maplibre-gl").then(({ Marker }) => {
        pin.current ??= new Marker({ element: pinElement() });
        pin.current.setLngLat(place.position).addTo(instance);
      });
    const compact = window.matchMedia("(max-width: 1023px)").matches;
    const height = instance.getContainer().clientHeight;
    const target = { center: place.position, zoom: Math.max(instance.getZoom(), 14.5), padding: { top: 0, right: 0, left: 0, bottom: compact ? height * 0.5 : 0 } };
    if (reducedMotion()) instance.jumpTo(target);
    else instance.flyTo({ ...target, speed: 1.6 });
    if (compact) instance.getContainer().scrollIntoView({ block: "end", behavior: reducedMotion() ? "auto" : "smooth" });
  };

  const dropPin = (position: LngLat) => {
    select({ name: "Selected location", context: "Looking up this place", position }, true);
    photon(`reverse?lat=${position[1]}&lon=${position[0]}&lang=en`)
      .then(([found]) => {
        const place = found ? { ...found, position } : { name: "Selected location", context: "No nearby place name found", position };
        setSelected({ place, coverage: coverageAt(place) });
      })
      .catch(() => setSelected((current) => current && { ...current, resolving: false, place: { ...current.place, context: "Place name unavailable" } }));
  };
  const dropRef = useRef(dropPin);
  useEffect(() => {
    selectRef.current = select;
    dropRef.current = dropPin;
  });

  useEffect(() => {
    let cancelled = false;
    import("maplibre-gl")
      .then(({ Map, Marker, NavigationControl, AttributionControl }) => {
        if (cancelled || !container.current) return;
        const instance = new Map({
          container: container.current,
          style: "https://tiles.openfreemap.org/styles/positron",
          bounds: homeBounds,
          fitBoundsOptions: homeFit,
          minZoom: 6,
          maxBounds: [
            [28.5, -2.5],
            [36, 5.5],
          ],
          dragRotate: false,
          pitchWithRotate: false,
          touchPitch: false,
          attributionControl: false,
        });
        instance.addControl(new NavigationControl({ showCompass: false }), "top-right");
        instance.addControl(new AttributionControl({ compact: true }), "bottom-right");
        instance.touchZoomRotate.disableRotation();

        instance.on("load", () => {
          if (cancelled) return;
          instance.setPaintProperty("background", "background-color", "#f4f1ea");
          instance.setPaintProperty("water", "fill-color", "#c9d1f2");
          instance.addSource("plan", {
            type: "geojson",
            data: {
              type: "Feature",
              properties: {},
              geometry: { type: "Polygon", coordinates: [plannedRegion.outline, plannedRegion.kampala].map((ring) => ring.map(([lat, lng]) => [lng, lat])) },
            },
          });
          instance.addLayer({
            id: "plan-line",
            type: "line",
            source: "plan",
            paint: { "line-color": "#c48a00", "line-width": 1.5, "line-dasharray": [3, 3], "line-opacity": 0.8 },
          });
          for (const area of areaPlaces) {
            const element = areaMarker(area.name, area.status);
            areaElements.current[area.name] = element;
            element.addEventListener("click", (event) => {
              event.stopPropagation();
              selectRef.current({ name: area.name, context: area.context, position: area.position });
            });
            new Marker({ element, anchor: "left", offset: [-8, 0] }).setLngLat(area.position).addTo(instance);
          }
          setMapState("ready");
        });
        instance.on("error", () => !instance.loaded() && !cancelled && setMapState("error"));
        instance.on("click", (event) => dropRef.current([event.lngLat.lng, event.lngLat.lat]));
        map.current = instance;
      })
      .catch(() => !cancelled && setMapState("error"));
    return () => {
      cancelled = true;
      map.current?.remove();
      map.current = null;
      pin.current = null;
    };
  }, []);

  const resetView = () => {
    const instance = map.current;
    if (!instance) return;
    instance.fitBounds(homeBounds, { ...homeFit, animate: !reducedMotion(), speed: 1.6 });
  };

  const locate = () => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        dropPin([position.coords.longitude, position.coords.latitude]);
      },
      () => {
        setLocating(false);
        setSearchError(true);
      },
      { timeout: 10000 },
    );
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((index) => Math.min(index + 1, suggestions.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && suggestions.length) {
      event.preventDefault();
      select(suggestions[Math.max(active, 0)]);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  };

  const result = <Result selection={selected} />;
  const showList = open && trimmed.length > 0;

  return (
    <div className="grid gap-4 lg:grid-cols-[24rem_1fr]">
      <div className="flex flex-col gap-4">
        <div className="relative z-20 rounded-[2rem] bg-white p-5 shadow-[0_20px_50px_-40px_rgba(13,16,32,0.6)]">
          <label htmlFor="coverage-search" className="font-semibold">
            Search your area or a landmark
          </label>
          <div className="relative mt-3">
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
            <input
              id="coverage-search"
              role="combobox"
              aria-expanded={showList}
              aria-controls="coverage-options"
              aria-autocomplete="list"
              aria-activedescendant={showList && active >= 0 ? suggestions[active]?.id : undefined}
              autoComplete="off"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setOpen(true);
                setActive(-1);
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              onKeyDown={onKeyDown}
              placeholder="For example: Kazo, Nabweru, Makerere"
              className="min-h-12 w-full min-w-0 rounded-full border border-line bg-paper pr-10 pl-11 outline-none focus:border-blue focus:bg-white focus:ring-4 focus:ring-blue/15"
            />
            {query && (
              <button type="button" onClick={() => setQuery("")} className="absolute top-1/2 right-2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full hover:bg-paper">
                <X aria-hidden className="size-4" />
                <span className="sr-only">Clear search</span>
              </button>
            )}
            {showList && (
              <ul id="coverage-options" role="listbox" aria-label="Matching places" className="absolute inset-x-0 top-full mt-2 max-h-80 overflow-auto rounded-2xl bg-white p-1.5 shadow-xl ring-1 ring-line">
                {suggestions.map((item, index) => (
                  <li
                    key={item.id}
                    id={item.id}
                    role="option"
                    aria-selected={index === active}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => select(item)}
                    className="flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5 aria-selected:bg-paper hover:bg-paper"
                  >
                    <MapPin aria-hidden className={`mt-0.5 size-4 shrink-0 ${item.known ? "text-blue" : "text-muted"}`} />
                    <span>
                      <span className="block font-semibold">{item.name}</span>
                      <span className="block text-sm text-muted">{item.known ? "Young African Internet area" : item.context || "Uganda"}</span>
                    </span>
                  </li>
                ))}
                {suggestions.length === 0 && (
                  <li className="px-3 py-2.5 text-sm text-muted">{trimmed.length < 3 ? "Keep typing to search places in Uganda" : searchError ? "Search is unavailable. Tap the map instead." : "Searching…"}</li>
                )}
              </ul>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button type="button" onClick={locate} className="inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white hover:bg-blue">
              {locating ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : <LocateFixed aria-hidden className="size-4" />}
              Use my location
            </button>
            <span className="text-sm text-muted">or tap the map to drop a pin</span>
          </div>
          {searchError && <p className="mt-3 text-sm text-coral-deep">Search or location is unavailable right now. You can still tap the map or pick an area below.</p>}
          <div className="mt-4 flex flex-wrap gap-2">
            {areaPlaces.map((area) => (
              <button
                key={area.name}
                type="button"
                onClick={() => select(area)}
                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-paper px-3.5 text-sm font-semibold hover:bg-ink/10"
              >
                <span aria-hidden className={`size-2.5 rounded-full ${statusStyle[area.status].dot}`} />
                {area.name}
              </button>
            ))}
          </div>
        </div>
        <div className="hidden min-h-[19rem] rounded-[2rem] bg-white p-6 lg:block">{result}</div>
      </div>

      <div className="relative isolate z-0 h-[62svh] min-h-[26rem] overflow-hidden rounded-[2rem] bg-[#ece8e0] lg:h-[40rem]">
        <div ref={container} className="h-full w-full" aria-label="Coverage map. Tap or click to check a location." role="region" />
        {mapState !== "ready" && (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            {mapState === "loading" ? (
              <p className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow">
                <LoaderCircle aria-hidden className="size-4 animate-spin" />
                Loading map
              </p>
            ) : (
              <p className="max-w-xs rounded-2xl bg-white p-4 text-sm shadow">The map could not load. You can still search for your area or pick one of our areas.</p>
            )}
          </div>
        )}
        <div className="pointer-events-none absolute top-3 left-3 flex flex-col items-start gap-2">
          <ul aria-label="Map key" className="pointer-events-auto flex flex-wrap gap-x-3 gap-y-1 rounded-2xl bg-white/95 px-3 py-2 text-xs font-semibold shadow">
            <li className="flex items-center gap-1.5">
              <span aria-hidden className={`size-2.5 rounded-full ${statusStyle.live.dot}`} />
              Live
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden className={`size-2.5 rounded-full ${statusStyle.planned.dot}`} />
              Coming soon
            </li>
            <li className="flex items-center gap-1.5">
              <span aria-hidden className="h-0 w-4 border-t-2 border-dashed border-[#c48a00]" />
              Wakiso rollout boundary
            </li>
          </ul>
          <button type="button" onClick={resetView} className="pointer-events-auto inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white px-3.5 text-xs font-semibold shadow hover:bg-paper">
            <RotateCcw aria-hidden className="size-3.5" />
            Reset view
          </button>
        </div>
        {selected && sheet && (
          <div className="absolute inset-x-2 bottom-8 max-h-[58%] overflow-auto rounded-3xl bg-white p-5 shadow-2xl lg:hidden">
            <button type="button" onClick={() => setSheet(false)} className="absolute top-3 right-3 flex size-9 items-center justify-center rounded-full bg-paper">
              <X aria-hidden className="size-4" />
              <span className="sr-only">Close details</span>
            </button>
            {result}
          </div>
        )}
      </div>
    </div>
  );
}

function Result({ selection }: { selection: Selection | null }) {
  if (!selection) {
    return (
      <div aria-live="polite">
        <p className="text-lg font-semibold">Check a location</p>
        <p className="mt-2 leading-relaxed text-muted">Search for your area, use your location or tap the map. We will show whether Young African Internet is live, coming soon or not yet confirmed there.</p>
        <ul className="mt-5 space-y-2 text-sm">
          {(["live", "planned", "unconfirmed"] as const).map((status) => (
            <li key={status} className="flex items-center gap-2">
              <span aria-hidden className={`size-2.5 rounded-full ${statusStyle[status].dot}`} />
              {statusStyle[status].label}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const { place, coverage, resolving } = selection;
  const style = statusStyle[coverage.status];
  const area = encodeURIComponent(place.name === "Selected location" ? `${place.position[1].toFixed(5)}, ${place.position[0].toFixed(5)}` : place.name);
  const title =
    coverage.status === "live" ? `Live in ${coverage.area}` : coverage.status === "planned" ? `${coverage.area}: coming soon` : "Not yet confirmed here";
  const message =
    coverage.status === "live"
      ? "Young African Internet is live in this area. Hotspot reach varies street by street, so ask us to confirm your exact spot."
      : coverage.status === "planned"
        ? coverage.area === plannedRegion.name
          ? "This location is inside Wakiso District, which is on our rollout plan. No date or exact coverage has been confirmed yet."
          : `${coverage.area} is next on our rollout plan. No date has been confirmed yet.`
        : "We have not confirmed coverage at this location.";
  const nearby = coverage.nearest.name !== coverage.area && coverage.nearest.km < 25;

  return (
    <div aria-live="polite" className="pr-8 lg:pr-0">
      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}>{style.label}</span>
      <p className="mt-3 text-xl font-semibold tracking-[-0.02em]">{title}</p>
      <p className="mt-1 text-sm text-muted">
        {resolving ? "Finding the place name…" : [place.name, place.context].filter(Boolean).join(" · ")}
      </p>
      <p className="mt-3 leading-relaxed">{message}</p>
      {nearby && (
        <p className="mt-2 text-sm text-muted">
          Nearest {coverage.nearest.status === "live" ? "live" : "planned"} area: <span className="font-semibold text-ink">{coverage.nearest.name}</span>, {formatKm(coverage.nearest.km)} away.
        </p>
      )}
      {coverage.status === "live" ? (
        <>
          <ul className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
            {[
              ["3 hours", 500],
              ["24 hours", 1000],
              ["30 days", 25000],
            ].map(([name, price]) => (
              <li key={name} className="rounded-2xl bg-paper px-2 py-2.5">
                <span className="block text-xs text-muted">{name}</span>
                <span className="font-semibold tabular-nums">{ugx(Number(price))}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link href="/packages" className="inline-flex min-h-11 items-center gap-2 rounded-full bg-blue px-5 text-sm font-semibold text-white hover:bg-blue-deep">
              See all packages
              <ArrowRight aria-hidden className="size-4" />
            </Link>
            <Link href={`/contact?service=coverage&area=${area}`} className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold ring-2 ring-ink/15 hover:ring-ink">
              Confirm my spot
            </Link>
          </div>
        </>
      ) : (
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href={`/contact?service=coverage&area=${area}`} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white hover:bg-blue">
            Register interest
            <ArrowRight aria-hidden className="size-4" />
          </Link>
          <Link href="/packages" className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-semibold ring-2 ring-ink/15 hover:ring-ink">
            See packages
          </Link>
        </div>
      )}
    </div>
  );
}
