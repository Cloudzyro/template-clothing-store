"use client";

import { useEffect, useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import { collections, products, type ColorFamily } from "@/data/products";

type Sort = "featured" | "newest" | "price-asc" | "price-desc";

const FAMILIES: { id: ColorFamily; label: string; hex: string }[] = [
  { id: "black", label: "Black", hex: "#1d1d1d" },
  { id: "grey", label: "Grey", hex: "#8f8f8b" },
  { id: "white", label: "White and oat", hex: "#e9e3d6" },
  { id: "brown", label: "Brown and camel", hex: "#8d6440" },
  { id: "red", label: "Red", hex: "#6b2230" },
  { id: "green", label: "Green", hex: "#5d6648" },
  { id: "blue", label: "Blue", hex: "#2f3e5c" },
];

const SORTS: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price, low to high" },
  { id: "price-desc", label: "Price, high to low" },
];

function toggle<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export default function Catalog({ fixedCollection }: { fixedCollection?: string }) {
  const [collection, setCollection] = useState<string>(fixedCollection ?? "all");
  const [sizes, setSizes] = useState<string[]>([]);
  const [colors, setColors] = useState<ColorFamily[]>([]);
  const [sort, setSort] = useState<Sort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Read filters from the address once, so links like /shop/?collection=knitwear land filtered.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const c = params.get("collection");
    if (!fixedCollection && c && collections.some((x) => x.slug === c)) setCollection(c);
    const s = params.get("sort") as Sort | null;
    if (s && SORTS.some((x) => x.id === s)) setSort(s);
    const size = params.get("size");
    if (size) setSizes(size.split(","));
    const color = params.get("color");
    if (color) setColors(color.split(",") as ColorFamily[]);
  }, [fixedCollection]);

  // Keep the address in step so a filtered view can be shared.
  useEffect(() => {
    const params = new URLSearchParams();
    if (!fixedCollection && collection !== "all") params.set("collection", collection);
    if (sizes.length) params.set("size", sizes.join(","));
    if (colors.length) params.set("color", colors.join(","));
    if (sort !== "featured") params.set("sort", sort);
    const query = params.toString();
    window.history.replaceState(null, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
  }, [collection, sizes, colors, sort, fixedCollection]);

  const inCollection = useMemo(
    () => (collection === "all" ? products : products.filter((p) => p.collection === collection)),
    [collection],
  );

  const sizeOptions = useMemo(() => {
    const all = Array.from(new Set(inCollection.flatMap((p) => p.sizes)));
    const order = ["XS", "S", "M", "L", "XL", "26", "28", "30", "32", "34", "36", "One size"];
    return all.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }, [inCollection]);

  const results = useMemo(() => {
    const list = inCollection.filter(
      (p) =>
        (sizes.length === 0 || p.sizes.some((s) => sizes.includes(s))) &&
        (colors.length === 0 || p.colors.some((c) => colors.includes(c.family))),
    );
    if (sort === "newest") return [...list].sort((a, b) => b.added.localeCompare(a.added));
    if (sort === "price-asc") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [inCollection, sizes, colors, sort]);

  const activeCount = sizes.length + colors.length + (!fixedCollection && collection !== "all" ? 1 : 0);
  const clear = () => {
    setSizes([]);
    setColors([]);
    if (!fixedCollection) setCollection("all");
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[240px_1fr] lg:gap-12">
      <div>
        <button
          type="button"
          className="btn btn-secondary w-full lg:hidden"
          aria-expanded={filtersOpen}
          aria-controls="filters"
          onClick={() => setFiltersOpen((v) => !v)}
        >
          {filtersOpen ? "Hide filters" : `Filters${activeCount ? ` (${activeCount})` : ""}`}
        </button>
        <form
          id="filters"
          aria-label="Filter products"
          onSubmit={(e) => e.preventDefault()}
          className={`mt-6 space-y-8 lg:sticky lg:top-24 lg:mt-0 lg:block ${filtersOpen ? "block" : "hidden"}`}
        >
          {!fixedCollection && (
            <fieldset>
              <legend className="text-sm text-muted">Collection</legend>
              <div className="mt-3 space-y-1">
                {[{ slug: "all", name: "Everything" }, ...collections].map((c) => (
                  <label key={c.slug} className="flex h-8 cursor-pointer items-center gap-3 text-sm">
                    <input
                      type="radio"
                      name="collection"
                      value={c.slug}
                      checked={collection === c.slug}
                      onChange={() => {
                        setCollection(c.slug);
                        setSizes([]);
                      }}
                      className="size-4 accent-oxblood"
                    />
                    {c.name}
                  </label>
                ))}
              </div>
            </fieldset>
          )}
          <fieldset>
            <legend className="text-sm text-muted">Size</legend>
            {[
              { label: "Tops and dresses", sizes: sizeOptions.filter((s) => /^[XSML]/.test(s)) },
              { label: "Waist, in inches", sizes: sizeOptions.filter((s) => /^\d/.test(s)) },
              { label: "Accessories", sizes: sizeOptions.filter((s) => s === "One size") },
            ]
              .filter((g) => g.sizes.length)
              .map((group) => (
                <div key={group.label} className="mt-3">
                  <p className="text-xs text-muted">{group.label}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.sizes.map((s) => {
                      const on = sizes.includes(s);
                      return (
                        <label
                          key={s}
                          className={`flex h-9 min-w-11 cursor-pointer items-center justify-center border px-3 text-sm tabular-nums transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-oxblood ${
                            on ? "border-ink bg-ink text-chalk" : "border-ink/20 hover:border-ink"
                          }`}
                        >
                          <input type="checkbox" className="sr-only" checked={on} onChange={() => setSizes((v) => toggle(v, s))} />
                          {s}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
          </fieldset>
          <fieldset>
            <legend className="text-sm text-muted">Color</legend>
            <div className="mt-3 space-y-1">
              {FAMILIES.map((f) => (
                <label key={f.id} className="flex h-8 cursor-pointer items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={colors.includes(f.id)}
                    onChange={() => setColors((v) => toggle(v, f.id))}
                    className="size-4 accent-oxblood"
                  />
                  <span className="size-3 border border-ink/20" style={{ background: f.hex }} aria-hidden="true" />
                  {f.label}
                </label>
              ))}
            </div>
          </fieldset>
          {activeCount > 0 && (
            <button type="button" onClick={clear} className="link text-sm">
              Clear filters
            </button>
          )}
        </form>
      </div>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-4">
          <p className="text-sm text-ink-2" aria-live="polite">
            <span className="tabular-nums">{results.length}</span> {results.length === 1 ? "piece" : "pieces"}
          </p>
          <label className="flex items-center gap-3 text-sm">
            <span className="text-muted">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="h-9 border border-ink/20 bg-paper px-2"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        {results.length === 0 ? (
          <div className="py-20">
            <p className="display text-3xl">Nothing in that combination</p>
            <p className="mt-3 text-ink-2">Try another size or color, or clear the filters.</p>
            <button type="button" onClick={clear} className="btn btn-secondary mt-6">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 xl:grid-cols-3">
            {results.map((p) => {
              const match = colors.length ? p.colors.find((c) => colors.includes(c.family))?.name : undefined;
              return <ProductCard key={p.slug} product={p} color={match} />;
            })}
          </div>
        )}
      </div>
    </div>
  );
}
