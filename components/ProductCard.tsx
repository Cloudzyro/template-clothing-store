import Link from "next/link";
import GarmentArt from "./GarmentArt";
import { formatPrice, type Product } from "@/data/products";

export default function ProductCard({ product, color }: { product: Product; color?: string }) {
  const colorway = product.colors.find((c) => c.name === color) ?? product.colors[0];
  const href = `/product/${product.slug}/${color ? `?color=${encodeURIComponent(colorway.name)}` : ""}`;
  return (
    <article className="group">
      <Link href={href} className="block">
        <div className="overflow-hidden">
          <GarmentArt
            garment={product.garment}
            hex={colorway.hex}
            label={`${product.name} in ${colorway.name.toLowerCase()}, drawn flat`}
            className="aspect-[4/5] w-full transition-opacity duration-200 group-hover:opacity-90"
          />
        </div>
        <div className="mt-3 flex items-baseline justify-between gap-3">
          <h3 className="font-medium group-hover:text-oxblood">{product.name}</h3>
          <p className="tabular-nums text-ink-2">{formatPrice(product.price)}</p>
        </div>
      </Link>
      <div className="mt-2 flex items-center gap-2" aria-label="Colors">
        {product.colors.map((c) => (
          <span
            key={c.name}
            title={c.name}
            className="size-3 border border-ink/20"
            style={{ background: c.hex }}
          />
        ))}
        <span className="sr-only">{product.colors.map((c) => c.name).join(", ")}</span>
        <span className="ml-1 text-xs text-muted">
          {product.colors.length} {product.colors.length === 1 ? "color" : "colors"}
        </span>
      </div>
    </article>
  );
}
