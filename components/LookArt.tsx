import GarmentArt from "./GarmentArt";
import { getProduct } from "@/data/products";
import type { Look } from "@/data/site";

const LAYOUTS: Record<number, { left: string; top: string; width: string }[]> = {
  2: [
    { left: "6%", top: "6%", width: "47%" },
    { left: "50%", top: "16%", width: "44%" },
  ],
  3: [
    { left: "4%", top: "7%", width: "50%" },
    { left: "58%", top: "3%", width: "32%" },
    { left: "60%", top: "50%", width: "30%" },
  ],
};

/** A flat lay of the pieces in one look, on the look's own backdrop. */
export default function LookArt({ look, className = "" }: { look: Look; className?: string }) {
  const layout = LAYOUTS[look.pieces.length] ?? LAYOUTS[3];
  const names = look.pieces
    .map((p) => {
      const product = getProduct(p.product);
      return product ? `${product.name} in ${p.color.toLowerCase()}` : null;
    })
    .filter(Boolean)
    .join(", ");

  return (
    <div role="img" aria-label={`${look.title}: ${names}, laid flat`} className={`relative overflow-hidden ${className}`} style={{ background: look.tone }}>
      {look.pieces.map((piece, i) => {
        const product = getProduct(piece.product);
        const color = product?.colors.find((c) => c.name === piece.color) ?? product?.colors[0];
        if (!product || !color) return null;
        const pos = layout[i] ?? layout[0];
        return (
          <div key={piece.product} className="absolute" style={pos} aria-hidden="true">
            <GarmentArt garment={product.garment} hex={color.hex} label="" bare className="aspect-[4/5] w-full" />
          </div>
        );
      })}
    </div>
  );
}
