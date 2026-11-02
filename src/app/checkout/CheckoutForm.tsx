"use client";

import Link from "next/link";
import { useState } from "react";
import { useBasket } from "@/components/Basket";
import { useOutOfStock } from "@/components/Stock";
import { DELIVERY_TEXT, FREE_DELIVERY_FROM_CENTS, PRODUCTS, deliveryFor, formatPrice, niceName } from "@/lib/catalogue";

export default function CheckoutForm() {
  const { lines } = useBasket();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const oos = useOutOfStock();
  const items = lines.map((l) => ({ l, p: PRODUCTS.find((p) => p.id === l.id) })).filter((x) => x.p && x.p.priceCents != null && !oos.has(x.l.id));
  const gone = lines.filter((l) => oos.has(l.id)).length;
  const subtotal = items.reduce((s, { l, p }) => s + l.qty * p!.priceCents!, 0);
  const delivery = deliveryFor(subtotal);

  async function pay(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setBusy(true); setErr("");
    const data = { ...Object.fromEntries(new FormData(e.currentTarget)), lines: items.map(({ l }) => ({ id: l.id, qty: l.qty })) };
    const r = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).catch(() => null);
    const j = r ? await r.json().catch(() => ({})) : {};
    if (r?.ok && j.url) { window.location.href = j.url; return; }
    setErr(j.error ?? "Something went wrong. Please try again."); setBusy(false);
  }

  if (!items.length) return <div className="notice">Your bag is empty. <Link href="/shop">Start shopping →</Link></div>;

  return (
    <div className="checkout">
      <form className="contactForm storyCard" onSubmit={pay}>
        <h2>Delivery details</h2>
        {gone > 0 && <p role="alert" className="small" style={{ color: "#a33", margin: 0 }}>{gone} item{gone > 1 ? "s are" : " is"} now out of stock and won&apos;t be charged. Remove {gone > 1 ? "them" : "it"} from your bag to continue.</p>}
        <div className="formRow">
          <label>Full name<input name="name" className="field" required maxLength={100} autoComplete="name" /></label>
          <label>Phone<input name="phone" type="tel" className="field" required maxLength={30} autoComplete="tel" /></label>
        </div>
        <label>Email<input name="email" type="email" className="field" required maxLength={200} autoComplete="email" /></label>
        <label>Address<input name="address" className="field" required maxLength={200} autoComplete="street-address" placeholder="Block and street" /></label>
        <div className="formRow">
          <label>Unit (optional)<input name="unit" className="field" maxLength={40} placeholder="#01-23" /></label>
          <label>Postal code<input name="postal" className="field" required inputMode="numeric" pattern="\d{6}" maxLength={6} autoComplete="postal-code" /></label>
        </div>
        <label>Delivery notes (optional)<input name="notes" className="field" maxLength={300} /></label>
        <p className="small muted" style={{ margin: 0 }}>{DELIVERY_TEXT}</p>
        {err && <p role="alert" className="small" style={{ color: "#a33", margin: 0 }}>{err}</p>}
        <button className="btn primary" disabled={busy || gone > 0}>{busy ? "Taking you to payment…" : `Pay ${formatPrice(subtotal + delivery)} securely`}</button>
        <p className="small muted" style={{ margin: 0 }}>You&apos;ll pay on HitPay&apos;s secure page (PayNow, cards and more).</p>
      </form>
      <aside className="storyCard summary">
        <h2>Your order</h2>
        {items.map(({ l, p }) => <div className="row small" key={l.id}><span>{niceName(p!.name)} × {l.qty}</span><span>{formatPrice(l.qty * p!.priceCents!)}</span></div>)}
        <hr />
        <div className="row"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        <div className="row"><span>Delivery</span><span>{delivery ? formatPrice(delivery) : "Free"}</span></div>
        {delivery > 0 && <p className="small muted" style={{ margin: 0 }}>Add {formatPrice(FREE_DELIVERY_FROM_CENTS - subtotal)} more for free delivery.</p>}
        <div className="row" style={{ fontWeight: 700, fontSize: "1.15rem" }}><span>Total</span><span>{formatPrice(subtotal + delivery)}</span></div>
      </aside>
    </div>
  );
}
