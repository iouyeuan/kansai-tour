import { useState } from "react";
import { Link } from "wouter";
import { usePageTitle } from "@/hooks/usePageTitle";
import { attractionRoles, attractions } from "@/lib/attractionsData";

export default function Attractions() {
  usePageTitle("景點");
  const [role, setRole] = useState<(typeof attractionRoles)[number]>("全部");
  const visible = attractions.filter((item) => role === "全部" || item.role === role);

  return (
    <div>
      <h1 className="font-serif text-4xl font-semibold">景點</h1>
      <p className="mt-3 max-w-3xl leading-8">
        必去的只有每天真正要進的地方。可選是有餘力再加。銀閣寺是備案。清水寺寫在這裡，是為了提醒這次不排。
      </p>
      <div className="no-print mt-4 flex flex-wrap gap-2">
        {attractionRoles.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={role === item}
            onClick={() => setRole(item)}
            className={`rounded-full px-3 py-1.5 text-sm ${role === item ? "bg-ink text-paper" : "border border-line bg-white/50"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {visible.map((item) => (
          <AttractionCard key={item.id} item={item} />
        ))}
      </div>
      {visible.length === 0 ? <p className="mt-6 text-sm text-muted">這個分類沒有景點。</p> : null}
    </div>
  );
}

function AttractionCard({ item }: { item: (typeof attractions)[number] }) {
  const skipped = item.role === "不排";
  return (
    <article className={`rounded-3xl border p-5 ${skipped ? "border-dashed border-line bg-paper-2/40" : "border-line bg-white/40"}`}>
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs tracking-[0.14em] text-muted">
          {item.area}・第 {item.day} 天
        </p>
        <span className={`rounded-full px-2 py-0.5 text-xs ${skipped ? "bg-ink text-paper" : "bg-paper-2"}`}>{item.role}</span>
      </div>
      <h2 className="mt-2 font-serif text-2xl">{item.name}</h2>
      <p className="mt-2 text-sm leading-7">{item.summary}</p>
      <p className="mt-3 text-sm text-muted">{item.admission}</p>
      <p className="mt-2 text-sm leading-7">{item.tip}</p>
      {skipped ? null : (
        <Link href={`/map?day=${item.day}&place=${item.id}`} className="mt-3 inline-block text-sm text-beni">
          在地圖上看
        </Link>
      )}
    </article>
  );
}
