// Contact form: emails the enquiry to Ace Asia and sends the customer an automatic "we've received it" reply.
// Uses Resend (RESEND_API_KEY, added by the owner in Vercel). Sender must be on the verified aceasiapetcare.com domain.
import { NextResponse } from "next/server";

const TO = "hello@aceasiapetcare.com";
const FROM = "Ace Asia Pet Care <hello@aceasiapetcare.com>";
const hits = new Map<string, number[]>();

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
const clean = (v: unknown, max: number) => String(v ?? "").replace(/[\r\n]+/g, " ").trim().slice(0, max);

async function send(body: Record<string, unknown>) {
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`send_failed_${r.status}`);
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "?";
  const now = Date.now(); const list = (hits.get(ip) ?? []).filter((t) => now - t < 3600_000);
  if (list.length >= 5) return NextResponse.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  hits.set(ip, [...list, now]);

  const b = await req.json().catch(() => ({})) as Record<string, unknown>;
  if (b.website) return NextResponse.json({ ok: true }); // spam trap
  const name = clean(b.name, 100), email = clean(b.email, 200), phone = clean(b.phone, 30), topic = clean(b.topic, 40);
  const message = String(b.message ?? "").trim().slice(0, 3000);
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return NextResponse.json({ error: "Please fill in your name, a valid email and a message." }, { status: 400 });
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ error: "Our contact form isn't switched on yet." }, { status: 503 });

  try {
    await send({
      from: FROM, to: [TO], reply_to: email, subject: `[Website] ${topic}: ${name}`,
      html: `<p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Phone:</b> ${esc(phone || "-")}<br><b>Topic:</b> ${esc(topic)}</p><p>${esc(message).replace(/\n/g, "<br>")}</p>`,
    });
    await send({
      from: FROM, to: [email], subject: "We've received your message 🐾",
      html: `<p>Hi ${esc(name)},</p><p>Thank you for contacting Ace Asia Pet Care. This is a quick note to let you know we've received your message, and we'll get back to you soon.</p><p>Warm regards,<br>Ace Asia Pet Care<br><a href="mailto:${TO}">${TO}</a></p><p style="color:#888;font-size:12px">This is an automatic reply.</p>`,
    });
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Sorry, we couldn't send your message right now." }, { status: 502 });
  }
}
