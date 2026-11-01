// HitPay (live by default; set HITPAY_SANDBOX=1 to test). Keys live only on the server.
import crypto from "node:crypto";

const BASE = () => (process.env.HITPAY_SANDBOX === "1" ? "https://api.sandbox.hit-pay.com/v1" : "https://api.hit-pay.com/v1");
const headers = () => ({ "X-BUSINESS-API-KEY": process.env.HITPAY_API_KEY ?? "", "X-Requested-With": "XMLHttpRequest" });

export type PaymentRequest = { id: string; status: string; amount: string; currency: string; email?: string; name?: string; purpose?: string; reference_number?: string; url?: string };

export async function createPaymentRequest(f: Record<string, string>): Promise<PaymentRequest> {
  const r = await fetch(`${BASE()}/payment-requests`, { method: "POST", headers: { ...headers(), "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(f) });
  if (!r.ok) throw new Error(`hitpay_${r.status}`);
  return r.json();
}

export async function getPaymentRequest(id: string): Promise<PaymentRequest | null> {
  if (!/^[A-Za-z0-9-]{8,64}$/.test(id)) return null;
  const r = await fetch(`${BASE()}/payment-requests/${id}`, { headers: headers(), cache: "no-store" });
  return r.ok ? r.json() : null;
}

export function validSignature(raw: string, sig: string | null) {
  const salt = process.env.HITPAY_SALT;
  if (!salt || !sig) return false;
  const mine = crypto.createHmac("sha256", salt).update(raw).digest("hex");
  const a = Buffer.from(mine), b = Buffer.from(sig);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}
