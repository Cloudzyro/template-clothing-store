"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "./CartProvider";
import { site } from "@/data/site";

export default function Header() {
  const { count, open } = useCart();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-chalk">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="display text-[26px] leading-none tracking-[-0.01em]">
          {site.name}
        </Link>
        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-8 text-sm">
            {site.nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`py-2 transition-colors ${active ? "text-ink underline decoration-oxblood decoration-1 underline-offset-[6px]" : "text-ink-2 hover:text-ink"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-5 text-sm">
          <button type="button" onClick={open} className="py-2 hover:text-oxblood">
            Bag <span className="tabular-nums text-muted">({count})</span>
          </button>
          <button
            type="button"
            className="py-2 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav id="mobile-menu" aria-label="Main" className="border-t border-line md:hidden">
          <ul className="px-5 py-2">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="block py-3 text-lg">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
