// Builds the order from the real catalogue (never trusts browser prices), creates a HitPay payment, emails the shop.
import { NextResponse } from "next/server";
import { PRODUCTS, deliveryFor, formatPrice, niceName } from "@/lib/catalogue";
import { SHOP_EMAIL, esc, sendEmail } from "@/lib/email";
import { createPaymentRequest } from "@/lib/hitpay";

const clean = (v: unknown, max: number) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

export async function POST(req: Request) {
  if (!process.env.HITPAY_API_KEY) return NextResponse.json({ error: "Online payment isn't switched on yet." }, { status: 503 });
  const b = await req.json().catch(() => ({})) as Record<string, unknown>;
  const name = clean(b.name, 100), email = clean(b.email, 200), phone = clean(b.phone, 30);
  const address = clean(b.address, 200), unit = clean(b.unit, 40), postal = clean(b.postal, 6), notes = clean(b.notes, 300);
  if (!name || !phone || !address || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return NextResponse.json({ error: "Please fill in your name, email, phone and address." }, { status: 400 });
  if (!/^\d{6}$/.test(postal)) return NextResponse.json({ error: "Please enter a 6-digit Singapore postal code." }, { status: 400 });

  const lines = (Array.isArray(b.lines) ? b.lines : []).slice(0, 50).map((l) => {
    const p = PRODUCTS.find((x) => x.id === String((l as { id?: unknown }).id));
    const qty = Math.max(1, Math.min(99, Math.floor(Number((l as { qty?: unknown }).qty) || 0)));
    return p && p.priceCents != null && p.available !== false ? { p, qty } : null;
  }).filter((x) => x !== null);
  if (!lines.length) return NextResponse.json({ error: "Your bag is empty." }, { status: 400 });

  const subtotal = lines.reduce((s, { p, qty }) => s + p.priceCents! * qty, 0);
  const delivery = deliveryFor(subtotal), total = subtotal + delivery;
  const ref = `AA-${Date.now().toString(36).toUpperCase()}`;
  const origin = new URL(req.url).origin;

  let pr;
  try {
    pr = await createPaymentRequest({
      amount: (total / 100).toFixed(2), currency: "SGD", email, name,
      purpose: `Ace Asia Pet Care order ${ref}`, reference_number: ref,
      redirect_url: `${origin}/checkout/result`,
    });
  } catch {
    return NextResponse.json({ error: "We couldn't start the payment. Please try again." }, { status: 502 });
  }

  const rows = lines.map(({ p, qty }) => `<tr><td>${esc(niceName(p.name))}</td><td>${qty}</td><td>${formatPrice(p.priceCents! * qty)}</td></tr>`).join("");
  await sendEmail({
    to: [SHOP_EMAIL], reply_to: email, subject: `[Order ${ref}] Awaiting payment: ${formatPrice(total)}`,
    html: `<p><b>Order ${ref}</b> was started. A second email follows once HitPay confirms payment.</p>
<p><b>Customer:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Phone:</b> ${esc(phone)}<br><b>Address:</b> ${esc(address)}${unit ? `, ${esc(unit)}` : ""}, Singapore ${esc(postal)}<br><b>Notes:</b> ${esc(notes || "-")}</p>
<table cellpadding="6" border="1" style="border-collapse:collapse"><tr><th>Item</th><th>Qty</th><th>Amount</th></tr>${rows}</table>
<p>Subtotal ${formatPrice(subtotal)} · Delivery ${delivery ? formatPrice(delivery) : "Free"} · <b>Total ${formatPrice(total)}</b></p><p>HitPay payment ID: ${esc(pr.id)}</p>`,
  }).catch(() => null);

  return NextResponse.json({ url: pr.url });
}
