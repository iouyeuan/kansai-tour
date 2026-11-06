import { Link } from "wouter";
import type { DayPlan } from "@/lib/types";
import { accentFor } from "@/lib/utils";

export default function DayCard({ day }: { day: DayPlan }) {
  const accent = accentFor(day.id);

  return (
    <Link
      href={`/day/${day.id}`}
      id={`day-${day.id}`}
      className="group grid scroll-mt-24 gap-4 border-b border-line py-6 md:grid-cols-[7.5rem_1fr_auto] md:items-start"
    >
      <div>
        <p className="font-serif text-3xl font-semibold" style={{ color: accent.ink }}>
          {String(day.id).padStart(2, "0")}
        </p>
        <p className="mt-1 text-sm text-muted">
          {day.date}
          <span className="mx-1">・</span>
          {day.weekday.replace("星期", "週")}
        </p>
      </div>
      <div>
        <p className="text-xs tracking-[0.18em] text-muted">{day.area}</p>
        <h2 className="mt-1 font-serif text-2xl font-semibold group-hover:text-beni">{day.title}</h2>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-ink/90">{day.summary}</p>
        <p className="mt-3 text-sm text-muted">
          {day.pace}
          <span className="mx-2 text-line">/</span>
          步行{day.walk}
        </p>
      </div>
      <span
        className="hidden size-14 place-items-center rounded-full font-serif text-xl md:grid"
        style={{ background: accent.wash, color: accent.ink }}
        aria-hidden
      >
        {accent.seal}
      </span>
    </Link>
  );
}
