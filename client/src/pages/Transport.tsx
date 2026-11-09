import { Link } from "wouter";
import { usePageTitle } from "@/hooks/usePageTitle";
import { mistakes, sakaiDirection, transitPlans, transportPrinciples } from "@/lib/transportData";

export default function Transport() {
  usePageTitle("交通");

  return (
    <article>
      <h1 className="font-serif text-4xl font-semibold">交通</h1>
      <p className="mt-3 max-w-3xl leading-8">
        沒有租車。11/16–18 用 KANSAI RAILWAY PASS LITE，其餘天用 ICOCA。京都走京阪或阪急，不走 JR 與京都市營地鐵。高野山的山內巴士另買。金額是參考，特急券與紅葉季門票分開算。
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {transportPrinciples.map((item) => (
          <section key={item.title} className="rounded-3xl border border-line p-4">
            <h2 className="font-serif text-xl">{item.title}</h2>
            <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
          </section>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="font-serif text-3xl">先看終點</h2>
        <div className="mt-4 overflow-x-auto rounded-3xl border border-line">
          <table className="w-full min-w-[36rem] text-left text-sm">
            <thead className="bg-ink text-paper">
              <tr>
                <th className="px-4 py-3 font-medium">要去</th>
                <th className="px-4 py-3 font-medium">終點方向</th>
                <th className="px-4 py-3 font-medium">不要搭</th>
              </tr>
            </thead>
            <tbody>
              {sakaiDirection.map((row) => (
                <tr key={row.going} className="border-t border-line">
                  <th className="px-4 py-3 font-medium">{row.going}</th>
                  <td className="px-4 py-3">{row.bound}</td>
                  <td className="px-4 py-3 text-muted">{row.avoid}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-10 space-y-8">
        {transitPlans.map((plan) => (
          <section key={plan.day} id={`day-${plan.day}`} className="scroll-mt-24">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 className="font-serif text-2xl">
                第 {plan.day} 天・{plan.heading}
              </h2>
              <Link href={`/day/${plan.day}`} className="text-sm text-beni">
                看當天行程
              </Link>
            </div>
            <p className="mt-2 rounded-2xl bg-beni/10 px-4 py-3 text-sm">{plan.caution}</p>
            <ol className="mt-4 space-y-3">
              {plan.steps.map((step, index) => (
                <li key={step.title} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="grid size-8 place-items-center rounded-full bg-ink text-sm text-paper">{index + 1}</span>
                  <div>
                    <h3 className="font-medium">{step.title}</h3>
                    {step.sign ? <p className="mt-1 font-serif text-beni">{step.sign}</p> : null}
                    <p className="mt-1 text-sm leading-7 text-muted">{step.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-serif text-3xl">容易搭錯的幾件事</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {mistakes.map((item) => (
            <article key={item.title} className="rounded-3xl border border-line p-4">
              <h3 className="font-serif text-xl">{item.title}</h3>
              <p className="mt-2 text-sm leading-7">{item.body}</p>
            </article>
          ))}
        </div>
      </section>
    </article>
  );
}
