import { useEffect, useMemo, useState, type ReactNode } from "react";
import { useSearchParams } from "wouter";
import InteractiveMap from "@/components/InteractiveMap";
import { usePageTitle } from "@/hooks/usePageTitle";
import { dayRouteNotes } from "@/lib/dayRouteData";
import { days } from "@/lib/itineraryData";
import { mapMarkers } from "@/lib/mapMarkersData";
import { categoryLabel } from "@/lib/utils";

export default function MapPage() {
  usePageTitle("地圖");
  const [params, setParams] = useSearchParams();
  const dayParam = Number(params.get("day"));
  const selectedDay = dayParam >= 1 && dayParam <= 6 ? dayParam : 0;
  const place = params.get("place") ?? "";
  const [activeId, setActiveId] = useState(place);
  const [hideOptional, setHideOptional] = useState(false);

  useEffect(() => {
    if (place) setActiveId(place);
  }, [place]);

  const visible = useMemo(() => {
    return mapMarkers.filter((marker) => {
      if (hideOptional && marker.optional) return false;
      if (selectedDay && !marker.days.includes(selectedDay)) return false;
      return true;
    });
  }, [hideOptional, selectedDay]);

  function chooseDay(day: number) {
    const next = new URLSearchParams(params);
    if (day === 0) next.delete("day");
    else next.set("day", String(day));
    setParams(next, { replace: true });
  }

  return (
    <div>
      <h1 className="font-serif text-4xl font-semibold">地圖</h1>
      <p className="mt-2 max-w-2xl text-sm leading-7 text-muted">
        先選一天，才會畫出當天的順序。實線是電車、纜車或巴士，虛線是步行或可選。全部日時只顯示地點。座標來自 OpenStreetMap 與飯店官網，線不是真實軌道。
      </p>
      <div className="no-print mt-4 flex flex-wrap gap-2">
        <FilterButton pressed={selectedDay === 0} onClick={() => chooseDay(0)}>
          全部
        </FilterButton>
        {days.map((day) => (
          <FilterButton key={day.id} pressed={selectedDay === day.id} onClick={() => chooseDay(day.id)}>
            第 {day.id} 天
          </FilterButton>
        ))}
        <FilterButton pressed={hideOptional} onClick={() => setHideOptional((value) => !value)}>
          隱藏可選
        </FilterButton>
      </div>
      {selectedDay ? <p className="mt-3 text-sm text-muted">{dayRouteNotes[selectedDay]}</p> : null}

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_19rem]">
        <InteractiveMap
          days={selectedDay ? [selectedDay] : undefined}
          activeId={activeId || undefined}
          onSelect={setActiveId}
          hideOptional={hideOptional}
          scrollWheel
          className="order-1 h-[62vh] lg:order-2 lg:h-[calc(100vh-9rem)]"
        />
        <ul className="order-2 max-h-[40vh] space-y-2 overflow-auto lg:order-1 lg:max-h-[calc(100vh-9rem)]">
          {visible.map((marker) => (
            <li key={marker.id}>
              <button
                type="button"
                onClick={() => setActiveId(marker.id)}
                className={`w-full rounded-2xl border px-3 py-2 text-left ${
                  activeId === marker.id ? "border-beni bg-white" : "border-line bg-white/40 hover:bg-white"
                }`}
              >
                <span className="text-xs text-muted">
                  {categoryLabel[marker.category]}・第 {marker.days.join("、")} 天
                  {marker.optional ? "・可選" : ""}
                </span>
                <span className="mt-0.5 block text-sm font-medium">{marker.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function FilterButton({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm ${pressed ? "bg-ink text-paper" : "border border-line bg-white/50"}`}
    >
      {children}
    </button>
  );
}
