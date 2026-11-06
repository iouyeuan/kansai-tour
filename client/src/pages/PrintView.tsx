import { useEffect } from "react";
import { Link } from "wouter";
import ActivityTimeline from "@/components/ActivityTimeline";
import { usePageTitle } from "@/hooks/usePageTitle";
import { days, tripInfo } from "@/lib/itineraryData";

export default function PrintView() {
  usePageTitle("列印行程");

  useEffect(() => {
    const autoprint = new URLSearchParams(window.location.search).get("autoprint");
    if (autoprint !== "1") return;
    const timer = window.setTimeout(() => window.print(), 400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <article>
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">使用瀏覽器的「列印」或「另存 PDF」。中文會照系統字型輸出。</p>
        <button type="button" onClick={() => window.print()} className="rounded-full bg-beni px-4 py-2 text-sm text-paper">
          列印／存成 PDF
        </button>
      </div>
      <header className="border-b border-line pb-4">
        <p className="text-sm text-muted">{tripInfo.datesLabel}</p>
        <h1 className="font-serif text-4xl font-semibold">{tripInfo.headline}</h1>
        <p className="mt-2">{tripInfo.subtitle}</p>
        <p className="mt-2 text-sm">
          {tripInfo.carrier}　去程 11/15 KHH 06:55 → KIX 10:40　回程 11/20 KIX 11:30 → KHH
        </p>
        <p className="mt-1 text-sm">住宿：{tripInfo.base}（南海堺站東口步行約 3 分鐘）</p>
      </header>
      {days.map((day) => (
        <section key={day.id} className="print-break mt-8">
          <h2 className="font-serif text-2xl">
            第 {day.id} 天・{day.date} {day.weekday}・{day.title}
          </h2>
          <p className="mt-2 text-sm leading-7">{day.summary}</p>
          <p className="mt-2 text-sm">今天只記這件：{day.remember}</p>
          <div className="mt-4">
            <ActivityTimeline activities={day.activities} />
          </div>
          <p className="text-sm text-muted">
            {day.meals.map((meal) => `${meal.label}：${meal.suggestion}`).join("　")}
          </p>
        </section>
      ))}
      <p className="no-print mt-8 text-sm">
        <Link href="/" className="text-beni">
          回總覽
        </Link>
      </p>
    </article>
  );
}
