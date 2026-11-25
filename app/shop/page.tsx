import type { Metadata } from "next";
import Catalog from "@/components/Catalog";
import { products } from "@/data/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Coats, knits, shirts, trousers, dresses and scarves, filtered by size and color.",
};

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-5 pt-12 sm:px-8 md:pt-16">
      <div className="mb-12 grid gap-4 md:grid-cols-12">
        <h1 className="display text-5xl md:col-span-6 md:text-7xl">The shop</h1>
        <p className="self-end text-ink-2 md:col-span-5 md:col-start-8">
          {products.length} pieces this season, each made in a run of sixty or fewer. When a color is gone, it&apos;s
          usually gone for the year.
        </p>
      </div>
      <Catalog />
    </div>
  );
}
