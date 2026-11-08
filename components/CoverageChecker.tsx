"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { preconnect } from "react-dom";
import Link from "next/link";
import type { Map as MapLibreMap, Marker, StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { ArrowRight, ChevronDown, LoaderCircle, LocateFixed, MapPin, RotateCcw, Search, X } from "lucide-react";
import { areaPlaces, coverageAt, distanceKm, type Coverage, type LngLat, type Place } from "@/lib/coverage";
import { plannedRegion } from "@/content/coverage";
import { allPackages, ugx } from "@/content/site";

type Selection = { place: Place; coverage: Coverage; resolving?: boolean };
type Suggestion = Place & { id: string; known?: boolean };
type MapLibre = typeof import("maplibre-gl");

const home = { center: [32.5525, 0.3635] as LngLat };
const homeBounds: [LngLat, LngLat] = [
  [Math.min(...areaPlaces.map((area) => area.position[0])), Math.min(...areaPlaces.map((area) => area.position[1]))],
  [Math.max(...areaPlaces.map((area) => area.position[0])), Math.max(...areaPlaces.map((area) => area.position[1]))],
];
const homeFit = { padding: { top: 110, bottom: 60, left: 50, right: 120 }, maxZoom: 14 };
const uganda = "29.5,-1.5,35.1,4.3";
const tiles = "https://tiles.openfreemap.org";
const unnamed = "Selected location";
const statusStyle = {
  live: { label: "Live now", dot: "bg-blue", badge: "bg-blue text-white" },
  planned: { label: "Coming soon", dot: "bg-mango ring-2 ring-mango-ink", badge: "bg-mango text-mango-ink" },
  unconfirmed: { label: "Not yet confirmed", dot: "bg-muted", badge: "bg-ink/10 text-ink" },
};

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const compactScreen = () => window.matchMedia("(max-width: 1023px)").matches;

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

let mapLibre: Promise<MapLibre> | undefined;

function loadMapLibre() {
  mapLibre ??= import("maplibre-gl").catch((error) => {
    mapLibre = undefined;
    throw error;
  });
  return mapLibre;
}

async function getJson<T>(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(String(response.status));
  return (await response.json()) as T;
}

async function loadStyle() {
  const [style, tileset] = await Promise.all([
    getJson<StyleSpecification>(`${tiles}/styles/positron`),
    getJson<{ tiles: string[]; minzoom: number; maxzoom: number; attribution: string }>(`${tiles}/planet`),
  ]);
  const { tiles: urls, minzoom, maxzoom, attribution } = tileset;
  style.sources.openmaptiles = { type: "vector", tiles: urls, minzoom, maxzoom, attribution };
  for (const layer of style.layers) {
    if (layer.id === "background" && layer.type === "background") layer.paint = { ...layer.paint, "background-color": "#f4f1ea" };
    if (layer.id === "water" && layer.type === "fill") layer.paint = { ...layer.paint, "fill-color": "#c9d1f2" };
  }
  style.sources.plan = {
    type: "geojson",
    data: {
      type: "Feature",
      properties: {},
      geometry: { type: "Polygon", coordinates: [plannedRegion.outline, plannedRegion.kampala].map((ring) => ring.map(([lat, lng]) => [lng, lat])) },
    },
  };
  style.layers.push({
    id: "plan-line",
    type: "line",
    source: "plan",
    paint: { "line-color": "#c48a00", "line-width": 1.5, "line-dasharray": [3, 3], "line-opacity": 0.8 },
  });
  return style;
}

function describe({ place, coverage }: Selection) {
  const title =
    coverage.status === "live" ? `Live in ${coverage.area}` : coverage.status === "planned" ? `${coverage.area}: coming soon` : "Not yet confirmed here";
  const message =
    coverage.status === "live"
      ? "Young African Internet is live in this area. Hotspot reach varies street by street, so ask us to confirm your exact spot."
      : coverage.status === "planned"
        ? coverage.area === plannedRegion.name
          ? "This location is inside Wakiso District or Entebbe, which are on our rollout plan. No date or exact coverage has been confirmed yet."
          : `${coverage.area} is next on our rollout plan. No date has been confirmed yet.`
        : "We have not confirmed coverage at this location.";
  return { title, message, label: [place.name, place.context].filter(Boolean).join(" · ") };
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
  preconnect(tiles, { crossOrigin: "anonymous" });
  const container = useRef<HTMLDivElement>(null);
  const resultCard = useRef<HTMLDivElement>(null);
  const map = useRef<MapLibreMap | null>(null);
  const markerClass = useRef<MapLibre["Marker"] | null>(null);
  const pin = useRef<Marker | null>(null);
  const areaElements = useRef<Record<string, HTMLElement>>({});
  const selectRef = useRef<(place: Place, fromMap?: boolean) => void>(() => {});
  const dropRef = useRef<(position: LngLat) => void>(() => {});
  const [mapState, setMapState] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  const [query, setQuery] = useState("");
  const [remote, setRemote] = useState<{ query: string; items: Place[] }>({ query: "", items: [] });
  const [searchError, setSearchError] = useState(false);
  const [notice, setNotice] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [selected, setSelected] = useState<Selection | null>(null);
  const [focus, setFocus] = useState<LngLat | null>(null);
  const [locating, setLocating] = useState(false);

  const trimmed = query.trim();
  const searching = trimmed.length >= 3 && remote.query !== trimmed && !searchError;
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
        .then((items) => setRemote({ query: trimmed, items }))
        .catch((error: Error) => error.name !== "AbortError" && setSearchError(true));
    }, 300);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [trimmed]);

  const select = (place: Place, fromMap = false) => {
    setSelected({ place, coverage: coverageAt(place), resolving: place.name === unnamed });
    setFocus(place.position);
    setOpen(false);
    setActive(-1);
    setNotice("");
    if (!fromMap && compactScreen()) container.current?.scrollIntoView({ block: "end", behavior: reducedMotion() ? "auto" : "smooth" });
  };

  const dropPin = (position: LngLat, fromMap = true) => {
    select({ name: unnamed, context: "", position }, fromMap);
    photon(`reverse?lat=${position[1]}&lon=${position[0]}&lang=en`)
      .then(([found]) => {
        const place = found ? { ...found, position } : { name: unnamed, context: "No nearby place name found", position };
        setSelected((current) => (current?.place.position === position ? { place, coverage: coverageAt(place) } : current));
      })
      .catch(() =>
        setSelected((current) =>
          current?.place.position === position ? { ...current, resolving: false, place: { ...current.place, context: "Place name unavailable" } } : current,
        ),
      );
  };

  useEffect(() => {
    selectRef.current = select;
    dropRef.current = dropPin;
  });

  useEffect(() => {
    let cancelled = false;
    let instance: MapLibreMap | null = null;
    const timeout = setTimeout(() => !cancelled && setMapState((state) => (state === "loading" ? "error" : state)), 20000);
    Promise.all([loadMapLibre(), loadStyle()])
      .then(([{ Map, Marker, NavigationControl, AttributionControl }, style]) => {
        if (cancelled || !container.current) return;
        markerClass.current = Marker;
        const created = new Map({
          container: container.current,
          style,
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
        instance = created;
        created.addControl(new NavigationControl({ showCompass: false }), "top-right");
        created.addControl(new AttributionControl({ compact: true }), "bottom-right");
        created.touchZoomRotate.disableRotation();
        for (const area of areaPlaces) {
          const element = areaMarker(area.name, area.status);
          areaElements.current[area.name] = element;
          element.addEventListener("click", (event) => {
            event.stopPropagation();
            selectRef.current({ name: area.name, context: area.context, position: area.position }, true);
          });
          new Marker({ element, anchor: "left", offset: [-8, 0] }).setLngLat(area.position).addTo(created);
        }
        created.on("load", () => !cancelled && setMapState("ready"));
        created.on("error", () => !created.loaded() && !cancelled && setMapState("error"));
        created.on("click", (event) => dropRef.current([event.lngLat.lng, event.lngLat.lat]));
        map.current = created;
      })
      .catch(() => !cancelled && setMapState("error"));
    return () => {
      cancelled = true;
      clearTimeout(timeout);
      instance?.remove();
      map.current = null;
      pin.current = null;
      areaElements.current = {};
    };
  }, [attempt]);

  useEffect(() => {
    const instance = map.current;
    if (mapState !== "ready" || !instance || !focus) return;
    const known = areaPlaces.find((area) => distanceKm(area.position, focus) < 0.05);
    for (const [name, element] of Object.entries(areaElements.current)) element.toggleAttribute("data-selected", name === known?.name);
    if (known) pin.current?.remove();
    else if (markerClass.current) {
      pin.current ??= new markerClass.current({ element: pinElement() });
      pin.current.setLngLat(focus).addTo(instance);
    }
    const target = { center: focus, zoom: Math.max(instance.getZoom(), 14.5), padding: { top: 0, right: 0, left: 0, bottom: compactScreen() ? 90 : 0 } };
    if (reducedMotion()) instance.jumpTo(target);
    else instance.flyTo({ ...target, speed: 1.6 });
  }, [mapState, focus]);

  const retry = () => {
    setMapState("loading");
    setAttempt((count) => count + 1);
  };

  const resetView = () => map.current?.fitBounds(homeBounds, { ...homeFit, animate: !reducedMotion(), speed: 1.6 });

  const locate = () => {
    if (!navigator.geolocation) {
      setNotice("Your browser cannot share your location. Search for your area or tap the map instead.");
      return;
    }
    setLocating(true);
    setNotice("");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocating(false);
        dropPin([position.coords.longitude, position.coords.latitude], false);
      },
      (error) => {
        setLocating(false);
        setNotice(
          error.code === error.PERMISSION_DENIED
            ? "Location access is blocked. Allow it in your browser settings, or search for your area instead."
            : "We could not find your location. Search for your area or tap the map instead.",
        );
      },
      { timeout: 10000, maximumAge: 60000 },
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

  const showList = open && trimmed.length > 0;
  const summary = selected && describe(selected);

  return (
    <div className="grid gap-4 lg:grid-cols-[24rem_1fr] lg:grid-rows-[auto_1fr]">
      <div className="relative z-20 rounded-[2rem] bg-white p-5 shadow-[0_20px_50px_-40px_rgba(13,16,32,0.6)]">
        <label htmlFor="coverage-search" className="font-semibold">
          Search your area or a landmark
        </label>
        <div className="relative mt-3">
          {searching ? (
            <LoaderCircle aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 animate-spin text-muted" />
          ) : (
            <Search aria-hidden className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted" />
          )}
          <input
            id="coverage-search"
            role="combobox"
            aria-expanded={showList}
            aria-controls="coverage-options"
            aria-autocomplete="list"
            aria-activedescendant={showList && active >= 0 ? suggestions[active]?.id : undefined}
            autoComplete="off"
            enterKeyHint="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setSearchError(false);
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
              {(suggestions.length === 0 || searching || searchError) && (
                <li className="px-3 py-2.5 text-sm text-muted">
                  {trimmed.length < 3
                    ? "Keep typing to search places in Uganda"
                    : searchError
                      ? "Place search is unavailable right now. Tap the map or pick an area below."
                      : searching
                        ? "Searching places in Uganda…"
                        : "No places found in Uganda. Try a nearby landmark or tap the map."}
                </li>
              )}
            </ul>
          )}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={locate}
            disabled={locating}
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-semibold text-white hover:bg-blue disabled:opacity-70"
          >
            {locating ? <LoaderCircle aria-hidden className="size-4 animate-spin" /> : <LocateFixed aria-hidden className="size-4" />}
            {locating ? "Finding you…" : "Use my location"}
          </button>
          <span className="text-sm text-muted">or tap the map to drop a pin</span>
        </div>
        {notice && (
          <p role="alert" className="mt-3 text-sm text-coral-deep">
            {notice}
          </p>
        )}
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

      <div className="relative isolate z-0 h-[60svh] min-h-[24rem] overflow-hidden rounded-[2rem] bg-[#ece8e0] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-[40rem]">
        <div ref={container} className="h-full w-full" aria-label="Coverage map. Tap or click to check a location." role="region" />
        {mapState !== "ready" && (
          <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
            {mapState === "loading" ? (
              <p role="status" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold shadow">
                <LoaderCircle aria-hidden className="size-4 animate-spin" />
                Loading map
              </p>
            ) : (
              <div role="alert" className="max-w-xs rounded-2xl bg-white p-5 text-sm shadow">
                <p>The map could not load. You can still search for your area or pick one of our areas.</p>
                <button type="button" onClick={retry} className="mt-3 inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 font-semibold text-white hover:bg-blue">
                  <RotateCcw aria-hidden className="size-4" />
                  Try again
                </button>
              </div>
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
              Rollout boundary
            </li>
          </ul>
          {mapState === "ready" && (
            <button type="button" onClick={resetView} className="pointer-events-auto inline-flex min-h-10 items-center gap-1.5 rounded-full bg-white px-3.5 text-xs font-semibold shadow hover:bg-paper">
              <RotateCcw aria-hidden className="size-3.5" />
              Reset view
            </button>
          )}
        </div>
        {selected && summary && (
          <button
            type="button"
            onClick={() => resultCard.current?.scrollIntoView({ block: "nearest", behavior: reducedMotion() ? "auto" : "smooth" })}
            className="absolute inset-x-2 bottom-9 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-left shadow-xl lg:hidden"
          >
            <span aria-hidden className={`size-3 shrink-0 rounded-full ${statusStyle[selected.coverage.status].dot}`} />
            <span className="min-w-0 flex-1">
              <span className="block leading-snug font-semibold">{summary.title}</span>
              <span className="block truncate text-xs text-muted">{selected.resolving ? "Finding the place name…" : summary.label}</span>
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 text-sm font-semibold text-blue">
              <span className="max-[359px]:sr-only">Details</span>
              <ChevronDown aria-hidden className="size-4" />
            </span>
          </button>
        )}
      </div>

      <div ref={resultCard} className="scroll-mt-4 rounded-[2rem] bg-white p-6 lg:col-start-1 lg:row-start-2 lg:min-h-[19rem]">
        <Result selection={selected} />
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
  const area = encodeURIComponent(place.name === unnamed ? `${place.position[1].toFixed(5)}, ${place.position[0].toFixed(5)}` : place.name);
  const { title, message, label } = describe(selection);
  const nearby = coverage.nearest.name !== coverage.area && coverage.nearest.km < 25;

  return (
    <div aria-live="polite">
      <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${style.badge}`}>{style.label}</span>
      <p className="mt-3 text-xl font-semibold tracking-[-0.02em]">{title}</p>
      <p className="mt-1 text-sm text-muted">{resolving ? "Finding the place name…" : label}</p>
      <p className="mt-3 leading-relaxed">{message}</p>
      {nearby && (
        <p className="mt-2 text-sm text-muted">
          Nearest {coverage.nearest.status === "live" ? "live" : "planned"} area: <span className="font-semibold text-ink">{coverage.nearest.name}</span>, {formatKm(coverage.nearest.km)} away.
        </p>
      )}
      {coverage.status === "live" ? (
        <>
          <ul className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
            {[allPackages[0], allPackages[2], allPackages[4]].map((item) => (
              <li key={item.name} className="rounded-2xl bg-paper px-2 py-2.5">
                <span className="block text-xs text-muted">{item.duration}</span>
                <span className="font-semibold">{ugx(item.price)}</span>
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
