import { Link } from "wouter";
import ActivityTimeline from "@/components/ActivityTimeline";
import InteractiveMap from "@/components/InteractiveMap";
import { usePageTitle } from "@/hooks/usePageTitle";
import { dayRouteNotes } from "@/lib/dayRouteData";
import { days, getDay } from "@/lib/itineraryData";
import { accentFor } from "@/lib/utils";

export default function DayDetail({ params }: { params: { id?: string } }) {
  const day = getDay(Number(params.id));
  usePageTitle(day ? `第 ${day.id} 天 ${day.title}` : "找不到這一天");

  if (!day) {
    return (
      <div>
        <h1 className="font-serif text-3xl">沒有這一天</h1>
        <Link href="/" className="mt-4 inline-block text-beni">
          回總覽
        </Link>
      </div>
    );
  }

  const accent = accentFor(day.id);
  const previous = days.find((item) => item.id === day.id - 1);
  const next = days.find((item) => item.id === day.id + 1);

  return (
    <article>
      <p className="text-sm text-muted">
        <Link href="/" className="hover:text-beni">
          總覽
        </Link>
        <span className="mx-2">/</span>第 {day.id} 天
      </p>
      <header className="mt-3 grid gap-4 border-b border-line pb-6 md:grid-cols-[auto_1fr]">
        <p
          className="grid size-16 place-items-center rounded-full font-serif text-2xl"
          style={{ background: accent.wash, color: accent.ink }}
        >
          {accent.seal}
        </p>
        <div>
          <p className="text-sm text-muted">
            {day.date}・{day.weekday}・{day.area}
          </p>
          <h1 className="mt-1 font-serif text-4xl font-semibold">{day.title}</h1>
          <p className="mt-3 max-w-3xl leading-8">{day.summary}</p>
          <p className="mt-4 rounded-2xl border border-beni/30 bg-white/50 px-4 py-3 text-sm">
            <span className="font-medium text-beni">今天只記這件：</span>
            {day.remember}
          </p>
        </div>
      </header>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <ActivityTimeline activities={day.activities} />
        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-3xl border border-line bg-white/50 p-4">
            <h2 className="font-serif text-xl">吃</h2>
            <ul className="mt-3 space-y-3 text-sm leading-6">
              {day.meals.map((meal) => (
                <li key={meal.label}>
                  <span className="font-medium">{meal.label}</span>
                  <span className="mt-1 block text-muted">{meal.suggestion}</span>
                </li>
              ))}
            </ul>
          </section>
          <section className="rounded-3xl border border-line p-4">
            <h2 className="font-serif text-xl">節奏</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{day.pace}</p>
            <p className="mt-2 text-sm leading-6 text-muted">步行：{day.walk}</p>
            <Link href={`/transport#day-${day.id}`} className="mt-3 inline-block text-sm text-beni">
              這天的轉乘步驟
            </Link>
          </section>
          <section className="rounded-3xl bg-ink p-4 text-paper">
            <h2 className="font-serif text-xl">提醒</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-paper/90">
              {day.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>

      <section className="no-print mt-10">
        <div className="mb-3 flex items-end justify-between gap-3">
          <h2 className="font-serif text-2xl">這天的地圖</h2>
          <Link href={`/map?day=${day.id}`} className="text-sm text-beni">
            放大看
          </Link>
        </div>
        <InteractiveMap days={[day.id]} className="h-80" />
        <p className="mt-2 text-sm text-muted">{dayRouteNotes[day.id]} 實線是電車，虛線是步行或可選。</p>
      </section>

      <nav className="mt-8 flex justify-between gap-3 border-t border-line pt-6 text-sm" aria-label="前後一天">
        {previous ? (
          <Link href={`/day/${previous.id}`} className="hover:text-beni">
            ← 第 {previous.id} 天 {previous.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/day/${next.id}`} className="hover:text-beni">
            第 {next.id} 天 {next.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </article>
  );
}
