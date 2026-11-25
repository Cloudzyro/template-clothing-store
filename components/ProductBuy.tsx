"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "./CartProvider";
import GarmentArt from "./GarmentArt";
import { formatPrice, type Product } from "@/data/products";
import { sizeCharts } from "@/data/site";

const VIEWS = [
  { id: "front", label: "Front" },
  { id: "back", label: "Back" },
  { id: "detail", label: "Close up" },
] as const;

export default function ProductBuy({ product }: { product: Product }) {
  const { add } = useCart();
  const [colorName, setColorName] = useState(product.colors[0].name);
  const [size, setSize] = useState<string | null>(product.sizes.length === 1 ? product.sizes[0] : null);
  const [view, setView] = useState<(typeof VIEWS)[number]["id"]>("front");
  const [needsSize, setNeedsSize] = useState(false);
  const guide = useRef<HTMLDialogElement>(null);
  const chart = sizeCharts[product.sizing];
  const color = product.colors.find((c) => c.name === colorName) ?? product.colors[0];

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get("color");
    if (c && product.colors.some((x) => x.name === c)) setColorName(c);
  }, [product.colors]);

  function addToBag() {
    if (!size) {
      setNeedsSize(true);
      return;
    }
    const links = product.variantLinks ?? {};
    const paymentLink = links[`${color.name} / ${size}`] ?? links[color.name] ?? links[size] ?? product.paymentLink;
    add({
      slug: product.slug,
      name: product.name,
      price: product.price,
      color: color.name,
      colorHex: color.hex,
      garment: product.garment,
      size: product.sizing === "one" ? undefined : size,
      paymentLink,
    });
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        <GarmentArt
          garment={product.garment}
          hex={color.hex}
          view={view}
          label={`${product.name} in ${color.name.toLowerCase()}, ${VIEWS.find((v) => v.id === view)?.label.toLowerCase()} view`}
          className="aspect-[4/5] w-full"
        />
        <div className="mt-3 grid grid-cols-3 gap-3" role="group" aria-label="Views">
          {VIEWS.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setView(v.id)}
              aria-pressed={view === v.id}
              className={`border-b-2 pb-2 text-left transition-colors ${view === v.id ? "border-ink" : "border-transparent hover:border-ink/30"}`}
            >
              <GarmentArt garment={product.garment} hex={color.hex} view={v.id} label="" className="aspect-[4/3] w-full" />
              <span className="mt-2 block text-sm text-ink-2">{v.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-24">
          <h1 className="display text-5xl sm:text-6xl">{product.name}</h1>
          <p className="mt-4 text-xl tabular-nums">{formatPrice(product.price)}</p>
          <p className="mt-6 text-ink-2">{product.description}</p>

          <fieldset className="mt-8">
            <legend className="text-sm">
              Color <span className="text-muted">{color.name}</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.colors.map((c) => (
                <label
                  key={c.name}
                  title={c.name}
                  className={`grid size-11 cursor-pointer place-items-center border transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-oxblood ${
                    c.name === color.name ? "border-ink" : "border-transparent hover:border-ink/30"
                  }`}
                >
                  <input
                    type="radio"
                    name="color"
                    className="sr-only"
                    checked={c.name === color.name}
                    onChange={() => setColorName(c.name)}
                  />
                  <span className="size-8 border border-ink/15" style={{ background: c.hex }} />
                  <span className="sr-only">{c.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {product.sizing !== "one" && (
            <fieldset className="mt-8">
              <div className="flex items-baseline justify-between">
                <legend className="text-sm">
                  Size {size && <span className="text-muted">{size}</span>}
                </legend>
                <button type="button" className="link text-sm" onClick={() => guide.current?.showModal()}>
                  Size guide
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <label
                    key={s}
                    className={`flex h-11 min-w-14 cursor-pointer items-center justify-center border px-3 text-sm tabular-nums transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-oxblood ${
                      s === size ? "border-ink bg-ink text-chalk" : "border-ink/20 hover:border-ink"
                    }`}
                  >
                    <input
                      type="radio"
                      name="size"
                      className="sr-only"
                      checked={s === size}
                      onChange={() => {
                        setSize(s);
                        setNeedsSize(false);
                      }}
                    />
                    {s}
                  </label>
                ))}
              </div>
              {needsSize && (
                <p className="mt-3 text-sm text-oxblood" role="alert">
                  Choose a size first
                </p>
              )}
            </fieldset>
          )}

          <button type="button" className="btn btn-primary mt-8 w-full" onClick={addToBag}>
            Add to bag
          </button>
          <p className="mt-4">
            <span className="care-label">{product.fit}</span>
          </p>

          <dl className="mt-10 divide-y divide-line border-y border-line text-sm">
            <div className="grid grid-cols-[96px_1fr] gap-4 py-4">
              <dt className="text-muted">Details</dt>
              <dd>
                <ul className="space-y-1">
                  {product.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="grid grid-cols-[96px_1fr] gap-4 py-4">
              <dt className="text-muted">Cloth</dt>
              <dd>{product.fabric}</dd>
            </div>
            <div className="grid grid-cols-[96px_1fr] gap-4 py-4">
              <dt className="text-muted">Care</dt>
              <dd>{product.care}</dd>
            </div>
          </dl>
        </div>
      </div>

      <dialog
        ref={guide}
        aria-labelledby="size-guide-title"
        className="m-auto w-[min(640px,calc(100vw-32px))] bg-chalk p-0 text-ink backdrop:bg-ink/40"
        onClick={(e) => {
          if (e.target === guide.current) guide.current?.close();
        }}
      >
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 id="size-guide-title" className="display text-3xl">
                Size guide
              </h2>
              <p className="mt-1 text-sm text-muted">
                {chart.title}, in {chart.unit}
              </p>
            </div>
            <form method="dialog">
              <button className="link text-sm" autoFocus>
                Close
              </button>
            </form>
          </div>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm tabular-nums">
              <thead>
                <tr className="border-b border-ink">
                  {chart.columns.map((c) => (
                    <th key={c} scope="col" className="py-2 pr-4 font-medium">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chart.rows.map((row) => (
                  <tr key={row[0]} className={`border-b border-line ${row[0] === size ? "bg-raised" : ""}`}>
                    {row.map((cell, i) =>
                      i === 0 ? (
                        <th key={i} scope="row" className="py-3 pr-4 font-medium">
                          {cell}
                        </th>
                      ) : (
                        <td key={i} className="py-3 pr-4 text-ink-2">
                          {cell}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm text-ink-2">{chart.note}</p>
          <p className="mt-3 text-sm text-ink-2">
            <span className="font-medium text-ink">This piece:</span> {product.fit}
          </p>
        </div>
      </dialog>
    </div>
  );
}
