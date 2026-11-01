import Link from "next/link";
import { getPaymentRequest } from "@/lib/hitpay";
import { CONTACT_EMAIL, formatPrice } from "@/lib/catalogue";
import ClearBag from "./ClearBag";

export const metadata = { title: "Order status" };
export const dynamic = "force-dynamic";

// Never trusts the URL: asks HitPay directly what happened to this payment.
export default async function Result({ searchParams }: { searchParams: Promise<{ reference?: string }> }) {
  const { reference = "" } = await searchParams;
  const pr = reference ? await getPaymentRequest(reference).catch(() => null) : null;
  const status = pr?.status ?? "unknown";
  const ref = pr?.reference_number ?? "";
  return (
    <section className="section wrap">
      <div className="storyCard rise" style={{ margin: "0 auto", textAlign: "center" }}>
        {status === "completed" ? (<>
          <ClearBag />
          <h1>Thank you! 🐾</h1>
          <p>Your payment of <b>{formatPrice(Math.round(Number(pr!.amount) * 100))}</b> is confirmed. Order number <b>{ref}</b>.</p>
          <p>A confirmation email is on its way. We deliver in 3–5 business days.</p>
          <Link href="/shop" className="btn primary">Continue shopping</Link>
        </>) : status === "pending" ? (<>
          <h1>Payment pending ⏳</h1>
          <p>We haven&apos;t received confirmation yet. This can take a minute. Refresh this page shortly{ref ? <> (order <b>{ref}</b>)</> : null}.</p>
          <p className="small muted">Still stuck? Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>
        </>) : (<>
          <h1>Payment not completed</h1>
          <p>Your payment didn&apos;t go through or was cancelled. Nothing was charged, and your bag is still saved.</p>
          <Link href="/checkout" className="btn primary">Try again</Link>
        </>)}
      </div>
    </section>
  );
}
