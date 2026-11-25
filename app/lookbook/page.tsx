import type { Metadata } from "next";
import Link from "next/link";
import LookArt from "@/components/LookArt";
import { formatPrice, getProduct } from "@/data/products";
import { lookbook } from "@/data/site";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "Five looks from the Arden Vale fall and winter 2026 season, with every piece linked to the shop.",
};

export default function LookbookPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-12 sm:px-8 md:pt-16">
      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7">
          <p className="text-sm text-muted">Lookbook</p>
          <h1 className="display mt-3 text-5xl md:text-7xl">{lookbook.title}</h1>
        </div>
        <p className="self-end text-ink-2 md:col-span-4 md:col-start-9">{lookbook.intro}</p>
      </div>

      <div className="mt-16 space-y-24 md:space-y-32">
        {lookbook.looks.map((look, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={look.slug} id={look.slug} aria-labelledby={`${look.slug}-title`} className="grid items-end gap-8 md:grid-cols-12">
              <LookArt look={look} className={`aspect-[4/3] md:col-span-8 ${flip ? "md:order-2 md:col-start-5" : ""}`} />
              <div className={`md:col-span-4 ${flip ? "md:order-1 md:col-start-1 md:row-start-1" : ""}`}>
                <p className="text-sm tabular-nums text-muted">
                  Look {i + 1} of {lookbook.looks.length}
                </p>
                <h2 id={`${look.slug}-title`} className="display mt-2 text-4xl">
                  {look.title}
                </h2>
                <p className="mt-3 text-ink-2">{look.caption}</p>
                <ul className="mt-6 divide-y divide-line border-y border-line text-sm">
                  {look.pieces.map((piece) => {
                    const product = getProduct(piece.product);
                    if (!product) return null;
                    return (
                      <li key={piece.product}>
                        <Link
                          href={`/product/${product.slug}/?color=${encodeURIComponent(piece.color)}`}
                          className="flex items-baseline justify-between gap-4 py-3 hover:text-oxblood"
                        >
                          <span>
                            {product.name} <span className="text-muted">in {piece.color.toLowerCase()}</span>
                          </span>
                          <span className="tabular-nums">{formatPrice(product.price)}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
