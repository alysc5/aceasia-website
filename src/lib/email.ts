// Sends email through Resend (RESEND_API_KEY set by the owner in Vercel).
export const SHOP_EMAIL = "hello@aceasiapetcare.com";
export const FROM = "Ace Asia Pet Care <hello@aceasiapetcare.com>";
export const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendEmail(body: { to: string[]; subject: string; html: string; reply_to?: string }) {
  if (!process.env.RESEND_API_KEY) throw new Error("email_off");
  const r = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: FROM, ...body }),
  });
  if (!r.ok) throw new Error(`send_failed_${r.status}`);
}
