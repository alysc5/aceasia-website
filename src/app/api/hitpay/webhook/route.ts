// HitPay calls this when a payment completes. Only acts after the signature checks out.
import { NextResponse } from "next/server";
import { formatPrice } from "@/lib/catalogue";
import { SHOP_EMAIL, esc, sendEmail } from "@/lib/email";
import { getPaymentRequest, validSignature } from "@/lib/hitpay";

export async function POST(req: Request) {
  const raw = await req.text();
  if (!validSignature(raw, req.headers.get("hitpay-signature"))) return NextResponse.json({ error: "bad signature" }, { status: 401 });
  const body = JSON.parse(raw || "{}");
  const id = String(body.payment_request?.id ?? body.payment_request_id ?? body.id ?? "");
  const pr = await getPaymentRequest(id);
  if (!pr || pr.status !== "completed") return NextResponse.json({ ok: true });
  const total = formatPrice(Math.round(Number(pr.amount) * 100)), ref = esc(pr.reference_number ?? pr.id);
  await sendEmail({ to: [SHOP_EMAIL], subject: `[Order ${ref}] PAID ${total}`, html: `<p>✅ HitPay confirmed payment of <b>${total}</b> for order <b>${ref}</b> from ${esc(pr.name ?? "")} (${esc(pr.email ?? "")}).</p><p>Order details are in the "Awaiting payment" email with the same order number.</p>` }).catch(() => null);
  if (pr.email) await sendEmail({
    to: [pr.email], reply_to: SHOP_EMAIL, subject: `Your Ace Asia Pet Care order ${ref} is confirmed 🐾`,
    html: `<p>Hi ${esc(pr.name ?? "there")},</p><p>Thank you for your order! We've received your payment of <b>${total}</b> for order <b>${ref}</b>.</p><p>We deliver within Singapore in 3–5 business days. If no one is home, we'll leave your parcel at the doorstep.</p><p>Questions? Just reply to this email.</p><p>Warm regards,<br>Ace Asia Pet Care</p>`,
  }).catch(() => null);
  return NextResponse.json({ ok: true });
}
