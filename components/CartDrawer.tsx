"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "./CartProvider";
import GarmentArt from "./GarmentArt";
import { formatPrice, type Garment } from "@/data/products";
import { site } from "@/data/site";

export default function CartDrawer() {
  const { items, isOpen, close, subtotal, setQuantity, remove, count } = useCart();
  const panel = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    lastFocus.current = document.activeElement as HTMLElement | null;
    const node = panel.current;
    node?.querySelector<HTMLElement>("[data-autofocus]")?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key !== "Tab" || !node) return;
      const focusable = Array.from(
        node.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      lastFocus.current?.focus();
    };
  }, [isOpen, close]);

  const links = Array.from(new Set(items.map((i) => i.paymentLink)));
  const checkoutUrl = links.length === 1 ? links[0] : site.storeCheckoutUrl || null;
  const freeShippingAt = 150;
  const remaining = Math.max(0, freeShippingAt - subtotal);

  return (
    <div className={`fixed inset-0 z-50 ${isOpen ? "" : "pointer-events-none"}`} aria-hidden={!isOpen} inert={!isOpen}>
      <div
        className={`absolute inset-0 bg-ink/40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        onClick={close}
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="bag-title"
        className={`absolute inset-y-0 right-0 flex w-full max-w-[440px] flex-col bg-chalk transition-[transform,visibility] duration-300 ease-(--ease-out-soft) ${
          isOpen ? "translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-line px-6">
          <h2 id="bag-title" className="text-base font-medium">
            Bag <span className="font-normal text-muted tabular-nums">{count}</span>
          </h2>
          <button type="button" onClick={close} data-autofocus className="link text-sm">
            Close
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-4 px-6">
            <p className="display text-3xl">Your bag is empty</p>
            <p className="text-ink-2">Have a look through the shop or this season&apos;s lookbook.</p>
            <Link href="/shop/" onClick={close} className="btn btn-primary mt-2">
              Go to the shop
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
              {items.map((item) => (
                <li key={item.key} className="flex gap-4 py-5">
                  <Link href={`/product/${item.slug}/`} onClick={close} className="block w-20 shrink-0">
                    <GarmentArt
                      garment={(item.garment ?? "tee") as Garment}
                      hex={item.colorHex ?? "#888888"}
                      label={`${item.name} in ${item.color ?? ""}`}
                      className="aspect-[4/5] w-full"
                    />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted">
                          {[item.color, item.size].filter(Boolean).join(", ")}
                        </p>
                      </div>
                      <p className="tabular-nums">{formatPrice(item.price * item.quantity)}</p>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex h-9 items-center border border-line">
                        <button
                          type="button"
                          className="h-full w-9 hover:bg-raised"
                          onClick={() => setQuantity(item.key, item.quantity - 1)}
                          aria-label={`One fewer ${item.name}`}
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-sm tabular-nums" aria-live="polite">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="h-full w-9 hover:bg-raised"
                          onClick={() => setQuantity(item.key, item.quantity + 1)}
                          aria-label={`One more ${item.name}`}
                        >
                          +
                        </button>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        {!checkoutUrl && (
                          <a href={item.paymentLink} className="link">
                            Pay for this
                          </a>
                        )}
                        <button type="button" onClick={() => remove(item.key)} className="link text-muted">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="border-t border-line px-6 py-6">
              <p className="text-sm text-ink-2">
                {remaining > 0
                  ? `${formatPrice(remaining)} more for free US shipping`
                  : "Your order ships free in the US"}
              </p>
              <div className="mt-4 flex items-baseline justify-between">
                <span>Subtotal</span>
                <span className="text-lg tabular-nums">{formatPrice(subtotal)}</span>
              </div>
              <p className="mt-1 text-sm text-muted">Taxes and shipping are worked out at checkout.</p>
              {checkoutUrl ? (
                <a href={checkoutUrl} className="btn btn-primary mt-5 w-full">
                  Check out
                </a>
              ) : (
                <p className="mt-5 text-sm text-ink-2">
                  These pieces check out separately. Use Pay for this next to each one.
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
