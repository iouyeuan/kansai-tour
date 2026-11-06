import { Link } from "wouter";
import InteractiveMap from "@/components/InteractiveMap";
import { usePageTitle } from "@/hooks/usePageTitle";
import { accommodation, stayFacts } from "@/lib/accommodationData";

export default function Accommodation() {
  usePageTitle("住宿");

  return (
    <article>
      <p className="text-sm tracking-[0.18em] text-beni">五晚同一間</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">{accommodation.name}</h1>
      <p className="mt-2 text-muted">{accommodation.nameJa}</p>
      <p className="mt-4 max-w-3xl leading-8">{accommodation.areaBody}</p>

      <dl className="mt-6 grid gap-3 sm:grid-cols-2">
        {stayFacts.map((fact) => (
          <div key={fact.label} className="rounded-2xl border border-line bg-white/45 p-4">
            <dt className="text-sm text-muted">{fact.label}</dt>
            <dd className="mt-1">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-6 rounded-3xl border border-line p-5">
        <h2 className="font-serif text-2xl">地址</h2>
        <p className="mt-2">{accommodation.address}</p>
        <p className="text-sm text-muted">{accommodation.addressZh}</p>
        <p className="mt-3">{accommodation.access}</p>
        <p className="mt-3 text-sm">
          官網：
          <a className="text-beni underline" href={accommodation.website} target="_blank" rel="noreferrer">
            東橫INN 大阪堺駅前
          </a>
        </p>
      </section>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {accommodation.blocks.map((block) => (
          <section key={block.title} className="rounded-3xl bg-paper-2/70 p-4">
            <h2 className="font-serif text-xl">{block.title}</h2>
            <p className="mt-2 text-sm leading-7">{block.body}</p>
          </section>
        ))}
      </div>

      <ul className="mt-6 space-y-2 text-sm leading-7">
        {accommodation.warnings.map((warning) => (
          <li key={warning} className="rounded-2xl border border-beni/30 px-4 py-3">
            {warning}
          </li>
        ))}
      </ul>

      <div className="no-print mt-6">
        <InteractiveMap days={[1]} hideOptional className="h-80" activeId="hotel" />
        <p className="mt-2 text-sm text-muted">
          金點是飯店，旁邊是南海堺站。
          <Link href="/map?place=hotel" className="ml-2 text-beni">
            到全圖查看
          </Link>
        </p>
      </div>
    </article>
  );
}
