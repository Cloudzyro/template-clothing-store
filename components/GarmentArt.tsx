import { useId } from "react";
import type { Garment } from "@/data/products";

// Flat garment drawings, made in code so there are no photos to license.
// Each garment is drawn laid flat on a swatch tinted from its colorway.

type View = "front" | "back" | "detail";

function hexToRgb(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function toHex([r, g, b]: number[]) {
  return `#${[r, g, b].map((v) => Math.round(Math.max(0, Math.min(255, v))).toString(16).padStart(2, "0")).join("")}`;
}

export function mix(a: string, b: string, amount: number) {
  const x = hexToRgb(a);
  const y = hexToRgb(b);
  return toHex(x.map((v, i) => v + (y[i] - v) * amount));
}

export function luminance(hex: string) {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** The swatch behind a garment: the page's chalk with a little of the cloth in it. */
export function swatchFor(hex: string) {
  return luminance(hex) > 0.55 ? "#dcd6cb" : mix(hex, "#ece8e1", 0.84);
}

type Tones = { fill: string; shade: string; line: string; trim: string };

function tonesFor(hex: string): Tones {
  const dark = luminance(hex) < 0.06;
  return {
    fill: hex,
    shade: dark ? mix(hex, "#ffffff", 0.08) : mix(hex, "#000000", 0.12),
    line: dark ? mix(hex, "#ffffff", 0.22) : mix(hex, "#000000", 0.3),
    trim: dark ? mix(hex, "#ffffff", 0.3) : mix(hex, "#000000", 0.42),
  };
}

const mirror = "translate(400 0) scale(-1 1)";

function Mirrored({ children }: { children: React.ReactNode }) {
  return (
    <>
      <g>{children}</g>
      <g transform={mirror}>{children}</g>
    </>
  );
}

function drawing(garment: Garment, t: Tones, front: boolean) {
  const seam = { fill: "none", stroke: t.line, strokeWidth: 2, strokeLinecap: "round" as const };
  const button = (cx: number, cy: number, r = 5) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={t.trim} />;

  switch (garment) {
    case "coat":
      return (
        <>
          <Mirrored>
            <path d="M142 80 L94 100 L66 306 L98 312 L128 168 Z" fill={t.fill} />
            <path d="M68 290 L98 296 L96 312 L66 306 Z" fill={t.shade} />
          </Mirrored>
          <path
            d="M142 80 Q168 70 186 74 L200 118 L214 74 Q232 70 258 80 L272 168 L284 444 Q200 456 116 444 L128 168 Z"
            fill={t.fill}
          />
          {front ? (
            <>
              <Mirrored>
                <path d="M186 74 L160 94 L176 152 L200 214 L200 118 Z" fill={t.shade} />
                <path d="M138 322 L180 317" {...seam} />
              </Mirrored>
              <path d="M170 72 Q200 60 230 72 L214 74 L200 92 L186 74 Z" fill={t.line} />
              <path d="M210 214 L210 444" {...seam} />
              {[258, 306, 354].map((y) => button(222, y, 6))}
            </>
          ) : (
            <>
              <path d="M168 72 Q200 62 232 72 L226 92 Q200 84 174 92 Z" fill={t.shade} />
              <path d="M200 92 L200 444" {...seam} />
              <path d="M200 360 L200 444 M200 360 L214 444" {...seam} />
            </>
          )}
        </>
      );
    case "jacket":
      return (
        <>
          <Mirrored>
            <path d="M140 82 L98 102 L76 302 L106 308 L128 172 Z" fill={t.fill} />
            <path d="M78 286 L106 292 L106 308 L76 302 Z" fill={t.shade} />
          </Mirrored>
          <path d="M140 82 Q170 72 186 76 L200 100 L214 76 Q230 72 260 82 L274 152 L282 334 L118 334 L126 152 Z" fill={t.fill} />
          {front ? (
            <>
              <Mirrored>
                <path d="M186 76 L156 88 L176 126 L200 100 Z" fill={t.line} />
                <rect x="138" y="236" width="46" height="52" fill="none" stroke={t.line} strokeWidth="2" />
              </Mirrored>
              <rect x="214" y="134" width="36" height="38" fill="none" stroke={t.line} strokeWidth="2" />
              <path d="M200 100 L200 334" {...seam} />
              {[144, 192, 240, 288].map((y) => button(200, y, 6))}
            </>
          ) : (
            <>
              <path d="M170 74 Q200 64 230 74 L226 92 Q200 86 174 92 Z" fill={t.line} />
              <path d="M126 186 L274 186" {...seam} />
            </>
          )}
        </>
      );
    case "shirt":
      return (
        <>
          <Mirrored>
            <path d="M146 84 L104 104 L86 322 L116 326 L132 172 Z" fill={t.fill} />
            <path d="M88 300 L117 305 L116 326 L86 322 Z" fill={t.shade} />
          </Mirrored>
          <path d="M146 84 L178 72 L200 92 L222 72 L254 84 L268 152 L272 404 Q200 416 128 404 L132 152 Z" fill={t.fill} />
          {front ? (
            <>
              <path d="M178 72 L174 60 Q200 54 226 60 L222 72 L200 92 Z" fill={t.shade} />
              <Mirrored>
                <path d="M178 72 L200 92 L184 112 Z" fill={t.shade} />
              </Mirrored>
              <rect x="194" y="92" width="12" height="318" fill={t.shade} />
              <rect x="218" y="134" width="34" height="38" fill="none" stroke={t.line} strokeWidth="2" />
              {[130, 182, 234, 286, 338].map((y) => button(200, y, 4))}
            </>
          ) : (
            <>
              <path d="M174 62 Q200 54 226 62 L222 76 Q200 70 178 76 Z" fill={t.shade} />
              <path d="M132 128 Q200 140 268 128" {...seam} />
            </>
          )}
        </>
      );
    case "knit":
    case "cardigan": {
      const cardigan = garment === "cardigan";
      return (
        <>
          <Mirrored>
            <path d="M148 84 L104 106 L84 342 L116 346 L134 172 Z" fill={t.fill} />
            <path d="M86 320 L118 325 L116 346 L84 342 Z" fill={t.shade} />
          </Mirrored>
          <path d="M148 84 Q200 94 252 84 L270 152 L274 394 L126 394 L130 152 Z" fill={t.fill} />
          <rect x="126" y="370" width="148" height="24" fill={t.shade} />
          {front && cardigan ? (
            <>
              <path d="M172 82 L200 156 L228 82" fill="none" stroke={t.shade} strokeWidth="10" />
              <rect x="194" y="156" width="12" height="238" fill={t.shade} />
              {[176, 208, 240, 272, 304, 336, 366].map((y) => button(200, y, 3.5))}
            </>
          ) : (
            <path d="M172 82 Q200 106 228 82" fill="none" stroke={t.shade} strokeWidth="10" />
          )}
          {Array.from({ length: 18 }, (_, i) => (
            <path key={i} d={`M${132 + i * 8} 374 L${132 + i * 8} 390`} stroke={t.line} strokeWidth="1.5" opacity="0.5" />
          ))}
        </>
      );
    }
    case "tee":
      return (
        <>
          <Mirrored>
            <path d="M152 94 L104 114 L88 194 L130 204 L138 146 Z" fill={t.fill} />
            <path d="M90 182 L131 192 L130 204 L88 194 Z" fill={t.shade} />
          </Mirrored>
          <path d="M152 94 Q200 108 248 94 L262 146 L266 384 L134 384 L138 146 Z" fill={t.fill} />
          <path
            d={front ? "M176 92 Q200 112 224 92" : "M174 94 Q200 102 226 94"}
            fill="none"
            stroke={t.shade}
            strokeWidth="8"
          />
          <path d="M134 370 L266 370" {...seam} opacity="0.6" />
        </>
      );
    case "trousers":
      return (
        <>
          <path d="M140 92 L260 92 L280 462 L214 462 L200 184 L186 462 L120 462 Z" fill={t.fill} />
          <rect x="138" y="70" width="124" height="24" fill={t.shade} />
          <Mirrored>
            <path d="M120 448 L186 448 L186 462 L120 462 Z" fill={t.shade} />
            {front ? <path d="M168 94 L160 300" {...seam} /> : <rect x="150" y="116" width="34" height="34" fill="none" stroke={t.line} strokeWidth="2" />}
            {front ? <path d="M146 96 L162 152" {...seam} /> : null}
          </Mirrored>
          {front ? <path d="M210 94 L210 150 Q208 164 200 170" {...seam} /> : <path d="M200 94 L200 184" {...seam} />}
        </>
      );
    case "skirt":
      return (
        <>
          <path d="M148 88 L252 88 L302 442 Q200 458 98 442 Z" fill={t.fill} />
          <rect x="146" y="70" width="108" height="20" fill={t.shade} />
          <path d="M178 104 L156 432 M222 104 L246 434" {...seam} opacity="0.45" />
          <path d="M200 96 L200 448" stroke={t.shade} strokeWidth="6" opacity="0.6" />
        </>
      );
    case "dress":
      return (
        <>
          <Mirrored>
            <path d="M150 84 L112 102 L96 222 L124 226 L136 162 Z" fill={t.fill} />
            <path d="M98 206 L125 211 L124 226 L96 222 Z" fill={t.shade} />
          </Mirrored>
          <path d="M150 84 L180 72 L200 90 L220 72 L250 84 L262 152 L258 232 L292 470 Q200 486 108 470 L142 232 L138 152 Z" fill={t.fill} />
          <rect x="140" y="228" width="120" height="14" fill={t.shade} />
          {front ? (
            <>
              <path d="M180 72 L176 60 Q200 54 224 60 L220 72 L200 90 Z" fill={t.shade} />
              <Mirrored>
                <path d="M180 72 L200 90 L186 108 Z" fill={t.shade} />
              </Mirrored>
              <path d="M200 90 L200 478" {...seam} />
              {[120, 160, 200, 280, 330, 380, 430].map((y) => button(200, y, 3.5))}
              <path d="M210 242 L222 304 L230 302 L218 242 Z" fill={t.shade} />
            </>
          ) : (
            <path d="M176 62 Q200 54 224 62 L220 76 Q200 70 180 76 Z" fill={t.shade} />
          )}
        </>
      );
    case "slip":
      return (
        <>
          <path d="M162 66 L170 132 M238 66 L230 132" stroke={t.trim} strokeWidth="3" />
          <path d="M170 132 Q200 120 230 132 L236 152 L240 232 L286 472 Q200 488 114 472 L160 232 L164 152 Z" fill={t.fill} />
          <path
            d={front ? "M170 132 Q200 162 230 132" : "M170 132 Q200 140 230 132"}
            fill="none"
            stroke={t.shade}
            strokeWidth="4"
          />
          <path d="M184 240 L160 460 M216 240 L242 462" {...seam} opacity="0.4" />
        </>
      );
    case "scarf":
      return (
        <>
          {[
            { x: 132, rot: -3, len: 380 },
            { x: 200, rot: 3, len: 340 },
          ].map((strand, i) => (
            <g key={i} transform={`rotate(${strand.rot} 200 80)`}>
              <rect x={strand.x} y="80" width="72" height={strand.len} fill={i ? t.fill : t.shade} />
              <path d={`M${strand.x} ${strand.len + 40} L${strand.x + 72} ${strand.len + 40} M${strand.x} ${strand.len + 52} L${strand.x + 72} ${strand.len + 52}`} stroke={t.line} strokeWidth="3" />
              {Array.from({ length: 9 }, (_, k) => (
                <path key={k} d={`M${strand.x + 4 + k * 8} ${strand.len + 80} L${strand.x + 4 + k * 8} ${strand.len + 100}`} stroke={i ? t.fill : t.shade} strokeWidth="3" strokeLinecap="round" />
              ))}
            </g>
          ))}
          <path d="M128 66 Q200 48 276 66 L276 98 Q200 82 128 98 Z" fill={t.fill} />
          <path d="M128 98 Q200 82 276 98" fill="none" stroke={t.line} strokeWidth="2" />
        </>
      );
  }
}

const DETAIL_BOX: Partial<Record<Garment, string>> = {
  trousers: "120 50 160 160",
  skirt: "120 50 160 160",
  scarf: "120 330 160 160",
  slip: "120 50 160 160",
};

export default function GarmentArt({
  garment,
  hex,
  view = "front",
  label,
  bare = false,
  className = "",
}: {
  garment: Garment;
  hex: string;
  view?: View;
  label: string;
  bare?: boolean;
  className?: string;
}) {
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const t = tonesFor(hex);
  const viewBox = view === "detail" ? (DETAIL_BOX[garment] ?? "120 40 160 160") : "0 0 400 500";
  const textureColor = luminance(hex) < 0.06 ? "#ffffff" : "#000000";

  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      className={className}
      style={bare ? undefined : { background: swatchFor(hex) }}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <pattern id={`weave-${id}`} width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <path d="M0 0 L0 6" stroke={textureColor} strokeWidth="1.2" opacity="0.07" />
        </pattern>
        <filter id={`lift-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#1b140e" floodOpacity="0.16" />
        </filter>
        <mask id={`cloth-${id}`}>
          <g fill="#fff">{drawing(garment, { fill: "#fff", shade: "#fff", line: "#fff", trim: "#fff" }, view !== "back")}</g>
        </mask>
      </defs>
      <g filter={`url(#lift-${id})`}>{drawing(garment, t, view !== "back")}</g>
      <rect x="0" y="0" width="400" height="500" fill={`url(#weave-${id})`} mask={`url(#cloth-${id})`} />
    </svg>
  );
}
