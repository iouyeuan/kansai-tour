import { Link } from "wouter";
import DayCard from "@/components/DayCard";
import { usePageTitle } from "@/hooks/usePageTitle";
import { days, tripInfo } from "@/lib/itineraryData";

export default function Home() {
  usePageTitle();

  return (
    <div>
      <section className="grid items-end gap-8 border-b border-line pb-10 lg:grid-cols-[1.4fr_0.8fr]">
        <div>
          <p className="text-sm tracking-[0.22em] text-beni">2026 秋季・高雄往返</p>
          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight sm:text-6xl">{tripInfo.headline}</h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-ink/90">{tripInfo.subtitle}</p>
          <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-2xl border border-line bg-white/40 p-3">
              <dt className="text-muted">日期</dt>
              <dd className="mt-1 font-medium leading-snug">
                2026/11/15（日）
                <span className="mt-1 block text-muted">至 11/20（五）</span>
              </dd>
            </div>
            <div className="rounded-2xl border border-line bg-white/40 p-3">
              <dt className="text-muted">住宿</dt>
              <dd className="mt-1 font-medium">{tripInfo.base}</dd>
            </div>
            <div className="rounded-2xl border border-line bg-white/40 p-3">
              <dt className="text-muted">航班</dt>
              <dd className="mt-1 font-medium">{tripInfo.carrier}</dd>
            </div>
          </dl>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/map" className="rounded-full bg-ink px-4 py-2 text-sm text-paper">
              打開地圖
            </Link>
            <Link href="/transport" className="rounded-full border border-line bg-white/50 px-4 py-2 text-sm">
              先看怎麼搭
            </Link>
            <Link href="/print" className="rounded-full border border-beni px-4 py-2 text-sm text-beni">
              列印／存 PDF
            </Link>
          </div>
        </div>
        <aside className="rounded-3xl border border-line bg-beni px-5 py-6 text-paper">
          <p className="font-serif text-5xl leading-none">11/15</p>
          <p className="mt-1 font-serif text-2xl">– 11/20</p>
          <p className="mt-4 text-sm leading-7 text-paper/90">
            六天五夜。和歌山一天看城，京都三天看楓與銀杏，最後一天只負責準時起飛。全程不排清水寺。
          </p>
        </aside>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2" aria-label="航班">
        {tripInfo.flights.map((flight) => (
          <article key={flight.id} className="rounded-3xl border border-line bg-white/45 p-5">
            <p className="text-xs tracking-[0.16em] text-muted">
              {flight.label}・{flight.date}・{tripInfo.carrier}
            </p>
            <div className="mt-3 flex items-end justify-between gap-4">
              <p>
                <span className="block text-sm text-muted">起飛</span>
                <span className="font-serif text-3xl">{flight.depart}</span>
                <span className="mt-1 block text-sm">{flight.from}</span>
              </p>
              <span className="pb-6 text-muted" aria-hidden>
                →
              </span>
              <p className="text-right">
                <span className="block text-sm text-muted">抵達</span>
                <span className="font-serif text-3xl">{flight.arrive}</span>
                <span className="mt-1 block text-sm">{flight.to}</span>
              </p>
            </div>
            <p className="mt-3 text-sm leading-6 text-muted">{flight.note}</p>
          </article>
        ))}
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        {tripInfo.principles.map((item) => (
          <article key={item.title} className="rounded-3xl border border-line p-5">
            <h2 className="font-serif text-xl">{item.title}</h2>
            <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
          </article>
        ))}
      </section>

      <section className="mt-12" aria-labelledby="days-heading">
        <div className="flex items-end justify-between gap-4">
          <h2 id="days-heading" className="font-serif text-3xl">
            六日
          </h2>
          <p className="text-sm text-muted">點一天看時間軸</p>
        </div>
        <div className="mt-2">
          {days.map((day) => (
            <DayCard key={day.id} day={day} />
          ))}
        </div>
      </section>
    </div>
  );
}
