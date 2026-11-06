import { useEffect, useMemo } from "react";
import { MapContainer, Marker, Polyline, Popup, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import { routesForDays } from "@/lib/dayRouteData";
import { mapMarkers } from "@/lib/mapMarkersData";
import { accentFor, categoryLabel, cn } from "@/lib/utils";

const categoryColor = {
  station: "#24344a",
  hotel: "#8d6230",
  sight: "#8e2f2c",
  food: "#234838",
};

function makeIcon(color: string, active: boolean) {
  const size = active ? 18 : 14;
  return L.divIcon({
    className: "kansai-pin",
    html: `<span style="width:${size}px;height:${size}px;background:${color}"></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

function Frame({
  filterKey,
  activeId,
  points,
}: {
  filterKey: string;
  activeId?: string;
  points: [number, number][];
}) {
  const map = useMap();

  useEffect(() => {
    const active = points.length && activeId ? mapMarkers.find((marker) => marker.id === activeId) : undefined;
    if (active) {
      map.flyTo([active.lat, active.lng], 15, { duration: 0.55 });
      return;
    }
    if (points.length === 1) {
      map.setView(points[0], 14);
      return;
    }
    if (points.length > 1) {
      map.fitBounds(points, { padding: [32, 32], maxZoom: 13 });
    }
  }, [map, filterKey, activeId, points]);

  return null;
}

export default function InteractiveMap({
  days,
  activeId,
  onSelect,
  hideOptional = false,
  scrollWheel = false,
  className,
}: {
  days?: number[];
  activeId?: string;
  onSelect?: (id: string) => void;
  hideOptional?: boolean;
  scrollWheel?: boolean;
  className?: string;
}) {
  const filterKey = days?.length ? [...days].sort((a, b) => a - b).join(",") : "all";
  const visible = useMemo(() => {
    const wanted = filterKey === "all" ? null : new Set(filterKey.split(",").map(Number));
    const base = wanted
      ? mapMarkers.filter((marker) => marker.days.some((day) => wanted.has(day)))
      : mapMarkers;
    return hideOptional ? base.filter((marker) => !marker.optional) : base;
  }, [filterKey, hideOptional]);
  const routes = useMemo(() => {
    if (filterKey === "all") return [];
    const wanted = filterKey.split(",").map(Number);
    return routesForDays(wanted).filter((route) => (hideOptional ? !route.optional : true));
  }, [filterKey, hideOptional]);
  const points = useMemo<[number, number][]>(
    () => [
      ...visible.map((marker) => [marker.lat, marker.lng] as [number, number]),
      ...routes.flatMap((route) => route.points.map((point) => [point.lat, point.lng] as [number, number])),
    ],
    [visible, routes],
  );

  return (
    <div className={cn("relative z-0 overflow-hidden rounded-3xl border border-line bg-paper-2", className)}>
      <MapContainer
        center={[34.72, 135.5]}
        zoom={9}
        scrollWheelZoom={scrollWheel}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Frame filterKey={filterKey} activeId={activeId} points={points} />
        {routes.map((route) => (
          <Polyline
            key={route.id}
            positions={route.points.map((point) => [point.lat, point.lng] as [number, number])}
            pathOptions={{
              color: accentFor(route.day).ink,
              weight: route.mode === "train" ? 4 : 3,
              opacity: route.optional ? 0.45 : 0.88,
              dashArray: route.mode === "walk" || route.optional ? "7 8" : undefined,
            }}
          >
            <Popup>
              <strong>
                第 {route.day} 天・{route.label}
              </strong>
              <p className="mt-1 text-sm">示意順序，不是真實軌道。</p>
            </Popup>
          </Polyline>
        ))}
        {visible.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={makeIcon(categoryColor[marker.category], activeId === marker.id)}
            eventHandlers={{ click: () => onSelect?.(marker.id) }}
          >
            <Popup>
              <p className="text-xs text-muted">
                {categoryLabel[marker.category]}
                {marker.optional ? "・可選" : ""}
                {"・"}第 {marker.days.join("、")} 天
              </p>
              <strong className="mt-1 block">{marker.name}</strong>
              <p className="mt-1 text-sm leading-6">{marker.blurb}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
