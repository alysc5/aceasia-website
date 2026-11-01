"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { PRODUCTS, formatPrice } from "@/lib/catalogue";
import Placeholder from "./Placeholder";

export type Line = { id: string; size: string; qty: number };
type Ctx = { lines: Line[]; count: number; add: (l: Line) => void; setQty: (id: string, size: string, qty: number) => void; remove: (id: string, size: string) => void; open: (from?: HTMLElement | null) => void };

const BasketCtx = createContext<Ctx | null>(null);
const KEY = "aceasia-basket-v1";
export const useBasket = () => useContext(BasketCtx)!;

function load(): Line[] {
  try { const v = JSON.parse(localStorage.getItem(KEY) ?? "[]"); return Array.isArray(v) ? v : []; } catch { return []; }
}

export function BasketProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [isOpen, setOpen] = useState(false);
  const opener = useRef<HTMLElement | null>(null);
  const panel = useRef<HTMLDivElement>(null);

  // read saved basket once on load
  useEffect(() => { setLines(load()); }, []);
  const save = (next: Line[]) => { setLines(next); try { localStorage.setItem(KEY, JSON.stringify(next)); } catch { /* private mode */ } };

  const add = (l: Line) => {
    const hit = lines.find((x) => x.id === l.id && x.size === l.size);
    save(hit ? lines.map((x) => (x === hit ? { ...x, qty: Math.min(99, x.qty + l.qty) } : x)) : [...lines, l]);
  };
  const setQty = (id: string, size: string, qty: number) => save(lines.map((x) => (x.id === id && x.size === size ? { ...x, qty: Math.max(1, Math.min(99, qty)) } : x)));
  const remove = (id: string, size: string) => save(lines.filter((x) => !(x.id === id && x.size === size)));
  const open = (from?: HTMLElement | null) => { opener.current = from ?? (document.activeElement as HTMLElement); setOpen(true); };
  const close = useCallback(() => { setOpen(false); opener.current?.focus(); }, []);

  // Escape closes; Tab stays inside the drawer; focus goes in on open.
  useEffect(() => {
    if (!isOpen) return;
    const el = panel.current;
    el?.querySelector<HTMLElement>("button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "Tab" || !el) return;
      const f = [...el.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),input,select")];
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [isOpen, close]);

  const count = lines.reduce((n, l) => n + l.qty, 0);
  const priced = lines.map((l) => ({ l, p: PRODUCTS.find((p) => p.id === l.id) }));
  const allPriced = priced.length > 0 && priced.every(({ p }) => p?.priceCents != null);
  const subtotal = allPriced ? priced.reduce((s, { l, p }) => s + l.qty * (p!.priceCents ?? 0), 0) : undefined;

  return (
    <BasketCtx.Provider value={{ lines, count, add, setQty, remove, open }}>
      {children}
      {isOpen && (
        <>
          <div className="scrim" onClick={close} aria-hidden="true" />
          <div ref={panel} className="drawer" role="dialog" aria-modal="true" aria-labelledby="bagTitle">
            <header>
              <h2 id="bagTitle">Your Bag</h2>
              <button className="iconBtn" onClick={close} aria-label="Close bag">✕</button>
            </header>
            {lines.length === 0 ? (
              <div className="items empty">
                <h3>Your bag is waiting for a little goodness.</h3>
                <p className="muted">Add your favourite products to get started.</p>
                <Link href="/shop" className="btn ghost" onClick={close}>Start shopping</Link>
              </div>
            ) : (
              <div className="items">
                {priced.map(({ l, p }) => (
                  <div className="line" key={l.id + l.size}>
                    <Placeholder label={p?.name ?? "Product"} />
                    <div>
                      <strong>{p?.name ?? "Product no longer listed"}</strong>
                      <div className="small muted">{l.size && `Size: ${l.size} · `}{formatPrice(p?.priceCents)}</div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
                        <div className="qty">
                          <button aria-label="Decrease quantity" onClick={() => setQty(l.id, l.size, l.qty - 1)}>−</button>
                          <span aria-live="polite">{l.qty}</span>
                          <button aria-label="Increase quantity" onClick={() => setQty(l.id, l.size, l.qty + 1)}>+</button>
                        </div>
                        <button className="linkBtn" onClick={() => remove(l.id, l.size)}>Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <footer>
              <div className="row"><span>Subtotal</span><strong>{subtotal === undefined ? "Pending catalogue" : formatPrice(subtotal)}</strong></div>
              <div className="row small muted"><span>Delivery</span><span>Singapore delivery only</span></div>
              <Link href="/checkout" className="btn primary" aria-disabled={!allPriced} onClick={(e) => { if (!allPriced) e.preventDefault(); else close(); }} style={allPriced ? undefined : { opacity: .5 }}>Proceed to checkout</Link>
              {!allPriced && lines.length > 0 && <p className="small muted" style={{ margin: 0 }}>Checkout opens once prices are confirmed.</p>}
              <button className="btn ghost" onClick={close}>Continue shopping</button>
            </footer>
          </div>
        </>
      )}
    </BasketCtx.Provider>
  );
}
