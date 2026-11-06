import { BedDouble, Clock, Landmark, Plane, TrainFront, Utensils } from "lucide-react";
import type { Activity, ActivityKind } from "@/lib/types";

const kindMeta: Record<ActivityKind, { label: string; icon: typeof Plane }> = {
  flight: { label: "航班", icon: Plane },
  transit: { label: "移動", icon: TrainFront },
  stay: { label: "住宿", icon: BedDouble },
  sight: { label: "參觀", icon: Landmark },
  food: { label: "用餐", icon: Utensils },
  buffer: { label: "緩衝", icon: Clock },
};

export default function ActivityTimeline({ activities }: { activities: Activity[] }) {
  return (
    <ol className="space-y-0">
      {activities.map((activity, index) => {
        const meta = kindMeta[activity.kind];
        const Icon = meta.icon;
        return (
          <li key={`${activity.time}-${activity.title}`} className="grid grid-cols-[5.5rem_1fr] gap-3 sm:grid-cols-[6.5rem_1fr]">
            <p className="pt-4 text-right font-serif text-sm font-semibold text-beni">{activity.time}</p>
            <article className="relative border-l border-line pb-6 pl-5">
              <span className="absolute -left-[5px] top-5 size-2.5 rounded-full bg-beni" aria-hidden />
              <div className="rounded-2xl border border-line bg-white/50 p-4">
                <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                  <Icon className="size-3.5" aria-hidden />
                  <span>{meta.label}</span>
                  {activity.optional ? (
                    <span className="rounded-full bg-paper-2 px-2 py-0.5 text-ink">可選</span>
                  ) : null}
                  {index === 0 ? <span className="sr-only">開始</span> : null}
                </div>
                <h3 className="mt-1 font-serif text-xl font-semibold">{activity.title}</h3>
                <p className="mt-2 text-sm leading-7">{activity.detail}</p>
                {activity.tips?.length ? (
                  <ul className="mt-3 space-y-1 text-sm text-muted">
                    {activity.tips.map((tip) => (
                      <li key={tip}>・{tip}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}
