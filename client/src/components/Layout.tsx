import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { Menu, Printer, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "總覽" },
  { href: "/map", label: "地圖" },
  { href: "/transport", label: "交通" },
  { href: "/stay", label: "住宿" },
  { href: "/sights", label: "景點" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    const id = window.location.hash.replace("#", "");
    if (id) {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ block: "start" });
      });
      return;
    }
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-paper focus:px-3 focus:py-2"
      >
        跳到內容
      </a>
      <header className="no-print sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-serif text-lg font-semibold tracking-wide">
            <span className="grid size-8 place-items-center rounded-full bg-beni text-sm text-paper">楓</span>
            關西六日
          </Link>
          <nav className="ml-auto hidden items-center gap-1 md:flex" aria-label="主要">
            {links.map((link) => {
              const active = link.href === "/" ? location === "/" : location.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3 py-1.5 text-sm",
                    active ? "bg-ink text-paper" : "text-ink hover:bg-paper-2",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/print"
              className="ml-2 inline-flex items-center gap-1 rounded-full border border-beni px-3 py-1.5 text-sm text-beni hover:bg-beni hover:text-paper"
            >
              <Printer className="size-4" aria-hidden />
              列印
            </Link>
          </nav>
          <button
            type="button"
            className="ml-auto grid size-10 place-items-center rounded-full border border-line md:hidden"
            aria-expanded={open}
            aria-label={open ? "關閉選單" : "打開選單"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {open ? (
          <nav className="border-t border-line px-4 py-3 md:hidden" aria-label="手機選單">
            <ul className="grid gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="block rounded-xl px-3 py-2 hover:bg-paper-2">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/print" className="block rounded-xl px-3 py-2 text-beni">
                  列印／存成 PDF
                </Link>
              </li>
            </ul>
          </nav>
        ) : null}
      </header>
      <main id="content" className="mx-auto max-w-6xl px-4 py-8">
        {children}
      </main>
      <footer className="border-t border-line px-4 py-8 text-sm text-muted">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p>2026/11/15–11/20・高雄往返關西・住南海堺站前。</p>
          <p>車資與門票都是參考，以當天閘門與入口公告為準。</p>
        </div>
      </footer>
    </div>
  );
}
