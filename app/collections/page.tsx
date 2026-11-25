import type { Metadata } from "next";
import Link from "next/link";
import GarmentArt from "@/components/GarmentArt";
import { collections, productsIn } from "@/data/products";

export const metadata: Metadata = {
  title: "Collections",
  description: "Outerwear, knitwear, shirts, trousers, dresses and accessories from the Arden Vale workroom.",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-12 sm:px-8 md:pt-16">
      <h1 className="display text-5xl md:text-7xl">Collections</h1>
      <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c, i) => {
          const items = productsIn(c.slug);
          const lead = items[0];
          return (
            <Link key={c.slug} href={`/collections/${c.slug}/`} className={`group block ${i % 3 === 1 ? "lg:mt-16" : ""}`}>
              {lead && (
                <GarmentArt
                  garment={lead.garment}
                  hex={lead.colors[0].hex}
                  label={`${lead.name} in ${lead.colors[0].name.toLowerCase()}`}
                  className="aspect-[4/5] w-full transition-opacity duration-200 group-hover:opacity-90"
                />
              )}
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h2 className="display text-3xl group-hover:text-oxblood">{c.name}</h2>
                <span className="text-sm tabular-nums text-muted">{items.length} {items.length === 1 ? "piece" : "pieces"}</span>
              </div>
              <p className="mt-2 text-sm text-ink-2">{c.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
