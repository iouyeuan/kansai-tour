import { Link } from "wouter";
import InteractiveMap from "@/components/InteractiveMap";
import { usePageTitle } from "@/hooks/usePageTitle";
import { accommodationIntro, stayBlocks, stayWarnings, stays } from "@/lib/accommodationData";

export default function Accommodation() {
  usePageTitle("住宿");

  return (
    <article>
      <p className="text-sm tracking-[0.18em] text-beni">{accommodationIntro.eyebrow}</p>
      <h1 className="mt-2 font-serif text-4xl font-semibold">{accommodationIntro.title}</h1>
      <p className="mt-4 max-w-3xl leading-8">{accommodationIntro.body}</p>

      <div className="mt-8 space-y-6">
        {stays.map((stay) => (
          <section key={stay.id} className="rounded-3xl border border-line bg-white/45 p-5">
            <p className="text-sm text-muted">{stay.nights}</p>
            <h2 className="mt-1 font-serif text-3xl">{stay.name}</h2>
            <p className="mt-1 text-muted">{stay.nameJa}</p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                ["入住", stay.checkIn],
                ["退房", stay.checkOut],
                ["早餐", stay.breakfast],
                ["電話", stay.phone],
              ].map(([label, value]) => (
                <div key={label} className="rounded-2xl border border-line bg-white/60 p-4">
                  <dt className="text-sm text-muted">{label}</dt>
                  <dd className="mt-1">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-4">
              <h3 className="font-serif text-xl">地址</h3>
              <p className="mt-2">{stay.address}</p>
              <p className="text-sm text-muted">{stay.addressZh}</p>
              <p className="mt-3 leading-7">{stay.access}</p>
              <p className="mt-3 text-sm">
                官網：
                <a className="text-beni underline" href={stay.website} target="_blank" rel="noreferrer">
                  {stay.name}
                </a>
              </p>
            </div>
          </section>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {stayBlocks.map((block) => (
          <section key={block.title} className="rounded-3xl bg-paper-2/70 p-4">
            <h2 className="font-serif text-xl">{block.title}</h2>
            <p className="mt-2 text-sm leading-7">{block.body}</p>
          </section>
        ))}
      </div>

      <ul className="mt-6 space-y-2 text-sm leading-7">
        {stayWarnings.map((warning) => (
          <li key={warning} className="rounded-2xl border border-beni/30 px-4 py-3">
            {warning}
          </li>
        ))}
      </ul>

      <div className="no-print mt-6">
        <InteractiveMap markerIds={["hotel-namba", "hotel-sakai"]} className="h-80" />
        <p className="mt-2 text-sm text-muted">
          兩顆金點是東橫INN大阪難波日本橋與東橫INN大阪堺東駅。
          <Link href="/map?place=hotel-namba" className="ml-2 text-beni">
            難波日本橋
          </Link>
          <Link href="/map?place=hotel-sakai" className="ml-2 text-beni">
            堺東
          </Link>
        </p>
      </div>
    </article>
  );
}
